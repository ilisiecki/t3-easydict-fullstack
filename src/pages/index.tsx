import { type NextPage } from "next";
import Head from "next/head";
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

/*type History = RouterOutputs["history"]["getAll"][0];

const Content: React.FC = () => {
  const [selectedHistory, setSelectedHistory] = useState<History | null>(null);
  const { data: sessionData } = useSession();
  const { data: history, refetch: refetchHistory } =
    api.history.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  const createHistory = api.history.create.useMutation({
    onSuccess: () => {
      void refetchHistory();
    },
  });

  return (
    <div>
      <div>
        wyswietlam
        <ul>
          {history?.map((history) => (
            <li key={history.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedHistory(history);
                }}
              >
                {history.searchedWord}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        wprowadzam
        <input
          type="text"
          placeholder="New History"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createHistory.mutate({
                searchedWord: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};
*/
