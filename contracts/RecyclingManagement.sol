// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RecyclingManagement {
    // Struct to store information about recyclable materials
    struct Material {
        string name;
        uint256 pricePerKg;
    }

    // Mapping to store materials with an ID
    mapping(uint256 => Material) public materials;
    uint256 public materialCount;

    // Event emitted when a new material is added
    event MaterialAdded(uint256 indexed materialId, string name, uint256 pricePerKg);

    // Event emitted when a material's price is updated
    event MaterialPriceUpdated(uint256 indexed materialId, uint256 oldPrice, uint256 newPrice);

    // Event emitted when a recycling contribution is logged
    event RecyclingLogged(address indexed user, uint256 materialId, uint256 weight);

    // Address of the owner of the contract
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

    // Function to add a new recyclable material
    function addMaterial(string memory _name, uint256 _pricePerKg) public onlyOwner {
        materials[materialCount] = Material(_name, _pricePerKg);
        emit MaterialAdded(materialCount, _name, _pricePerKg);
        materialCount++;
    }

    // Function to update the price of a recyclable material
    function updateMaterialPrice(uint256 _materialId, uint256 _newPrice) public onlyOwner {
        require(_materialId < materialCount, "Invalid material ID");

        uint256 oldPrice = materials[_materialId].pricePerKg;
        materials[_materialId].pricePerKg = _newPrice;

        emit MaterialPriceUpdated(_materialId, oldPrice, _newPrice);
    }

    // Function to log recycling contributions
    function logRecycling(uint256 _materialId, uint256 _weight) public {
        require(_materialId < materialCount, "Invalid material ID");
        require(_weight > 0, "Weight must be greater than zero");

        emit RecyclingLogged(msg.sender, _materialId, _weight);
    }
}