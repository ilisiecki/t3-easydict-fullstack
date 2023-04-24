import { useEffect, useState } from "react";
import ThemeButton from "./themeButton";
import { Logo } from "./icons/logo";
import Link from "next/link";

export const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex h-24 w-full items-center justify-center border-[1px] border-red-500">
      <div className="mx-4 flex w-full max-w-screen-2xl items-center justify-between border-[1px] border-blue-500">
        <div className="flex items-center">
          <Logo />
          <div className="ml-8 flex gap-2">
            <div>
              <Link href="/">Home</Link>
            </div>
            <div>
              <Link href="/history">History</Link>
            </div>
          </div>
        </div>
        <div> {mounted && <ThemeButton />}</div>
      </div>
    </header>
  );
};