const axios = require("axios");

async function fetchData() {
  const response = await axios.get(
    "https://api.covalenthq.com/v1/80001/tokens/0x03e6Bc670d4ff706e93bBA83fE4f4d48a1AF9A97/nft_transactions/1/?&key=ckey_8c8f3894d8df461da7d2e9a0557"
  );
  console.log(
    response.data.data.items[0].nft_transactions[0].log_events.filter(
      (event) => (event.decoded?.name == "Transfer") && (event.sender_address == "0x03e6bc670d4ff706e93bba83fe4f4d48a1af9a97")
    ).map((event) => event.decoded?.params)
  );
}

fetchData();
