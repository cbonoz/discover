// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package main

import (
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

// ImmutableAPIABI is the input ABI used to generate the binding from.
const ImmutableAPIABI = "[{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"unpause\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"paused\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"pause\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"api\",\"type\":\"string\"},{\"name\":\"data\",\"type\":\"string\"},{\"name\":\"timestamp\",\"type\":\"uint256\"}],\"name\":\"recordAPI\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"contractName\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"api\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"data\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"timestamp\",\"type\":\"uint256\"}],\"name\":\"RecordTransaction\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"Pause\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"Unpause\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]"

// ImmutableAPI is an auto generated Go binding around an Ethereum contract.
type ImmutableAPI struct {
	ImmutableAPICaller     // Read-only binding to the contract
	ImmutableAPITransactor // Write-only binding to the contract
}

// ImmutableAPICaller is an auto generated read-only Go binding around an Ethereum contract.
type ImmutableAPICaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ImmutableAPITransactor is an auto generated write-only Go binding around an Ethereum contract.
type ImmutableAPITransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ImmutableAPISession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ImmutableAPISession struct {
	Contract     *ImmutableAPI     // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ImmutableAPICallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ImmutableAPICallerSession struct {
	Contract *ImmutableAPICaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts       // Call options to use throughout this session
}

// ImmutableAPITransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ImmutableAPITransactorSession struct {
	Contract     *ImmutableAPITransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts       // Transaction auth options to use throughout this session
}

// ImmutableAPIRaw is an auto generated low-level Go binding around an Ethereum contract.
type ImmutableAPIRaw struct {
	Contract *ImmutableAPI // Generic contract binding to access the raw methods on
}

// ImmutableAPICallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ImmutableAPICallerRaw struct {
	Contract *ImmutableAPICaller // Generic read-only contract binding to access the raw methods on
}

// ImmutableAPITransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ImmutableAPITransactorRaw struct {
	Contract *ImmutableAPITransactor // Generic write-only contract binding to access the raw methods on
}

// NewImmutableAPI creates a new instance of ImmutableAPI, bound to a specific deployed contract.
func NewImmutableAPI(address common.Address, backend bind.ContractBackend) (*ImmutableAPI, error) {
	contract, err := bindImmutableAPI(address, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ImmutableAPI{ImmutableAPICaller: ImmutableAPICaller{contract: contract}, ImmutableAPITransactor: ImmutableAPITransactor{contract: contract}}, nil
}

// NewImmutableAPICaller creates a new read-only instance of ImmutableAPI, bound to a specific deployed contract.
func NewImmutableAPICaller(address common.Address, caller bind.ContractCaller) (*ImmutableAPICaller, error) {
	contract, err := bindImmutableAPI(address, caller, nil)
	if err != nil {
		return nil, err
	}
	return &ImmutableAPICaller{contract: contract}, nil
}

// NewImmutableAPITransactor creates a new write-only instance of ImmutableAPI, bound to a specific deployed contract.
func NewImmutableAPITransactor(address common.Address, transactor bind.ContractTransactor) (*ImmutableAPITransactor, error) {
	contract, err := bindImmutableAPI(address, nil, transactor)
	if err != nil {
		return nil, err
	}
	return &ImmutableAPITransactor{contract: contract}, nil
}

// bindImmutableAPI binds a generic wrapper to an already deployed contract.
func bindImmutableAPI(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(ImmutableAPIABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ImmutableAPI *ImmutableAPIRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _ImmutableAPI.Contract.ImmutableAPICaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ImmutableAPI *ImmutableAPIRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ImmutableAPI.Contract.ImmutableAPITransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ImmutableAPI *ImmutableAPIRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ImmutableAPI.Contract.ImmutableAPITransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ImmutableAPI *ImmutableAPICallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _ImmutableAPI.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ImmutableAPI *ImmutableAPITransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ImmutableAPI.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ImmutableAPI *ImmutableAPITransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ImmutableAPI.Contract.contract.Transact(opts, method, params...)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_ImmutableAPI *ImmutableAPICaller) Name(opts *bind.CallOpts) (string, error) {
	var (
		ret0 = new(string)
	)
	out := ret0
	err := _ImmutableAPI.contract.Call(opts, out, "name")
	return *ret0, err
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_ImmutableAPI *ImmutableAPISession) Name() (string, error) {
	return _ImmutableAPI.Contract.Name(&_ImmutableAPI.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_ImmutableAPI *ImmutableAPICallerSession) Name() (string, error) {
	return _ImmutableAPI.Contract.Name(&_ImmutableAPI.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_ImmutableAPI *ImmutableAPICaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _ImmutableAPI.contract.Call(opts, out, "owner")
	return *ret0, err
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_ImmutableAPI *ImmutableAPISession) Owner() (common.Address, error) {
	return _ImmutableAPI.Contract.Owner(&_ImmutableAPI.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_ImmutableAPI *ImmutableAPICallerSession) Owner() (common.Address, error) {
	return _ImmutableAPI.Contract.Owner(&_ImmutableAPI.CallOpts)
}

// Paused is a free data retrieval call binding the contract method 0x5c975abb.
//
// Solidity: function paused() constant returns(bool)
func (_ImmutableAPI *ImmutableAPICaller) Paused(opts *bind.CallOpts) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _ImmutableAPI.contract.Call(opts, out, "paused")
	return *ret0, err
}

// Paused is a free data retrieval call binding the contract method 0x5c975abb.
//
// Solidity: function paused() constant returns(bool)
func (_ImmutableAPI *ImmutableAPISession) Paused() (bool, error) {
	return _ImmutableAPI.Contract.Paused(&_ImmutableAPI.CallOpts)
}

// Paused is a free data retrieval call binding the contract method 0x5c975abb.
//
// Solidity: function paused() constant returns(bool)
func (_ImmutableAPI *ImmutableAPICallerSession) Paused() (bool, error) {
	return _ImmutableAPI.Contract.Paused(&_ImmutableAPI.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_ImmutableAPI *ImmutableAPICaller) Symbol(opts *bind.CallOpts) (string, error) {
	var (
		ret0 = new(string)
	)
	out := ret0
	err := _ImmutableAPI.contract.Call(opts, out, "symbol")
	return *ret0, err
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_ImmutableAPI *ImmutableAPISession) Symbol() (string, error) {
	return _ImmutableAPI.Contract.Symbol(&_ImmutableAPI.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_ImmutableAPI *ImmutableAPICallerSession) Symbol() (string, error) {
	return _ImmutableAPI.Contract.Symbol(&_ImmutableAPI.CallOpts)
}

// Pause is a paid mutator transaction binding the contract method 0x8456cb59.
//
// Solidity: function pause() returns()
func (_ImmutableAPI *ImmutableAPITransactor) Pause(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ImmutableAPI.contract.Transact(opts, "pause")
}

// Pause is a paid mutator transaction binding the contract method 0x8456cb59.
//
// Solidity: function pause() returns()
func (_ImmutableAPI *ImmutableAPISession) Pause() (*types.Transaction, error) {
	return _ImmutableAPI.Contract.Pause(&_ImmutableAPI.TransactOpts)
}

// Pause is a paid mutator transaction binding the contract method 0x8456cb59.
//
// Solidity: function pause() returns()
func (_ImmutableAPI *ImmutableAPITransactorSession) Pause() (*types.Transaction, error) {
	return _ImmutableAPI.Contract.Pause(&_ImmutableAPI.TransactOpts)
}

// RecordAPI is a paid mutator transaction binding the contract method 0xcc8aeb52.
//
// Solidity: function recordAPI(api string, data string, timestamp uint256) returns(bool)
func (_ImmutableAPI *ImmutableAPITransactor) RecordAPI(opts *bind.TransactOpts, api string, data string, timestamp *big.Int) (*types.Transaction, error) {
	return _ImmutableAPI.contract.Transact(opts, "recordAPI", api, data, timestamp)
}

// RecordAPI is a paid mutator transaction binding the contract method 0xcc8aeb52.
//
// Solidity: function recordAPI(api string, data string, timestamp uint256) returns(bool)
func (_ImmutableAPI *ImmutableAPISession) RecordAPI(api string, data string, timestamp *big.Int) (*types.Transaction, error) {
	return _ImmutableAPI.Contract.RecordAPI(&_ImmutableAPI.TransactOpts, api, data, timestamp)
}

// RecordAPI is a paid mutator transaction binding the contract method 0xcc8aeb52.
//
// Solidity: function recordAPI(api string, data string, timestamp uint256) returns(bool)
func (_ImmutableAPI *ImmutableAPITransactorSession) RecordAPI(api string, data string, timestamp *big.Int) (*types.Transaction, error) {
	return _ImmutableAPI.Contract.RecordAPI(&_ImmutableAPI.TransactOpts, api, data, timestamp)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_ImmutableAPI *ImmutableAPITransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _ImmutableAPI.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_ImmutableAPI *ImmutableAPISession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _ImmutableAPI.Contract.TransferOwnership(&_ImmutableAPI.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_ImmutableAPI *ImmutableAPITransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _ImmutableAPI.Contract.TransferOwnership(&_ImmutableAPI.TransactOpts, newOwner)
}

// Unpause is a paid mutator transaction binding the contract method 0x3f4ba83a.
//
// Solidity: function unpause() returns()
func (_ImmutableAPI *ImmutableAPITransactor) Unpause(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ImmutableAPI.contract.Transact(opts, "unpause")
}

// Unpause is a paid mutator transaction binding the contract method 0x3f4ba83a.
//
// Solidity: function unpause() returns()
func (_ImmutableAPI *ImmutableAPISession) Unpause() (*types.Transaction, error) {
	return _ImmutableAPI.Contract.Unpause(&_ImmutableAPI.TransactOpts)
}

// Unpause is a paid mutator transaction binding the contract method 0x3f4ba83a.
//
// Solidity: function unpause() returns()
func (_ImmutableAPI *ImmutableAPITransactorSession) Unpause() (*types.Transaction, error) {
	return _ImmutableAPI.Contract.Unpause(&_ImmutableAPI.TransactOpts)
}
