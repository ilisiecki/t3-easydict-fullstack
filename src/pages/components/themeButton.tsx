import { useTheme } from "next-themes";
import { memo } from "react";

const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <button
          onClick={() => setTheme("light")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900"
          aria-label="Toggle light mode"
        >
          O
        </button>
      ) : (
        <button
          onClick={() => setTheme("dark")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white"
          aria-label="Toggle dark mode"
        >
          X
        </button>
      )}
    </div>
  );
};

export default memo(ThemeButton);
