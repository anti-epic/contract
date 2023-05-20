import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import mining from './mining';
import React, { useState, useEffect } from 'react';
function App() {
  let [addressB, setAddressB] = useState(0);
  const [loaded, isLoaded] = useState(false);

  useEffect(() => {
    mining.methods.addressB().call()
      .then(result => {
        setAddressB(result);
        isLoaded(true);
      })
      .catch(error => {
        console.error('Error:', error);
        isLoaded(true);
      });
  }, []);

  web3.eth.getAccounts().then(console.log);

  return loaded ? (
    <div className="App">
      {addressB}y
    </div>
  ) : (
    <div>no</div>
  );
}

export default App;
