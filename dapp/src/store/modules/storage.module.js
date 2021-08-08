import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBjODYxMGFGYzdEOEYwMjg4OEU0NTY0NTU1MjZGYzU4OTc4RUJkQjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MjgzMjk0NTY1MjcsIm5hbWUiOiJORlRyYWlsIn0.Mtd74W1_zA5sZ5Q-v21wvQo9FfHMVJ7OzohTAUrhBzI";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

const storageModule = {
  namespaced: true,
  state: {
    accessToken: getAccessToken(),
    storageClient: makeStorageClient(),
  },
  actions: {
    async uploadFiles({ state }, files) {
      console.log("Storing files", files);
      const rootCid = await state.storageClient.put(files);
      console.log("stored files with rootCid:", rootCid);
      const res = await state.storageClient.get(rootCid);
      const uploadedFile = (await res.files())[0];
      return uploadedFile.cid;
    },
  },
};
export default storageModule;
