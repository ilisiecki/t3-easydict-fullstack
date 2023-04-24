import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  isOpen?: boolean;
}

const AuthShowcase = (props: Props) => {
  const { data: sessionData } = useSession();

  return (
    <>
      {props.isOpen ? (
        <>
          <div className="flex">
            <button
              className="rounded-full border-2 border-neutral-800 bg-white px-6 py-1 font-semibold text-neutral-800 transition dark:border-white dark:bg-neutral-900 dark:text-white"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="hidden sm:flex">
            <button
              className="rounded-full border-2 border-neutral-800 bg-white px-6 py-1 font-semibold text-neutral-800 transition dark:border-white dark:bg-neutral-900 dark:text-white"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuthShowcase;
