import { getDocumentsUrl } from "./api";

async function getDocuments() {
  try {
    const response = await fetch(getDocumentsUrl);

    if (response.status === 200) {
      const data = await response.json();

      return data.res;
    } else {
      throw new Error(response.status);
    }
  } catch (e) {
    console.log("error occured while fetching data", e);
  }
}

export { getDocuments };
