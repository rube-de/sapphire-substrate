import { ethers } from "hardhat";
import { randomBytes } from 'crypto';
import { expect } from 'chai';

function randomBytesUnlike(len: number, orig: Buffer): Buffer {
  do {
    var bytes = randomBytes(len);
  } while (len > 0 && bytes.equals(orig));
  return bytes;
}

async function testSignThenVerify(
  se: SigningTests,
  alg: number,
  keypair: { publicKey: string; secretKey: string },
  ctx: Buffer,
  msg: Buffer,
  ctx_len?: number,
  msg_len?: number,
) {
  const sig = await se.testSign(alg, keypair.secretKey, ctx, msg);

  expect(await se.testVerify(alg, keypair.publicKey, ctx, msg, sig)).equal(
    true,
  );

  // If message is changed, signature will not be valid
  if (msg.length != 0) {
    expect(
      await se.testVerify(
        alg,
        keypair.publicKey,
        ctx,
        randomBytesUnlike(msg.length, msg),
        sig,
      ),
    ).equal(false);
  }

  // If context is changed, signature will not be valid
  if (ctx.length != 0) {
    expect(
      await se.testVerify(
        alg,
        keypair.publicKey,
        randomBytesUnlike(ctx.length, ctx),
        msg,
        sig,
      ),
    ).equal(false);
  }

  if (ctx_len !== undefined) {
    if (ctx_len > 1) {
      expect(
        se.testVerify(
          alg,
          keypair.publicKey,
          randomBytes(ctx_len - 1),
          msg,
          sig,
        ),
      ).to.be.reverted;
    }
    expect(
      se.testVerify(alg, keypair.publicKey, randomBytes(ctx_len + 1), msg, sig),
    ).to.be.reverted;
  }

  if (msg_len !== undefined) {
    if (msg_len > 1) {
      expect(
        se.testVerify(
          alg,
          keypair.publicKey,
          ctx,
          randomBytes(msg_len - 1),
          sig,
        ),
      ).to.be.reverted;
    }
    expect(
      se.testVerify(alg, keypair.publicKey, ctx, randomBytes(msg_len + 1), sig),
    ).to.be.reverted;
  }
}

async function main() {
  const signingtestsAddr = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

  const signer = (await ethers.getSigners())[0];
  const se = await ethers.getContractAt('SigningTests', signingtestsAddr, signer);
  const keypair= await se.testKeygen(6, randomBytes(32));
  const EMPTY_BUFFER = Buffer.from([]);

  // Try sr25519 (alg=6)
  // 32 byte context, empty message
  const sha256_kp = await se.testKeygen(6, randomBytes(32));
  await testSignThenVerify(
    se,
    6,
    sha256_kp,
    randomBytes(32),
    EMPTY_BUFFER,
    32,
    0,
  );
  const sig = await se.testSign(
    6,
    keypair.secretKey,
    randomBytes(32),
    EMPTY_BUFFER);


  const tx = await se.testGenerateAndSign(6, randomBytes(32));
  await tx.wait();
  console.log(`Sign successful`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
