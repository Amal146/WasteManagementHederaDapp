// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WasteManagementRegulation {

    // Struct to store waste collection information
    struct WasteCollection {
        uint256 collectionDate;    // Timestamp when the waste was collected
        string collectionLocation; // Location where the waste was collected
        uint256 totalWasteCollected; // Total waste collected in kg
        uint256 totalWasteRecycled; // Total waste recycled in kg
        address recyclingCompany;  // Address of the recycling company responsible for the collection
        bool recyclingVerified;    // Flag to indicate whether recycling was verified by the government
    }

    // Mapping to store the collection information by collection ID
    mapping(uint256 => WasteCollection) public wasteCollections;
    uint256 public wasteCollectionCount;

    // Address of the owner (government or regulatory authority)
    address public owner;

    // Modifier to restrict functions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Constructor to set the contract deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    // Event emitted when waste collection is logged
    event WasteCollectionLogged(uint256 indexed collectionId, uint256 collectionDate, string collectionLocation, uint256 totalWasteCollected, uint256 totalWasteRecycled, address recyclingCompany);

    // Event emitted when recycling verification is completed
    event RecyclingVerificationCompleted(uint256 indexed collectionId, bool recyclingVerified);

    // Function to manage waste collection (log waste collection by recycling company)
    function manageCollection(string memory _location, uint256 _totalWasteCollected, uint256 _totalWasteRecycled, address _recyclingCompany) public onlyOwner {
        require(_recyclingCompany != address(0), "Invalid recycling company address");
        wasteCollections[wasteCollectionCount] = WasteCollection(block.timestamp, _location, _totalWasteCollected, _totalWasteRecycled, _recyclingCompany, false);
        emit WasteCollectionLogged(wasteCollectionCount, block.timestamp, _location, _totalWasteCollected, _totalWasteRecycled, _recyclingCompany);
        wasteCollectionCount++;
    }

    // Function to monitor recycling and verify if the recycling company complied with the regulations
    function verifyRecycling(uint256 _collectionId, bool _recyclingVerified) public onlyOwner {
        require(_collectionId < wasteCollectionCount, "Invalid collection ID");

        // Update the recycling verification status
        WasteCollection storage collection = wasteCollections[_collectionId];
        collection.recyclingVerified = _recyclingVerified;

        emit RecyclingVerificationCompleted(_collectionId, _recyclingVerified);
    }

    // Function to get the details of a specific waste collection
    function getWasteCollectionDetails(uint256 _collectionId) public view returns (uint256, string memory, uint256, uint256, address, bool) {
        require(_collectionId < wasteCollectionCount, "Invalid collection ID");
        WasteCollection storage collection = wasteCollections[_collectionId];
        return (
            collection.collectionDate,
            collection.collectionLocation,
            collection.totalWasteCollected,
            collection.totalWasteRecycled,
            collection.recyclingCompany,
            collection.recyclingVerified
        );
    }

    // Function to get the total number of waste collection records
    function getTotalWasteCollections() public view returns (uint256) {
        return wasteCollectionCount;
    }
}
