/*
decentralized microblogging 
Copyright (C) 2015 Jahn Bertsch

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation in version 3.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// "class" TweetRegistry
pragma solidity ^0.4.4;
import "./TweetAccount.sol";
contract TweetRegistry {
		struct AccountInfo{ 
		string name;
		address contractAddress;
		bool isActive;
	}
	// mappings to look up account names, account ids and addresses
	mapping (address => AccountInfo) _addressToAccountInfo;
	mapping (uint => address) _accountIdToAccountAddress;
	mapping (string => address) _accountNameToAddress;


	
	// might be interesting to see how many people use the system
	uint _numberOfAccounts;
	
	// owner
	address _registryAdmin;
	
	// allowed to administrate accounts only, not everything
	// address _accountAdmin;
	
	// if a newer version of this registry is available, force users to use it
	//bool _registrationDisabled;

	function TweetRegistry(string name) {
		_registryAdmin = msg.sender;
		// _accountAdmin = msg.sender; // can be changed later
		_numberOfAccounts = 0;
	//	_registrationDisabled = false;
		 	 AccountInfo memory newAccount;
			 TweetAccount newTweep =new TweetAccount(msg.sender);
			 _addressToAccountInfo[msg.sender];
            newAccount.name =name ;
            newAccount.isActive =true ;

            newAccount.contractAddress=newTweep;
        	_accountNameToAddress[name] = msg.sender ;
			_accountIdToAccountAddress[_numberOfAccounts] = msg.sender ;
			_numberOfAccounts++;

            _addressToAccountInfo[msg.sender]=newAccount;
			
	}
    // modifier RegistrationDisabled(){
	// 	require(!_registrationDisabled);
    //     _;
    // }
    modifier IsRegistered(){
		require(bytes(_addressToAccountInfo[msg.sender].name).length == 0);
        _;
    }
    modifier IsTaken(string name){
		require(_accountNameToAddress[name] == address(0));
        _;
    }
    modifier ValidName(string name){
		require(bytes(name).length <= 64);
        _;
    }
    modifier IsAdmin(){
		require(msg.sender == _registryAdmin);
        _;
    }
    // modifier IsAccountAdmin(){
	// 	require(msg.sender == _accountAdmin);
    //     _;
    // }

	function register(string name) public/* RegistrationDisabled */ IsRegistered ValidName(name) IsTaken(name) returns (bool) {
	
 			  AccountInfo memory newAccount;
			 TweetAccount newTweep =new TweetAccount(msg.sender);
			 _addressToAccountInfo[msg.sender];
            newAccount.name =name ;
            newAccount.isActive =true ;
            newAccount.contractAddress=newTweep;
        	_accountNameToAddress[name] = msg.sender ;
			_accountIdToAccountAddress[_numberOfAccounts] = msg.sender ;
			_numberOfAccounts++;

            _addressToAccountInfo[msg.sender]=newAccount;
			
			return true; // success
		}
	
	
	function getNumberOfAccounts()public constant returns (uint numberOfAccounts) {
		numberOfAccounts = _numberOfAccounts;
	}

	function getAddressOfName(string name)public constant returns (address addr) {
		addr = _accountNameToAddress[name];
	}

	function getNameOfAddress(address addr)public constant returns (string name) {
		name = _addressToAccountInfo[addr].name;
	}
	function getAccountOfAddress(address addr) public constant returns (address , string ) {
		return (_addressToAccountInfo[addr].contractAddress,_addressToAccountInfo[addr].name);
	}
	function getAccountById(uint index) public constant returns (address , string ) {
 		return (_addressToAccountInfo[ _accountIdToAccountAddress[index]].contractAddress,_addressToAccountInfo[ _accountIdToAccountAddress[index]].name);
	}
	
	function getAddressOfId(uint id) public constant returns (address addr) {
		addr = _accountIdToAccountAddress[id];
	}

	function unregister() public IsRegistered returns (string unregisteredAccountName) {
		unregisteredAccountName = _addressToAccountInfo[msg.sender].name;
 		_addressToAccountInfo[msg.sender].isActive = false;
 		// _accountIdToAccountAddress is never deleted on purpose
	}
	
	// function adminUnregister(string name) public IsAdmin IsAccountAdmin {
	// 	address addr = _accountNameToAddress[name];
	// 		_addressToAccountInfo[addr].name = "";
	// 		_accountNameToAddress[name] = address(0);
	// 		// _accountIdToAccountAddress is never deleted on purpose
	// }
	
	// function adminSetRegistrationDisabled(bool registrationDisabled) public IsAdmin  {
	// 	// currently, the code of the registry can not be updated once it is
	// 	// deployed. if a newer version of the registry is available, account
	// 	// registration can be disabled
	// 			_registrationDisabled = registrationDisabled;

	// }
	
	// function adminSetAccountAdministrator(address accountAdmin)  public IsAdmin {
	// 			_accountAdmin = accountAdmin;

	// }
	// donate to the admin 
		function Donate() public payable {

	}

	
	function adminRetrieveDonations(address to , uint amount) public IsAdmin {
			to.transfer(amount);
		
	}
			
	function adminDeleteRegistry() public IsAdmin {
			selfdestruct(_registryAdmin); // this is a predefined function, it deletes the contract and returns all funds to the admin's address
		
	}
			function () public payable {

	}
		function getBalance() public IsAdmin constant returns (uint ) {
		return this.balance;
	}
}