pragma solidity ^0.4.24;


// A simple contract for surveying statistical individual and population details
contract DCensus {
    event NewStat(string statCategory, string statValue);

    struct Statistic {
        address owner;
        string category;
        string value;
    }

    mapping (string => Statistic[]) statsData;
   
    event LogAddStat(
    	address indexed _owner,
    	string _category,
    	string _value
    );

    event LogGetStat(
    	address indexed _owner,
    	string _category,
	string _value
    );

    function addStat(string _category, string _value) public {
        statsData[_category].push(Statistic(msg.sender, _category, _value));
        
	LogAddStat(msg.sender, _category, _value);
    }

    function getStat(string _category) public view returns (string) {
	for (uint i = 0; i < statsData[_category].length; i++) {
		if (statsData[_category][i].owner == msg.sender) {
			string val = statsData[_category][i].value;
			LogGetStat(msg.sender, _category, val);
			
			return val;
		}
	}

	LogGetStat(msg.sender, _category, 'Unknown');
	return "Unable to find ${_category} statistic";
    }
}
