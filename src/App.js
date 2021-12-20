import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { ethers } from "ethers";
import { abi } from './abiData';
function App() {

  const [contractName, setContractName] = useState("");
  const [contractSupply, setContractSupply] = useState("");


  var url = 'https://mainnet.infura.io/v3/b4e232ec346a4f7aada16c229c5e3218'
  let contractAddress = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
  const provider = new ethers.providers.getDefaultProvider(url);
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const getInfo2 = useCallback(
    async () => {
      const name = await contract.name()
      setContractName(name);
      console.log(name, 'name');

      const totalSupply = await contract.totalSupply()

      const formatedSupply = ethers.utils.formatEther(totalSupply);
      console.log(formatedSupply, 'totalSupply');
      setContractSupply(formatedSupply);
    }, [])

  useEffect(() => {
    getInfo2()
  }, [getInfo2])

  return (
    <div class="container">
      <div class="h-100 row align-items-center m-5">
          <div className="card text-white bg-secondary m-5">
            <div className="card-body">
              <p className="card-text text-center">Contract Name: {contractName}</p>
              <p className="card-text text-center">Contract Supply: {contractSupply}</p>
            </div>
        </div>
      </div>
    </div>

  );
}

export default App;
