import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../store/store";

type Props = {
  searchedWord: string;
  shouldSearch: boolean;
};

type Data = {
  items: Data[];
  word: string;
};

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const Result = (props: Props) => {
  const [response, setResponse] = useState<Data[]>([]);
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
      .get<Data[]>(baseURL + "/" + `${word}`)
      .then((response) => {
        const data = response.data;
        setResponse(data);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
        alert("Word not found");
      });
    setShouldSearch(false);
  };

  useEffect(() => {
    const word = props.searchedWord;
    if (props.searchedWord !== "" && props.shouldSearch) {
      fetchData(word).catch((err) => {
        // Handle errors
        console.error(err);
      });
    }
  }, [props.searchedWord, props.shouldSearch]);

  return (
    <div className="flex justify-center pt-10 text-3xl">
      <div>
        {Object.keys(response).length === 0 ? (
          <div>Czekam na wynik</div>
        ) : (
          <div className="capitalize">Searched Word: {response[0]?.word}</div>
        )}
        {Object.keys(response).map((key) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          return <div key={key}>{response[key].word}</div>;
        })}
      </div>
    </div>
  );
};

export default Result;
