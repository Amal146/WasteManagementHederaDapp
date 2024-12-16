const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Ethers.js setup

const provider = new ethers.providers.JsonRpcProvider("https://testnet.hashio.io/api");
const wallet = new ethers.Wallet("0xc8fc05608667bb191420fd78a191d0bf4762717aba530ddaf34a2236c4076f2e", provider);

// Contract ABI (example, replace with actual ABI from compilation)
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_binID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_capacity",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        }
      ],
      "name": "addBin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "binCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "bins",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "capacity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "currentWeight",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isCollected",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "materialType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "buyWaste",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "binID",
          "type": "string"
        }
      ],
      "name": "checkBinCapacity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "binID",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "status",
          "type": "bool"
        }
      ],
      "name": "manageCollection",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "materialPrices",
      "outputs": [
        {
          "internalType": "string",
          "name": "material",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "compliance",
          "type": "bool"
        }
      ],
      "name": "monitorRecycling",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "pointsToRedeem",
          "type": "uint256"
        }
      ],
      "name": "redeemPoints",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "binID",
          "type": "string"
        }
      ],
      "name": "reportCollection",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "points",
          "type": "uint256"
        }
      ],
      "name": "scanCard",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "trackPoints",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "materialType",
          "type": "string"
        }
      ],
      "name": "trackPrices",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "points",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "binID",
          "type": "string"
        }
      ],
      "name": "verifyLocation",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "binID",
          "type": "string"
        }
      ],
      "name": "viewWeight",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "binID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "weight",
          "type": "uint256"
        }
      ],
      "name": "weighGarbage",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

// ABI for WasteManagementRegulation
const wasteContractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "collectionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "recyclingVerified",
          "type": "bool"
        }
      ],
      "name": "RecyclingVerificationCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "collectionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "collectionDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "collectionLocation",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalWasteCollected",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalWasteRecycled",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "recyclingCompany",
          "type": "address"
        }
      ],
      "name": "WasteCollectionLogged",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getTotalWasteCollections",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_collectionId",
          "type": "uint256"
        }
      ],
      "name": "getWasteCollectionDetails",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_totalWasteCollected",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_totalWasteRecycled",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_recyclingCompany",
          "type": "address"
        }
      ],
      "name": "manageCollection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_collectionId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_recyclingVerified",
          "type": "bool"
        }
      ],
      "name": "verifyRecycling",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "wasteCollectionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "wasteCollections",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "collectionDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "collectionLocation",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "totalWasteCollected",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalWasteRecycled",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "recyclingCompany",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "recyclingVerified",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]; 

// ABI for RecyclingManagement
const recyclingContractABI =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "materialId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "pricePerKg",
          "type": "uint256"
        }
      ],
      "name": "MaterialAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "materialId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newPrice",
          "type": "uint256"
        }
      ],
      "name": "MaterialPriceUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "materialId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "weight",
          "type": "uint256"
        }
      ],
      "name": "RecyclingLogged",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_pricePerKg",
          "type": "uint256"
        }
      ],
      "name": "addMaterial",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_materialId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_weight",
          "type": "uint256"
        }
      ],
      "name": "logRecycling",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "materialCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "materials",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "pricePerKg",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_materialId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_newPrice",
          "type": "uint256"
        }
      ],
      "name": "updateMaterialPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

// ABI for Citizen-RewardsLoyalty
const citizenRewardsLoyaltyContractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newPoints",
          "type": "uint256"
        }
      ],
      "name": "LoyaltyPointsUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "materialId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "MaterialAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "materialId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "weight",
          "type": "uint256"
        }
      ],
      "name": "WasteThrownLogged",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addMaterial",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "citizens",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "totalWasteThrown",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "loyaltyPoints",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_citizen",
          "type": "address"
        }
      ],
      "name": "getCitizenInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_citizen",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_materialId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_weight",
          "type": "uint256"
        }
      ],
      "name": "logWasteThrown",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "materialCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "materials",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_citizen",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_points",
          "type": "uint256"
        }
      ],
      "name": "redeemLoyaltyPoints",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

// Contract Address (replace with the actual deployed address)
const contractAddress = "0x5CfdCDEfa9CA626dda2b76bDD3fAD8864d320264";
const wasteContractAddress = "0x292fFeDFd7FfD0010F63d3FC79FfC05Be37133c8";
const recyclingContractAddress = "0xE1e576551872Fe7c8d3feb8B8d024DF213dE965d";
const citizenRewardsContractAddress = "0x50B8b1929D6B3dc5920ec597Cc5457b16dB6F9Fa";

const contract = new ethers.Contract(contractAddress, contractABI, wallet);
const wasteContract = new ethers.Contract(wasteContractAddress, wasteContractABI, wallet);
const recyclingContract = new ethers.Contract(recyclingContractAddress, recyclingContractABI, wallet);
const citizenRewardContract = new ethers.Contract(citizenRewardsContractAddress, citizenRewardsLoyaltyContractABI, wallet);

// Route to Add a New Material
app.post("/add-material", async (req, res) => {
    try {
        const { name } = req.body;
        const tx = await citizenRewardContract.addMaterial(name);
        await tx.wait(); // Wait for the transaction to be mined
        res.status(200).json({ message: "Material added successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route to Log Waste Thrown (Citizen's Waste Contribution)
app.post("/log-waste-thrown", async (req, res) => {
    try {
        const { citizenAddress, materialId, weight } = req.body;
        const tx = await citizenRewardContract.logWasteThrown(citizenAddress, materialId, weight);
        await tx.wait(); // Wait for the transaction to be mined
        res.status(200).json({ message: "Waste thrown logged successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route to Get Citizen Info (Total Waste Thrown and Loyalty Points)
app.get("/get-citizen-info/:citizenAddress", async (req, res) => {
    try {
        const citizenAddress = req.params.citizenAddress;
        const [totalWasteThrown, loyaltyPoints] = await citizenRewardContract.getCitizenInfo(citizenAddress);
        res.status(200).json({ totalWasteThrown: totalWasteThrown.toString(), loyaltyPoints: loyaltyPoints.toString() });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route to Redeem Loyalty Points
app.post("/redeem-loyalty-points", async (req, res) => {
    try {
        const { citizenAddress, points } = req.body;
        const tx = await citizenRewardContract.redeemLoyaltyPoints(citizenAddress, points);
        await tx.wait(); // Wait for the transaction to be mined
        res.status(200).json({ message: "Loyalty points redeemed successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});


// Route to Add a New Material
app.post("/add-material", async (req, res) => {
    try {
        const { name, pricePerKg } = req.body;
        const tx = await recyclingContract.addMaterial(name, pricePerKg);
        await tx.wait();
        res.status(200).json({ message: "Material added successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route to Update Material Price
app.post("/update-material-price", async (req, res) => {
    try {
        const { materialId, newPrice } = req.body;
        const tx = await recyclingContract.updateMaterialPrice(materialId, newPrice);
        await tx.wait();
        res.status(200).json({ message: "Material price updated successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route to Log Recycling Contribution
app.post("/log-recycling", async (req, res) => {
    try {
        const { materialId, weight } = req.body;
        const tx = await recyclingContract.logRecycling(materialId, weight);
        await tx.wait();
        res.status(200).json({ message: "Recycling logged successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});


// Route to log a waste collection
app.post("/manage-collection", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { location, totalWasteCollected, totalWasteRecycled, recyclingCompany } = req.body;
    const tx = await wasteContract.manageCollection(location, totalWasteCollected, totalWasteRecycled, recyclingCompany);
    await tx.wait();
    res.status(200).json({ message: "Waste collection logged successfully!", txHash: tx.hash });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to verify recycling
app.post("/verify-recycling", async (req, res) => {
  try {
    const { collectionId, recyclingVerified } = req.body;
    const tx = await wasteContract.verifyRecycling(collectionId, recyclingVerified);
    await tx.wait();
    res.status(200).json({ message: "Recycling verification updated!", txHash: tx.hash });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch waste collection details
app.get("/waste-collection/:id", async (req, res) => {
  try {
    
    const collectionId = req.params.id;
    const details = await wasteContract.getWasteCollectionDetails(collectionId);
    res.status(200).json({
      collectionDate: details[0].toString(),
      collectionLocation: details[1],
      totalWasteCollected: details[2].toString(),
      totalWasteRecycled: details[3].toString(),
      recyclingCompany: details[4],
      recyclingVerified: details[5],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get total waste collections
app.get("/total-waste-collections", async (req, res) => {
  try {
    const totalCollections = await wasteContract.getTotalWasteCollections();
    res.status(200).json({ totalWasteCollections: totalCollections.toString() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Add a New Bin
app.post("/api/bins/add", express.json(), async (req, res) => {
  const { binID, capacity, location } = req.body;

  try {
    // Call smart contract method
    const tx = await contract.addBin(binID, capacity, location);
    await tx.wait();

    res.json({
      message: "Bin added successfully!",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("Error adding bin:", error);
    res.status(500).json({
      error: "Error adding bin",
      message: error.message,
    });
  }
});


// Endpoint: Get Bin Capacity
app.get("/api/bins/capacity/:binID", async (req, res) => {
  const binID = req.params.binID;
  try {
    const capacity = await contract.checkBinCapacity(binID);
    // Convert BigNumber to a plain number
    res.json({ capacity: capacity.toString() });
  } catch (error) {
    res.status(500).json({ error: "Error fetching bin capacity" });
  }
});


// Endpoint: Verify Bin Location
app.get("/api/bins/location/:binID", async (req, res) => {
  const binID = req.params.binID;
  try {
    const location = await contract.verifyLocation(binID);
    res.json({ location });
  } catch (error) {
    res.status(500).json({ error: "Error verifying bin location" });
  }
});

// Endpoint: Weigh Garbage
app.post("/api/bins/weigh", express.json(), async (req, res) => {
  const { binID, weight } = req.body;
  try {
    const tx = await contract.weighGarbage(binID, weight);
    await tx.wait();
    res.json({ message: "Garbage weighed successfully", txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: "Error weighing garbage" });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Waste Management API is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
