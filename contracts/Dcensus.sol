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

    function addStat(string _category, string _value) public {
        statsData[_category].push(Statistic(msg.sender, _category, _value));
        emit NewStat(_category, _value);
    }

    function getStat(string _category) public view returns (string) {
	for (uint i = 0; i < statsData[_category].length; i++) {
		if (statsData[_category][i].owner == msg.sender) {
			return statsData[_category][i].value;
		}
	}

	return "Unable to find ${_category} statistic";
    }
}
