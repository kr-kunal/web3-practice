import React, { useState } from "react";
import { abi } from "../ABI/abi";
import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.min.css";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x0A8EE274154F376F519a1670BA3a72f9b121Bac5";
const storageContract = new web3.eth.Contract(abi, contractAddress);

web3.eth
  .getBalance("0xf1F6952aC679620b0093Bfb223B1432F9c08d7B3")
  .then((response) => {
    const balance = web3.utils.fromWei(response, "ether");
    console.log("🚀 ~ file: home.js ~ line 12 ~ balance", balance);
  });

const home = () => {
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState();
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log(account);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const numberSet = async (e) => {
    e.preventDefault();
    // Get permission to access user funds to pay for gas fees
    const gas = await storageContract.methods.setNumber(number).estimateGas();
    const post = await storageContract.methods.setNumber(number).send({
      from: account,
      gas,
    });
  };

  const numberGet = async (e) => {
    e.preventDefault();
    const post = await storageContract.methods.getNumber().call();
    setGet(post);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="my-3">
        <button className="btn btn-primary" onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
      <div>
        <input
          className="input me-3"
          type="text"
          name="name"
          onChange={(e) => setUint(e.target.value)}
        />
        <button className="btn btn-success mb-2" onClick={numberSet}>
          Set Number
        </button>
      </div>
      <h2>{getNumber}</h2>
      <div>
        <button className="btn btn-info" onClick={numberGet}>
          Get your Number
        </button>
      </div>
    </div>
  );
};

export default home;
