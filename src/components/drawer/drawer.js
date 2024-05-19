import React from "react";
import { createPortal } from "react-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
];

// Drawer Component
const Drawer = ({ open, onClose, children }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 flex justify-end z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative w-3/12 h-full bg-white shadow-lg p-4 overflow-auto">
        {children}
      </div>
    </div>,
    document.body
  );
};

// Button Component
const Button = ({ children, onClick, variant = "filled", size = "md" }) => {
  const baseClasses =
    "font-medium rounded transition-colors duration-150 focus:outline-none";
  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const variantClasses =
    variant === "outlined"
      ? "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
};

// IconButton Component
const IconButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {children}
    </button>
  );
};

// Typography Component
const Typography = ({
  variant = "body",
  color = "black",
  children,
  className = "",
}) => {
  const baseClasses = `text-${color} ${className}`;
  const variantClasses = {
    h5: "text-lg font-semibold",
    body: "text-base",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

// DrawerPlacement Component
export function DrawerPlacement({ total_items,items,remove_item }) {
  const [openRight, setOpenRight] = React.useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

    // delete items
    const handleRemoveItem = (productId) => {
      // Llama a la función remove_item pasando el ID del producto
      remove_item(productId);
    };

  return (
    <React.Fragment>
      <div className="ml-4 flow-root lg:ml-6" onClick={openDrawerRight}>
        <Link to={"#"} className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {total_items}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </Link>
      </div>

      <Drawer open={openRight} onClose={closeDrawerRight}>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-12">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul
              role="list"
              className="border-t border-b border-gray-3/12 divide-y divide-gray-3/12"
            >
              {items && items.map((item, productIdx) => (
                <li key={productIdx.id} className="w-full flex flex-row py-2 sm:py-2 items-center justify-around relative">
                  <div className="flex-grow-1">
                    <img
                      src={item.product.photo}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-24 sm:h-24"
                    />
                  </div>

                  <div className="ml-4 flex-0 flex flex-col justify-between sm:ml-4">
                      <div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                         x {item.count}
                        </p>
                      </div>

                  </div>

                  <div className="ml-4 flex-0 flex flex-col items-center justify-between sm:ml-4">

                        <div className="flex ">
                          <h3 className="text-sm">
                            <span className=" font-medium text-gray-700 hover:text-gray-800">
                              {item.product.name}
                            </span>
                          </h3>
                        </div>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          $ {item.product.price}
                        </p>

                  </div>

                  <div className="absolute top-1 right-1">
                                  <button onClick={() => handleRemoveItem(productIdx.id)} type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Remove</span>
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                  </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </form>

        <div className="mt-6">
          <div className="mt-6">
            <Link
              to={"/FinalyCart"}
              type="submit"
              className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Ir al carrito
            </Link>
          </div>

          <div className="mt-6">
            <Link
              to={"/Pagar"}
              type="submit"
              className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Finalizar Compra
            </Link>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
