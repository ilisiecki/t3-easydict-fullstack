import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../store/store";
import useSound from "use-sound";
import Speaker from "./icons/speaker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  searchedWord: string;
  shouldSearch: boolean;
};

type Phonetics = {
  audio: string;
};

type Definitions = {
  definition: string;
};

type Meanings = {
  partOfSpeech: string;
  definitions: Definitions[];
};

type Data = {
  word: string;
  phonetic: string;
  phonetics: Phonetics[];
  meanings: Meanings[];
};

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const Result = (props: Props) => {
  const [response, setResponse] = useState<Data[]>([]);
  const [test, setTest] = useState(
    "https://api.dictionaryapi.dev/media/pronunciations/en/ship-us.mp3"
  );
  const [dataFetched, setDataFetched] = useState(false);
  const lastItemInArray = -1;
  const [wordHaveSound, setWordHaveSound] = useState(false);
  const notifySuccess = () =>
    toast.success("Word found", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      className: "text-sm",
    });

  const notifyError = (word: string) =>
    toast.error(`Word ${word} not found, try again.`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      className: "text-sm",
    });

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
        notifySuccess();
      })
      .catch((err) => {
        // Handle errorss
        console.error(err);
        notifyError(word);
      });

    setShouldSearch(false);
  };

  const getAudioUrl = (response: Data[]) => {
    const phoneticsArray = response[0]?.phonetics;
    const urlFromPhoneticsArray = phoneticsArray
      ?.filter((item) => item.audio !== "")
      .at(lastItemInArray);
    if (urlFromPhoneticsArray !== undefined) {
      setWordHaveSound(true);
      setTest(urlFromPhoneticsArray?.audio);
    } else {
      setWordHaveSound(false);
    }
  };

  const [play] = useSound(test, {
    volume: 0.5,
  });

  const handleClick = () => {
    play();
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
  }

  return (
    <div className="flex justify-center pt-10 text-3xl">
      <div>
        {Object.keys(response).length === 0 ? (
          <div>Waiting for a word</div>
        ) : (
          <>
            <div className="mx-4<< flex max-w-[24rem] gap-4 md:w-[34rem] md:max-w-full">
              {wordHaveSound ? (
                <>
                  <div className="flex h-10 w-10 items-center justify-center">
                    <button
                      onClick={handleClick}
                      className="rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-500"
                    >
                      <Speaker />
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="flex flex-col">
                <div className="pb-4 text-base">
                  <span className="text-3xl font-semibold capitalize">
                    {response[0]?.word}
                  </span>
                  <span className="pl-4 text-2xl">{response[0]?.phonetic}</span>
                </div>
                <div className="text-xl capitalize">
                  {response[0]?.meanings[0]?.partOfSpeech}
                </div>
                <div className="text-base">
                  {response[0]?.meanings[0]?.definitions.map(
                    (definition, index) => (
                      <div key={index} className="flex pb-4">
                        <div className="-ml-12">({index})</div>
                        <div className="ml-8">{definition.definition}</div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Result;
