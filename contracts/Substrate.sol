// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Sapphire} from "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract Substrate {
    event NewWallet(bytes32 addr, bytes32 key);

    bytes32 public substrate_pk;
    bytes public substrate_pk_bytes;
    bytes32 public substrate_sk;
    bytes public substrate_sk_bytes;
    
    bytes public substrate_test_sig;

    function createSubstrate() external {
        bytes memory randSeed = Sapphire.randomBytes(32, "");

        // bytes32 keypairSecret = 0x689fec26ad6e43b74e7185fe6145533d97245e7c8e074c4e8d8e2a02e263964f;
        // bytes memory randSeed = abi.encodePacked(keypairSecret);

        (bytes memory pk, bytes memory sk) = Sapphire.generateSigningKeyPair(
            Sapphire.SigningAlg.Sr25519,
            randSeed
        );

        // (bytes memory pk, bytes memory sk) = Sapphire.generateSigningKeyPair(
        //     Sapphire.SigningAlg.Sr25519,
        //     randSeed
        // );

        substrate_pk = bytes32(pk);
        substrate_pk_bytes = pk;

        substrate_sk = bytes32(sk);
        // substrate_sk = bytes32(randSeed);
        // substrate_sk_bytes = sk;
        substrate_sk_bytes = randSeed;

        // substrate_sk_string =  string(abi.encode(sk));

        emit NewWallet(substrate_pk, substrate_sk);

        // Sign data
        bytes memory signature = Sapphire.sign(
            Sapphire.SigningAlg.Sr25519,
            abi.encodePacked(sk),
            abi.encodePacked(bytes32(0)),
            ""
        );

        // rsv = splitDERSignature(signature);
        // recoverV(pubkeyAddr, digest, rsv);

        // substrate_test_sig = signature;
    }
}