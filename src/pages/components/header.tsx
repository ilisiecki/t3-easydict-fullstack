import { useEffect, useState } from "react";
import ThemeButton from "./themeButton";
import Logo from "./icons/logo";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex h-24 w-full items-center justify-center">
      <div className="mx-4 flex w-full max-w-screen-lg items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <div className="ml-8 flex gap-2 font-semibold">
            <div>
              <Link href="/">Home</Link>
            </div>
            <div>
              <Link href="/history">History</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>{mounted && <ThemeButton />}</div>
          <div>
            <AuthShowcase />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <button
        className="rounded-full border-2 border-neutral-800 bg-white px-6 py-1 font-semibold text-neutral-800 transition dark:border-white dark:bg-neutral-900 dark:text-white"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
