App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // initialize web3
    if(typeof web3 !== 'undefined') {
      // use provider of the Web3 object injected by Metamask
      App.web3Provider = web3.currentProvider;
    } else {
      // create a new provider which connects to my local ganache network
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    App.displayAccountInfo();

    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase((err, account) => {
      if(err === null) {
        App.account = account;
        // Inject the account number into the HTML
        $('#account').text(account);

        web3.eth.getBalance(account, (err, balance) => {
          if(err === null) {
            $('#accountBalance').text(web3.fromWei(balance, "ether") + " ETH");
          }
        });
      }
    });
  },

  initContract: function() {
    $.getJSON('DCensus.json', (artifact) => {
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      App.contracts.DCensus = TruffleContract(artifact);
      // set the provider for our contracts
      App.contracts.DCensus.setProvider(App.web3Provider);

      App.listenToEvents();
    });
  },

  addStat: function() {
    // retrieve the detail of the statistic
    var _stat_category = $('#stat_category').val();
    var _stat_value = $('#stat_value').val();

    if((_stat_category.trim() == '') || (_stat_value == '')) {
      // nothing to add
      return false;
    }

    App.contracts.DCensus.deployed().then((instance) => {
      return instance.addStat(_stat_category, _stat_value, {
        from: App.account,
        gas: 500000
      });
    }).then((result) => {
      // success
    }).catch((err) => {
      console.error(err);
    });
  },

  // listen to events triggered by the contract
  listenToEvents: function() {
    App.contracts.DCensus.deployed().then((instance) => {
      instance.LogAddStat({}, {}).watch((error, event) => {
        if (!error) {
          $("#events").append('<li class="list-group-item">' + event.args._category + ' has been added</li>');
        } else {
          console.error(error);
        }
      });
    });
  },

  getStat: function() {
    event.preventDefault();

    let _stat = $(event.target).data('value');

    App.contracts.DCensus.deployed().
      then((instance) => {
        return instance.getStat({
	  _category: _stat
        });
      }).
      catch((err) => console.error(err));
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
