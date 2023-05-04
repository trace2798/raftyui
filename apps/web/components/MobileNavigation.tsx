import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { Dialog } from "@rafty/ui";

import { Logomark } from "@/components/Logo";
import { Navigation } from "@/components/Navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function MobileNavigation({ navigation }: { navigation: Navigation }) {
  let router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function onRouteChange() {
      setIsOpen(false);
    }

    router.events.on("routeChangeComplete", onRouteChange);
    router.events.on("routeChangeError", onRouteChange);

    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
      router.events.off("routeChangeError", onRouteChange);
    };
  }, [router, isOpen]);

  return (
    <>
      {/* <Dialog.Root>
        <Dialog.Trigger>
          <Bars3Icon className="h-6 w-6 stroke-slate-500" />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Body>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
              >
                <XMarkIcon className="h-6 w-6 stroke-slate-500" />
              </button>
              <Link href="/" className="ml-6" aria-label="Home page">
                <Logomark className="h-9 w-9" />
              </Link>
            </div>
            <Navigation navigation={navigation} className="mt-5 px-1" />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Root> */}
    </>
  );
}
