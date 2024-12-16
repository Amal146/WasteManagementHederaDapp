import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Endpoint URLs
const BASE_URL = "http://localhost:3000/api/bins"; // Update with your server URL

function App() {
  const [binID, setBinID] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [txHash, setTxHash] = useState("");

  // Add a New Bin
  const addBin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, {
        binID,
        capacity,
        location,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Error adding bin");
    }
  };

  // Get Bin Capacity
  const getBinCapacity = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/capacity/${binID}`);
      setResponseMessage(`Bin Capacity: ${response.data.capacity}`);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error fetching capacity"
      );
    }
  };

  // Verify Bin Location
  const verifyBinLocation = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/location/${binID}`);
      setResponseMessage(`Bin Location: ${response.data.location}`);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error verifying location"
      );
    }
  };

  // Weigh Garbage
  const weighGarbage = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/weigh`, { binID, weight });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error weighing garbage"
      );
    }
  };

  return (
    <div className="App">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        id="video-background"
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1>Waste Management </h1>

      {/* Add Bin Form */}
      <div>
        <h3>Add a New Bin 🚮</h3>
        <input
          type="text"
          placeholder="Bin ID"
          value={binID}
          onChange={(e) => setBinID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={addBin}>Add Bin</button>
      </div>

      {/* Get Bin Capacity */}
      <div>
        <h3>Get Bin Capacity</h3>
        <input
          type="text"
          placeholder="Bin ID"
          value={binID}
          onChange={(e) => setBinID(e.target.value)}
        />
        <button onClick={getBinCapacity}>Get Capacity</button>
      </div>

      {/* Verify Bin Location */}
      <div>
        <h3>Verify Bin Location</h3>
        <input
          type="text"
          placeholder="Bin ID"
          value={binID}
          onChange={(e) => setBinID(e.target.value)}
        />
        <button onClick={verifyBinLocation}>Verify Location</button>
      </div>

      {/* Weigh Garbage */}
      <div>
        <h3>Weigh Garbage</h3>
        <input
          type="text"
          placeholder="Bin ID"
          value={binID}
          onChange={(e) => setBinID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={weighGarbage}>Weigh Garbage</button>
      </div>

      {/* Response */}
      <div>
        <h3>Response:</h3>
        <p>{responseMessage}</p>
        {txHash && (
          <p className="transaction-hash">Transaction Hash: {txHash}</p>
        )}
      </div>
    </div>
  );
}

export default App;
