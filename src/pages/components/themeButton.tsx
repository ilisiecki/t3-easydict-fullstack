import { useTheme } from "next-themes";
import { memo } from "react";
import Sun from "./icons/sun";
import Moon from "./icons/moon";

type Props = {
  isOpen?: boolean;
};

const ThemeButton = (props: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {props.isOpen ? (
        <>
          {currentTheme === "dark" ? (
            <button
              onClick={() => setTheme("light")}
              className="flex items-center justify-center"
              aria-label="Toggle light mode"
            >
              <Sun />
            </button>
          ) : (
            <button
              onClick={() => setTheme("dark")}
              className="flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              <Moon />
            </button>
          )}
        </>
      ) : (
        <div className="hidden sm:flex">
          {currentTheme === "dark" ? (
            <button
              onClick={() => setTheme("light")}
              className="flex items-center justify-center"
              aria-label="Toggle light mode"
            >
              <Sun />
            </button>
          ) : (
            <button
              onClick={() => setTheme("dark")}
              className="flex items-center justify-center rounded-full"
              aria-label="Toggle dark mode"
            >
              <Moon />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default memo(ThemeButton);
