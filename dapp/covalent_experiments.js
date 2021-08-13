const axios = require("axios");

async function fetchTransactionHistory(tokenId) {
  const response = await axios.get(
    `https://api.covalenthq.com/v1/80001/tokens/0x03e6Bc670d4ff706e93bBA83fE4f4d48a1AF9A97/nft_transactions/${tokenId}/?&key=ckey_8c8f3894d8df461da7d2e9a0557`
  );
  return response.data.data.items[0].nft_transactions[0].log_events
    .filter(
      (event) =>
        event.decoded?.name == "Transfer" &&
        event.sender_address == "0x03e6bc670d4ff706e93bba83fe4f4d48a1af9a97"
    )
    .map((event) => {
      return {
        timestamp: event.block_signed_at,
        from: event.decoded?.params[0].value,
        to: event.decoded?.params[1].value,
      };
    });
}

fetchTransactionHistory(1).then(console.log);
