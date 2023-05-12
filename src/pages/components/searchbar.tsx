import { useEffect, useRef, useState } from "react";
import Search from "./icons/search";
import Result from "./result";
import { useStore } from "../../store/store";

const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchedWord, setSearchedWord, shouldSearch, setShouldSearch] =
    useStore((state) => [
      state.searchedWord,
      state.setSearchedWord,
      state.shouldSearch,
      state.setShouldSearch,
    ]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = () => {
    if (searchedWord !== "") {
      setShouldSearch(true);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedWord(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="relative mx-4 flex w-96 items-center justify-center bg-white shadow-xl shadow-neutral-800/30 transition-colors duration-1000 dark:bg-neutral-800 dark:text-white dark:shadow-2xl dark:shadow-black md:w-[34rem]">
          <input
            ref={inputRef}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a word..."
            className="h-full w-full bg-transparent py-8 pl-4 lowercase text-neutral-800 caret-green-500 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
          ></input>
          <button onClick={handleClick} className="absolute right-0 mx-4">
            <Search />
          </button>
        </div>
      </div>
      <Result searchedWord={searchedWord} shouldSearch={shouldSearch} />
    </div>
  );
};

export default Searchbar;
