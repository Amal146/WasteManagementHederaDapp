// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CouponGenerator {
    struct Coupon {
        string code;
        uint256 expiration;
        uint256 value;
    }

    mapping(address => Coupon[]) public userCoupons;

    event CouponGenerated(
        address indexed user,
        string code,
        uint256 expiration,
        uint256 value
    );

    function generateCoupon(
        address _user,
        string memory _code,
        uint256 _expiration,
        uint256 _value
    ) public {
        userCoupons[_user].push(Coupon(_code, _expiration, _value));
        emit CouponGenerated(_user, _code, _expiration, _value);
    }

    function getCoupons(address _user)
        public
        view
        returns (Coupon[] memory)
    {
        return userCoupons[_user];
    }
}

contract RewardsLoyaltyPrograms {
    // Deployed Coupon Generator Contract
    CouponGenerator public couponGenerator;

    constructor() {
        couponGenerator = new CouponGenerator(); // Deploying nested contract
    }

    // Struct to store information about recyclable materials
    struct Material {
        string name;
    }

    // Struct to store citizen information
    struct Citizen {
        uint256 totalWasteThrown; // Total waste thrown by the citizen
        uint256 loyaltyPoints;    // Loyalty points earned by the citizen
    }

    // Mapping to store materials with an ID
    mapping(uint256 => Material) public materials;
    uint256 public materialCount;

    // Mapping to store citizen data by their address
    mapping(address => Citizen) public citizens;

    // Event emitted when a new material is added
    event MaterialAdded(uint256 indexed materialId, string name);

    // Event emitted when a waste throwing contribution is logged
    event WasteThrownLogged(address indexed user, uint256 materialId, uint256 weight);

    // Event emitted when loyalty points are updated
    event LoyaltyPointsUpdated(address indexed user, uint256 newPoints);

    // Address of the owner of the contract
    address public owner;

    // Modifier to restrict functions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Function to add a new recyclable material
    function addMaterial(string memory _name) public {
        materials[materialCount] = Material(_name);
        emit MaterialAdded(materialCount, _name);
        materialCount++;
    }

    // Function to log waste thrown by a citizen's address
    function logWasteThrown(address _citizen, uint256 _materialId, uint256 _weight) public {
        require(_materialId < materialCount, "Invalid material ID");
        require(_weight > 0, "Weight must be greater than zero");

        // Track the waste thrown by the citizen
        citizens[_citizen].totalWasteThrown += _weight;

        // Calculate loyalty points: 10 points per 1kg of waste thrown
        uint256 pointsEarned = _weight * 10;
        citizens[_citizen].loyaltyPoints += pointsEarned;

        emit WasteThrownLogged(_citizen, _materialId, _weight);
        emit LoyaltyPointsUpdated(_citizen, citizens[_citizen].loyaltyPoints);
    }

    // Function to get a citizen's total waste thrown and loyalty points
    function getCitizenInfo(address _citizen) public view returns (uint256, uint256) {
        return (citizens[_citizen].totalWasteThrown, citizens[_citizen].loyaltyPoints);
    }

    // Function to redeem loyalty points for rewards
    function redeemLoyaltyPoints(address _citizen, uint256 _points) public {
        require(citizens[_citizen].loyaltyPoints >= _points, "Not enough loyalty points");
        citizens[_citizen].loyaltyPoints -= _points;
        emit LoyaltyPointsUpdated(_citizen, citizens[_citizen].loyaltyPoints);
    }
}

