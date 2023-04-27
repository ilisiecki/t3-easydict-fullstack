const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/hello";

const getWordData = () => {
  const url = new URL(BASE_URL);
  return fetch(url).then((res) => res.json());
};

export default getWordData;
