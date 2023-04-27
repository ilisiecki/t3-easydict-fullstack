import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "./store/store";

type Props = {
  searchedWord: string;
  shouldSearch: boolean;
};

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const Result = (props: Props) => {
  const [response, setResponse] = useState([]);
  const [searchedWord, setSearchedWord, shouldSearch, setShouldSearch] =
    useStore((state) => [
      state.searchedWord,
      state.setSearchedWord,
      state.shouldSearch,
      state.setShouldSearch,
    ]);

  const fetchData = async (word: string) => {
    console.log("fetchuje");
    await axios
      .get(baseURL + "/" + `${word}`)
      .then((response) => {
        setResponse(response);
        // Handle response
        console.log(response.data);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
    setShouldSearch(false);
  };

  useEffect(() => {
    const word = props.searchedWord;
    if (props.searchedWord !== "" && props.shouldSearch) {
      fetchData(word);
    }
  }, [props.searchedWord, props.shouldSearch]);

  return <div></div>;
};

export default Result;
