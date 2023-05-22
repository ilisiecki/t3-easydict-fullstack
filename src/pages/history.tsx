import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const History: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: history, isLoading, isError } = api.history.getAll.useQuery();
  const trpc = api.useContext();

  const { mutate: deleteMutation } = api.history.delete.useMutation({
    onMutate: async (deleteId) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await trpc.history.getAll.cancel();

      // Snapshot the previous value
      const previousHistoryElement = trpc.history.getAll.getData();

      trpc.history.getAll.setData(undefined, (prev) => {
        if (!prev) return previousHistoryElement;
        return prev.filter((history) => history.id !== deleteId);
      });

      return { previousHistoryElement };
    },

    onError: (err, newTodo, context) => {
      console.log("An error occures when deleting history element");
      trpc.history.getAll.setData(
        undefined,
        () => context?.previousHistoryElement
      );
    },
    onSettled: async () => {
      await trpc.history.getAll.invalidate();
    },
  });

  if (isLoading) return <div>Loading history 🔄</div>;
  if (isError) return <div>Error fetching history ❌</div>;

  return (
    <div className="flex flex-col items-center">
      {sessionData ? (
        <>
          <>
            {history.length
              ? history
                  .slice(0)
                  .reverse()
                  .map((history, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="mb-4 flex w-24 justify-center "
                        >
                          <div className="bg-neutral-200 px-8 py-4 dark:bg-neutral-800">
                            {history.searchedWord}
                          </div>
                          <button
                            onClick={() => {
                              deleteMutation(history.id);
                            }}
                            className="ml-2"
                          >
                            ❌
                          </button>
                        </div>
                      </>
                    );
                  })
              : "You don't have any words in history."}
          </>
        </>
      ) : (
        <>
          <div className="text-3xl">
            Please log in to see your search history.
          </div>
        </>
      )}
    </div>
  );
};

export default History;
