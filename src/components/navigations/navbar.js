import { connect } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition, Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  get_categories,
  get_categoty_by_arrival,
} from "../../redux/actions/category";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import { Navigate } from "react-router-dom";
import React from "react";
import logo from "../../assets/img/sofigurumi.png";
import SearchDialog from "./searchDialog";
import { DrawerPlacement } from "../drawer/drawer";
import { get_search_products } from "../../redux/actions/products";
import { get_item_total, get_items ,remove_item,get_total } from "../../redux/actions/cart";

const navigation = {
  pages: [
    { name: "Productos", href: "/Productos "},
    { name: "Categorias", href: "/Categorias" },
    { name: "Sobre Nosotros", href: "/AboutUs" },
    { name: "contacto", href: "/Contacto" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({
  categories,
  get_categories,
  isAuthenticated,
  get_categoty_by_arrival,
  logout,
  categories_arrival,
  get_search_products,
  get_item_total,
  total_items,
  get_items,
  items,
  remove_item,
  get_total,
  amount
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    get_categories();
    get_categoty_by_arrival();
    get_item_total();
    get_items();
    get_total();
  }, []);

  const [open, setOpen] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  // Search

  const [render, setRender] = useState(false);

  const [formData, setFormData] = useState({
    category_id: "0",
    search: "",
  });

  const { category_id, search } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    get_search_products(category_id, search);
    setRender(!render);
  };

  if (render) {
    return <Navigate to="/search" />;
  }

  // logou
  const logOutHandler = (e) => {
    e.preventDefault();
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to= "/" />;
  }

  const SearchHandler = () => {
    setSearchOpen(true);
  };


  const authLinks = (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
        <div className="flex -space-x-2 overflow-hidden">
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-pink-100"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/Dashboard"}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={logOutHandler}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  const guestLinks = (
    <Fragment>
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <Link
          to={"/Login"}
          className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium  text-black bg-pink-300 hover:bg-pink-400"
        >
          Sign in
        </Link>
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
        <Link
          to={"/Register"}
          href="#"
          className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-pink-300 hover:bg-pink-400"
        >
          Create account
        </Link>
      </div>
    </Fragment>
  );

  return (
    <>
      <div className="bg-white sticky top-0 z-10">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-pink-200 pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <Link
                          to={page.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <a
                        href="#"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </a>
                    </div>
                    <div className="flow-root">
                      <Link
                        to={"/Register"}
                        href="/Register"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-pink-100 ">
          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-30 "
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link to={"/"}>
                    <span className="sr-only">Your Company</span>
                    <img className="h-8 w-auto" src={logo} alt="" />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.pages.map((page) => (
                      <Link
                        to={page.href}
                        key={page.name}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <button
                      onClick={SearchHandler}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        {/* Barra de busqueda  */}
                        {/* {window.location.pathname === "/search" ? (
                          <></>
                        ) : ( */}
                        <SearchDialog
                          isOpen={searchOpen}
                          onClose={() => setSearchOpen(false)}
                          category_id={category_id}
                          search={search}
                          onChange={onChange}
                          onSubmit={onSubmit}
                        />
                        {/* )} */}
                      </span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Cart */}
                  <DrawerPlacement 
                  total_items={total_items} 
                  items={items}
                  remove_item = {remove_item}
                  amount={amount}
                  />

                  {/* Zona de links de ingresos */}
                  <span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center"></span>
                  {isAuthenticated ? authLinks : guestLinks}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  categories_arrival: state.Categories.categories_arrival,
  categories: state.Categories.categories,
  isAuthenticated: state.auth.isAuthenticated,
  total_items: state.Cart.total_items,
  items: state.Cart.items,
  amount: state.Cart.amount
});

export default connect(mapStateToProps, {
  get_categories,
  logout,
  get_categoty_by_arrival,
  get_search_products,
  get_item_total,
  get_items,
  remove_item,
  get_total,

})(NavBar);
