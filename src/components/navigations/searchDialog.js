import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { connect } from "react-redux";

function SearchDialog({ isOpen, onClose }) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center text-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <MagnifyingGlassIcon
                        className="h-6 w-6 text-black-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 mt-2"
                      >
                        Buscar
                      </Dialog.Title>
                      <div className="mt-8 ">
                        <form
                          // onSubmit={(e) => onSubmit(e)}
                          className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                          <input
                            id="search"
                            name="search"
                            // onChange={(e) => onChange(e)}
                            // value={search}
                            required
                            className="block w-full  bg-search border-gray-500 border-2 rounded-bl rounded-tr py-2 pl-10 pr-3 text-sm placeholder-gray-500 
                            focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 border-gray-500 sm:text-sm   focus:-translate-y-0.5 duration-100 "
                            placeholder="Search"
                            type="search"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onClose(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(SearchDialog);
