import "./App.css"
import { useState } from "react";
import { ethers } from "ethers";
import MintForm from "./components/MintForm";
import ctcData from "./abi/Kokuyorsun.json";


const contractAddress = "0x1b8Fd8C24f80AC16316B2274d2063c7b242d05Aa";
let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner();
let contract = new ethers.Contract(contractAddress, ctcData.abi, signer);

function App() {

    async function handleMint(address) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if(accounts.length==0){
            alert("Connect wallet first!");
            return;
        }

        console.log("starting");
        const txn = await contract.safeMint(address);
        const receipt = await txn.wait();
        console.log(receipt);
    };

    async function connectToWallet(){
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, ctcData.abi, signer);
    }

    return (
        <div>
            <button onClick={connectToWallet}>Connect to Wallet</button>
            <MintForm mintFunction= {handleMint} />
        </div>
    );
}

export default App;