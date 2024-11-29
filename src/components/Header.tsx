"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// Commponents
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// Texts
import componentTexts from "./texts.json";

const Header: React.FC = () => {
  const router = useRouter();
  const { header } = componentTexts;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white" role="banner">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between mx-4 "
      >
        <div className="flex lg:flex-1">
          <a
            onClick={() => router.push(header.homeUrl)}
            className="cursor-pointer"
          >
            <span className="sr-only">{header.company}</span>
            <img
              alt={header.company}
              src="https://mn4.com/wp-content/uploads/2019/05/mango-logo.png"
              className="h-24 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden mx-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">{header.openMenu}</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 mr-8">
          {header.menuItems.map((e, i) => {
            return (
              <button
                key={e.key}
                onClick={() => router.push(e.url)}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {e.title}
              </button>
            );
          })}
        </PopoverGroup>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between mx-4 ">
            <a
              onClick={() => router.push(header.homeUrl)}
              className="-m-1.5 p-1.5 cursor-pointer"
            >
              <span className="sr-only">{header.company}</span>
              <img
                alt={header.company}
                src="https://mn4.com/wp-content/uploads/2019/05/mango-logo.png"
                className="h-24 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 mx-4 "
            >
              <span className="sr-only">{header.closeMenu}</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 mx-4 ">
              <div className="space-y-2 mx-4 ">
                {header.menuItems.map((e, i) => {
                  return (
                    <button
                      onClick={() => router.push(e.url)}
                      key={e.key}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {e.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
