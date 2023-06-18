import { Database } from "@tableland/sdk";
import { Signer, providers } from "ethers";
import { useState } from "react";
import logo from './logo.svg';
import './App.css';

async function connectSigner() {
  // Establish a connection with the browser wallet's provider.
  const provider = new providers.Web3Provider(window.ethereum);
  // Request the connected accounts, prompting a browser wallet popup to connect.
  await provider.send("eth_requestAccounts", []);
  // Create a signer from the returned provider connection.
  const signer = provider.getSigner();
  // Return the signer
  return signer;
}

async function connectDatabase(signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Do create, write, and read operations
  return db;
}

function App() {
  const [signer, setSigner] = useState();
  const [database, setDatabase] = useState();

  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
    const database = await connectDatabase(signer);
    setDatabase(database);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to test.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={async () => handleConnect()}>Connect</button>
      </header>
    </div>
  );
}

export default App;
