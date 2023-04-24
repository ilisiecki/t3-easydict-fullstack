import { useEffect, useRef, useState } from "react";

const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex w-96 items-center bg-white shadow-xl shadow-neutral-800/30 dark:bg-neutral-800 dark:text-white dark:shadow-2xl dark:shadow-black md:w-[34rem]">
          <input
            ref={inputRef}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            placeholder="type a word..."
            className="h-full w-full bg-transparent py-8 pl-8 lowercase text-neutral-800 caret-green-500 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
