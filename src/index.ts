import axios from "axios";
import { config as dotenv } from "dotenv";
import Moralis from "moralis";

dotenv();

const INTERVAL = 900_000; // 15 minutes

async function submit(commitment: string) {
  const redstoneResponse = await axios.get(
    `https://da.redstonechain.com/get/0x${commitment}`,
    { responseType: "arraybuffer" }
  );

  // Check if the commitment is already submitted
  try {
    await axios.get(`${process.env.ALT_DA_ENDPOINT!}/get/0x${commitment}`);
    console.error(`Commitment 0x${commitment} is already submitted`);
    return;
  } catch (error) {}

  // Submit the commitment
  try {
    const response = await axios.post(
      `${process.env.ALT_DA_ENDPOINT!}/put`,
      redstoneResponse.data
    );

    if (response.data == "0x" + commitment) {
      console.log(`Commitment 0x${commitment} submitted`);
    } else {
      console.error(`Commitment 0x${commitment} != ${response.data}`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY!,
  });

  const response = await Moralis.EvmApi.transaction.getWalletTransactions({
    chain: "0x1",
    order: "DESC",
    address: "0xA31cb9Bc414601171D4537580f98F66C03aECd43",
  });

  for (const transaction of response.result) {
    await submit(transaction.data!.substring(4));
  }
}

setInterval(() => main().catch(console.error), INTERVAL);
main().catch(console.error);
