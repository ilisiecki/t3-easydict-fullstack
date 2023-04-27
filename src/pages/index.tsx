import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Searchbar from "./components/searchbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>easyDict</title>
        <meta name="description" content="Easy Dict Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 text-center text-3xl text-neutral-900 dark:text-white md:text-5xl">
            Quick and easy&nbsp;
            <span className="text-center font-bold">dictionary</span>
          </h1>
          <p className="mx-4 text-center text-lg text-neutral-900 dark:text-white md:text-xl">
            Type a word and hit enter or search icon to find a definition
          </p>
        </div>
        <div className="py-8">
          <Searchbar />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
