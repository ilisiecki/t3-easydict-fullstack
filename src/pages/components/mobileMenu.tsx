import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Hamburger from "./icons/hamburger";
import Xmark from "./icons/xmark";
import ThemeButton from "./themeButton";
import AuthShowcase from "./authShowcase";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MobileMenu = () => {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center	">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <Hamburger />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed top-0 z-10 h-full w-full"
          onClose={closeModal}
        >
          <Transition.Child as={Fragment}>
            <Dialog.Panel className="absolute top-0 h-full w-full bg-white dark:bg-neutral-900">
              <div className="absolute right-0 top-0 mx-4 my-6">
                <button onClick={closeModal}>
                  <Xmark />
                </button>
              </div>
              <div className="mt-14 flex h-full w-full justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div>
                    <ThemeButton isOpen={isOpen} />
                  </div>
                  <div>
                    <Link onClick={closeModal} href="/">
                      Home
                    </Link>
                  </div>
                  {sessionData ? (
                    <div>
                      <Link onClick={closeModal} href="/history">
                        History
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div>
                    <AuthShowcase isOpen={isOpen} />
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileMenu;
