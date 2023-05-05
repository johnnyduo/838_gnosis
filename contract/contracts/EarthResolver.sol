// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "./optidomains/DiamondResolverUtil.sol";

bytes32 constant EARTH_RESOLVER_STORAGE = keccak256("838earth.resolver.EarthResolver");

contract EarthResolver is DiamondResolverUtil, IERC165 {
    function setEarthKyc(bytes32 node, bytes32 kycHash) public authorised(node) {
        _attest(node, keccak256(abi.encodePacked(EARTH_RESOLVER_STORAGE)), abi.encode(kycHash));
    }

    function earthKyc(bytes32 node) public view returns(bytes32) {
        bytes memory response = _readAttestation(node, keccak256(abi.encodePacked(EARTH_RESOLVER_STORAGE)));
        return response.length == 0 ? bytes32(0) : abi.decode(response, (bytes32));
    }

    function supportsInterface(
        bytes4 interfaceID
    ) public view virtual override(IERC165) returns (bool) {
        return false;
    }
}