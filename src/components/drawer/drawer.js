import React from "react";
import { createPortal } from "react-dom";
import {
    ShoppingBagIcon,
  } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Drawer Component
const Drawer = ({ open, onClose, children }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative w-80 h-full bg-white shadow-lg p-4 overflow-auto">
        {children}
      </div>
    </div>,
    document.body
  );
};

// Button Component
const Button = ({ children, onClick, variant = "filled", size = "md" }) => {
  const baseClasses = "font-medium rounded transition-colors duration-150 focus:outline-none";
  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const variantClasses = variant === "outlined" 
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
const Typography = ({ variant = "body", color = "black", children, className = "" }) => {
  const baseClasses = `text-${color} ${className}`;
  const variantClasses = {
    h5: "text-lg font-semibold",
    body: "text-base",
  };

  return <div className={`${baseClasses} ${variantClasses[variant]}`}>{children}</div>;
};

// DrawerPlacement Component
export function DrawerPlacement() {
  const [openRight, setOpenRight] = React.useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  return (
    <React.Fragment>


<div className="ml-4 flow-root lg:ml-6" onClick={openDrawerRight}>
                  <Link to={"#"} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                    
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>

     
      <Drawer open={openRight} onClose={closeDrawerRight}>
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="gray-900">
            Material Tailwind
          </Typography>
          <IconButton onClick={closeDrawerRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray-700" className="mb-8 pr-4">
          Material Tailwind features multiple React and HTML components, all written with Tailwind CSS classes and Material Design guidelines.
        </Typography>
        <div className="flex flex-col gap-2">
          <Link to={"/FinalyCart"} size="sm" variant="outlined">
            Ir al Carrito
          </Link>
          <Link to={"/Pagar"} size="sm">Finalizar Compra</Link>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
