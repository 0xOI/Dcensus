pragma solidity ^0.4.24;


// A simple contract for surveying statistical individual and population details
contract DCensus {
    event NewStat(string statCategory, string statValue);

    struct Statistic {
        address owner;
        string category;
        string value;
    }

    mapping (string => Statistic[]) public statsData;

    function addStat(string _category, string _value) public {
        statsData[_category].push(Statistic(msg.sender, _category, _value);
        NewStat(_category, _value);
    }
}
