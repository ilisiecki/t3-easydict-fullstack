import { useEffect, useState } from "react";
import ThemeButton from "./themeButton";
import Logo from "./icons/logo";
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import AuthShowcase from "./authShowcase";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex h-24 w-full items-center justify-center">
      <div className="mx-4 flex w-full max-w-screen-lg items-center justify-between">
        <div className="flex items-center">
          <div className="animate-grow cursor-pointer">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="ml-8 hidden gap-4 font-semibold sm:flex">
            <div>
              <Link href="/" className="animate-header-options text-lg">
                Home
              </Link>
            </div>
            {sessionData ? (
              <div>
                <Link
                  href="/history"
                  className="animate-header-options text-lg"
                >
                  History
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex sm:hidden">
          <MobileMenu />
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="animate-grow">{mounted && <ThemeButton />}</div>
          <div className="animate-grow">
            <AuthShowcase />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:hidden">
        <div>{mounted && <ThemeButton />}</div>
        <div>
          <AuthShowcase />
        </div>
      </div>
    </header>
  );
};

export default Header;
