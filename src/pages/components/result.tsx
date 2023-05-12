import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../store/store";
import useSound from "use-sound";
import Speaker from "./icons/speaker";

type Props = {
  searchedWord: string;
  shouldSearch: boolean;
};

type Phonetics = {
  audio: string;
};

type Data = {
  word: string;
  phonetic: string;
  phonetics: Phonetics[];
};

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const Result = (props: Props) => {
  const [response, setResponse] = useState<Data[]>([]);
  const [test, setTest] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  const [searchedWord, setSearchedWord, shouldSearch, setShouldSearch] =
    useStore((state) => [
      state.searchedWord,
      state.setSearchedWord,
      state.shouldSearch,
      state.setShouldSearch,
    ]);

  const fetchData = async (word: string) => {
    await axios
      .get<Data[]>(baseURL + "/" + `${word}`)
      .then((response) => {
        setDataFetched(true);
        const data = response.data;
        setResponse(data);
      })
      .catch((err) => {
        // Handle errorss
        console.error(err);
        alert("Word not found");
      });

    setShouldSearch(false);
  };

  const getAudioUrl = (response: Data[]) => {
    const phoneticsArray = response[0]?.phonetics;
    const urlFromPhoneticsArray = phoneticsArray
      ?.filter((item) => item.audio !== "")
      .pop();
    if (urlFromPhoneticsArray !== undefined) {
      setTest(urlFromPhoneticsArray?.audio);
      console.log("test", test);
    }
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

  if (dataFetched) {
    getAudioUrl(response);
    setDataFetched(false);
    console.log("XD");
  }

  console.log(test);
  const [play] = useSound(test, {
    volume: 0.5,
  });

  const handleClick = () => {
    play();
  };

  return (
    <div className="flex justify-center pt-10 text-3xl">
      <div>
        {Object.keys(response).length === 0 ? (
          <div>Czekam na wynik</div>
        ) : (
          <div className="flex flex-row gap-4">
            <div className="flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-500">
              <button onClick={handleClick} className="p-2">
                <Speaker />
              </button>
            </div>
            <div className="text-2xl capitalize">
              Word:{" "}
              <span className="text-3xl font-bold">{response[0]?.word}</span>
            </div>
            <div className="text-2xl">
              Phonetic:{" "}
              <span className="text-3xl font-bold">
                {response[0]?.phonetic}
              </span>
            </div>
          </div>
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
