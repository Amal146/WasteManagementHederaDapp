import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Endpoint URLs
const BASE_URL = "http://localhost:3000";

function App() {
  const [binID, setBinID] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [txHash, setTxHash] = useState("");

  // Bins Management
  // Add a New Bin
  const addBin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/bins/add`, {
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
      const response = await axios.get(
        `${BASE_URL}/api/bins/capacity/${binID}`
      );
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
      const response = await axios.get(
        `${BASE_URL}/api/bins/location/${binID}`
      );
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
      const response = await axios.post(`${BASE_URL}/api/bins/weigh`, {
        binID,
        weight,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error weighing garbage"
      );
    }
  };

  // State for Waste Management Endpoints
  const [collectionId, setCollectionId] = useState("");
  const [recyclingVerified, setRecyclingVerified] = useState(false);
  const [wasteCollectionDetails, setWasteCollectionDetails] = useState({});
  const [totalWasteCollections, setTotalWasteCollections] = useState("");
  const [collectionLocation, setCollectionLocation] = useState("");
  const [totalWasteCollected, setTotalWasteCollected] = useState("");
  const [totalWasteRecycled, setTotalWasteRecycled] = useState("");
  const [recyclingCompany, setRecyclingCompany] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [recycleWeight, setRecycleWeight] = useState("");
  const [citizenAddress, setCitizenAddress] = useState("");
  const [citizenMaterialName, setCitizenMaterialName] = useState("");
  const [citizenMaterialId, setCitizenMaterialId] = useState("");
  const [citizenWeight, setCitizenWeight] = useState("");
  const [citizenPoints, setCitizenPoints] = useState("");
  const [totalWasteThrown, setTotalWasteThrown] = useState("");
  const [loyaltyPoints, setLoyaltyPoints] = useState("");
  // Coupon Management State
  const [userAddress, setUserAddress] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [expiration, setExpiration] = useState("");
  const [value, setValue] = useState("");
  const [coupons, setCoupons] = useState([]);

  // Generate a Coupon
  const generateCoupon = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/generate-coupon`, {
        userAddress,
        code: couponCode,
        expiration,
        value,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.transactionHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.error || "Error generating coupon"
      );
    }
  };

  // Fetch User Coupons
  const getUserCoupons = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/coupons/${userAddress}`);
      console.log("Fetched Coupons:", response.data); // Log for debugging
      setCoupons(response.data.coupons); // Extract the coupons key
    } catch (error) {
      setResponseMessage(
        error.response?.data?.error || "Error fetching coupons"
      );
    }
  };

  // Add New Material
  const addCitizenMaterial = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/add-material`, {
        name: citizenMaterialName,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error adding material"
      );
    }
  };

  // Log Waste Thrown
  const logWasteThrown = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/log-waste-thrown`, {
        citizenAddress,
        materialId: citizenMaterialId,
        weight: citizenWeight,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error logging waste"
      );
    }
  };

  // Get Citizen Info
  const getCitizenInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get-citizen-info/${citizenAddress}`
      );
      setTotalWasteThrown(response.data.totalWasteThrown);
      setLoyaltyPoints(response.data.loyaltyPoints);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error fetching citizen info"
      );
    }
  };

  // Redeem Loyalty Points
  const redeemLoyaltyPoints = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/redeem-loyalty-points`, {
        citizenAddress,
        points: citizenPoints,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error redeeming points"
      );
    }
  };

  // Add New Material
  const addMaterial = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/add-material`, {
        name: materialName,
        pricePerKg,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error adding material"
      );
    }
  };

  // Update Material Price
  const updateMaterialPrice = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/update-material-price`, {
        materialId,
        newPrice,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error updating material price"
      );
    }
  };

  // Log Recycling Contribution
  const logRecycling = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/log-recycling`, {
        materialId,
        weight: recycleWeight,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error logging recycling"
      );
    }
  };

  //Waste Management
  // Log Waste Collection
  const manageCollection = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/manage-collection`, {
        location: collectionLocation,
        totalWasteCollected,
        totalWasteRecycled,
        recyclingCompany,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error logging waste collection"
      );
    }
  };
  // Verify Recycling
  const verifyRecycling = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-recycling`, {
        collectionId,
        recyclingVerified,
      });
      setResponseMessage(response.data.message);
      setTxHash(response.data.txHash);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error verifying recycling"
      );
    }
  };

  // Fetch Waste Collection Details
  const getWasteCollectionDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/waste-collection/${collectionId}`
      );
      setWasteCollectionDetails(response.data);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Error fetching collection details"
      );
    }
  };

  // Get Total Waste Collections
  const getTotalWasteCollections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/total-waste-collections`);
      setTotalWasteCollections(response.data.totalWasteCollections);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message ||
          "Error fetching total waste collections"
      );
    }
  };

  return (
    <div className="App">
      {/* Video Background */}
      <video autoPlay loop muted id="video-background">
        <source src="/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="Title">
        <h1>
          Waste Management <br></br> Hedera Dapp
        </h1>
        <div>
          <p id="pre">
            <br></br>
            <br></br>
            Decentralized waste management platform leveraging Solidity, Hedera
            Hashgraph Node.js, Express.js, and Reactjs to track waste
            collection, reward recycling efforts, and ensure regulatory
            compliance.
          </p>
          <div className="tech-icons">
            <a
              href="https://soliditylang.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*PZv6C_X671fktg1t7CZvcg.png"
                alt="Solidity"
                title="Solidity"
              />
            </a>
            <a
              href="https://hardhat.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://icon.icepanel.io/Technology/svg/Hardhat.svg"
                alt="Hardhat"
                title="Hardhat"
              />
            </a>
            <a
              href="https://hedera.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://d2pasa6bkzkrjd.cloudfront.net/_resize/stateofcrypto2023/partner/500/site/stateofcrypto2023/images/userfiles/partners/3223c2a80145547dee32bfbe8652daec.png"
                alt="Hedera"
                title="Hedera"
              />
            </a>
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/330px-Node.js_logo.svg.png"
                alt="Node.js"
                title="Node.js"
              />
            </a>
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://miro.medium.com/v2/resize:fit:640/format:webp/0*Hdm7hBTZ-hKlbtlV.png"
                alt="React.js"
                title="React.js"
              />
            </a>
            <a
              href="https://www.usebruno.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://docs.usebruno.com/_next/image?url=%2Fbruno.png&w=48&q=75"
                alt="Bruno"
                title="Bruno"
              />
            </a>
          </div>
        </div>
        <div className="reponse">
          {/* Response */}

          <h3>Response</h3>
          <p>{responseMessage}</p>
          {txHash && (
            <p className="transaction-hash">Transaction Hash: {txHash}</p>
          )}
        </div>
      </div>

      <div className="Container">
        {/* bins manamenent section */}
        {/* Add Bin Form */}
        <div className="Section">
          <div>
            <h2>
              Bins Management<br></br>🚮
            </h2>
            <h3>Add a New Bin </h3>
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
            <br></br>
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
            <br></br>
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
            <br></br>
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
            <br></br>
            <button onClick={weighGarbage}>Weigh Garbage</button>
          </div>
        </div>

        {/* waste manamenent section */}
        <div className="Section">
          <h2>
            Waste Management <br></br>🗑️
          </h2>

          {/* Verify Recycling */}
          <h3>Verify Recycling</h3>
          <input
            type="text"
            placeholder="Collection ID"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
          />
          <br></br>
          <label>
            <input
              type="checkbox"
              id="checkbox"
              checked={recyclingVerified}
              onChange={(e) => setRecyclingVerified(e.target.checked)}
            />
            Recycling Verified
          </label>
          <br></br>
          <button onClick={verifyRecycling}>Verify Recycling</button>

          {/* Fetch Waste Collection Details */}
          <h3>Fetch Waste Collection Details</h3>
          <input
            type="text"
            placeholder="Collection ID"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
          />
          <br></br>
          <button onClick={getWasteCollectionDetails}>Get Details</button>
          {wasteCollectionDetails.collectionLocation && (
            <div>
              <p>
                Collection Location: {wasteCollectionDetails.collectionLocation}
              </p>
              <p>
                Total Waste Collected:{" "}
                {wasteCollectionDetails.totalWasteCollected}
              </p>
              <p>
                Total Waste Recycled:{" "}
                {wasteCollectionDetails.totalWasteRecycled}
              </p>
              <p>
                Recycling Company: {wasteCollectionDetails.recyclingCompany}
              </p>
              <p>
                Recycling Verified:{" "}
                {wasteCollectionDetails.recyclingVerified?.toString()}
              </p>
            </div>
          )}

          {/* Get Total Waste Collections */}
          <h3>Total Waste Collections</h3>

          <button onClick={getTotalWasteCollections}>Get Total</button>
          {totalWasteCollections && (
            <p>Total Collections: {totalWasteCollections}</p>
          )}

          <h3>Manage Waste Collection</h3>

          <input
            type="text"
            placeholder="Collection Location"
            value={collectionLocation}
            onChange={(e) => setCollectionLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Total Waste Collected (kg)"
            value={totalWasteCollected}
            onChange={(e) => setTotalWasteCollected(e.target.value)}
          />
          <input
            type="text"
            placeholder="Total Waste Recycled (kg)"
            value={totalWasteRecycled}
            onChange={(e) => setTotalWasteRecycled(e.target.value)}
          />
          <input
            type="text"
            placeholder="Recycling Company Wallet Address"
            value={recyclingCompany}
            onChange={(e) => setRecyclingCompany(e.target.value)}
          />
          <br></br>
          <button onClick={manageCollection}>Log Waste Collection</button>
          <div></div>
        </div>
        {/* recycling manamenent section */}
        <div className="Section">
          <h2>
            Recycling Management <br></br>♻️
          </h2>

          {/* Add Material */}
          <h3>Add a New Material</h3>
          <input
            type="text"
            placeholder="Material Name"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price per Kg"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(e.target.value)}
          />
          <br></br>
          <button onClick={addMaterial}>Add Material</button>

          {/* Update Material Price */}
          <h3>Update Material Price</h3>
          <input
            type="text"
            placeholder="Material ID"
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Price per Kg"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <br></br>
          <button onClick={updateMaterialPrice}>Update Price</button>

          {/* Log Recycling Contribution */}
          <h3>Log Recycling Contribution</h3>
          <input
            type="text"
            placeholder="Material ID"
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Weight (kg)"
            value={recycleWeight}
            onChange={(e) => setRecycleWeight(e.target.value)}
          />
          <br></br>
          <button onClick={logRecycling}>Log Recycling</button>
        </div>

        {/* citizen rewards manamenent section */}
        <div className="Section">
          <h2>
            Citizen Rewards Management <br></br>🧑‍✈️🤑
          </h2>

          {/* Log Waste Thrown */}
          <h3>Log Waste Thrown</h3>
          <input
            type="text"
            placeholder="Citizen Address"
            value={citizenAddress}
            onChange={(e) => setCitizenAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Material ID"
            value={citizenMaterialId}
            onChange={(e) => setCitizenMaterialId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Weight (kg)"
            value={citizenWeight}
            onChange={(e) => setCitizenWeight(e.target.value)}
          />
          <br></br>
          <button onClick={logWasteThrown}>Log Waste</button>

          {/* Get Citizen Info */}
          <h3>Get Citizen Info</h3>
          <input
            type="text"
            placeholder="Citizen Address"
            value={citizenAddress}
            onChange={(e) => setCitizenAddress(e.target.value)}
          />
          <br></br>
          <button onClick={getCitizenInfo}>Get Info</button>
          {totalWasteThrown && <p>Total Waste Thrown: {totalWasteThrown} kg</p>}
          {loyaltyPoints && <p>Loyalty Points: {loyaltyPoints}</p>}

          {/* Redeem Loyalty Points */}
          <h3>Redeem Loyalty Points</h3>
          <input
            type="text"
            placeholder="Citizen Address"
            value={citizenAddress}
            onChange={(e) => setCitizenAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Points to Redeem"
            value={citizenPoints}
            onChange={(e) => setCitizenPoints(e.target.value)}
          />
          <br></br>
          <button onClick={redeemLoyaltyPoints}>Redeem Points</button>
          <div className="coupon-management">
            <h2>Coupons Management 🆕</h2>

            {/* User Address Field */}
            <input
              type="text"
              placeholder="User Address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />

            {/* Generate Coupon Fields */}
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <input
              type="date"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
            <input
              type="number"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={generateCoupon}>Generate Coupon</button>

            {/* Fetch Coupons Button */}
            <button onClick={getUserCoupons}>Get User Coupons</button>

            {/* Display Coupons */}
            {coupons && coupons.length > 0 ? (
              <ul>
                {coupons.map(([code, expiry, amount], index) => (
                  <li key={index}>
                    <strong>Code:</strong> {code}, <strong>Value:</strong>{" "}
                    {amount}, <strong>Expires:</strong>{" "}
                    {new Date(expiry * 1000).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No coupons found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
