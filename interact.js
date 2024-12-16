const { ethers } = require("ethers");
require("dotenv").config();

// Setup Provider and Wallet
const provider = new ethers.providers.JsonRpcProvider("https://testnet.hashio.io/api");
const wallet = new ethers.Wallet("0xc8fc05608667bb191420fd78a191d0bf4762717aba530ddaf34a2236c4076f2e", provider);

// Contract ABI (example, replace with actual ABI from compilation)
const contractABI = [
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

// Contract Address (replace with the actual deployed address)
const contractAddress = "0x2a59Fc57b893851c1d66f68011c533dB5aEb4F0A";

// Initialize Contract
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function: Add a New Bin
async function addBin(binID, capacity, location) {
  try {
    const tx = await contract.addBin(binID, capacity, location);
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Bin added successfully with txHash:", tx.hash);
  } catch (error) {
    console.error("Error adding bin:", error);
  }
}

// Example: Get Bin Capacity
async function getBinCapacity(binID) {
  const capacity = await contract.checkBinCapacity(binID);
  console.log(`Bin Capacity: ${capacity}`);
}

// Example: Verify Bin Location
async function verifyBinLocation(binID) {
  const location = await contract.verifyLocation(binID);
  console.log(`Bin Location: ${location}`);
}

// Example: Weigh Garbage
async function weighGarbage(binID, weight) {
  const tx = await contract.weighGarbage(binID, weight);
  console.log("Transaction sent:", tx.hash);
  await tx.wait();
  console.log("Transaction confirmed");
}

// Call Functions
getBinCapacity("bin1");
verifyBinLocation("bin1");
weighGarbage("bin1", 10);
