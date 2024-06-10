import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { activate } from "../../../redux/actions/auth";
import { Navigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const products = [
  {
    id: 1,
    name: "Distant Mountains Artwork Tee",
    price: "$36.00",
    description:
      "You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    href: "#",
    status: "Processing",
    step: 1,
    date: "March 24, 2021",
    datetime: "2021-03-24",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg",
    imageAlt:
      "Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.",
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function OrdersDetails({}) {
  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Order Details
          </h1>

          <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">Order number&nbsp;</dt>
              <dd className="font-medium text-gray-900">W086438695</dd>
              <dt>
                <span className="sr-only">Date</span>
                <span className="text-gray-400 mx-2" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="font-medium text-gray-900">
                <time dateTime="2021-03-22">March 22, 2021</time>
              </dd>
            </dl>
          </div>

          <div className="mt-8">
            <h2 className="sr-only">Products purchased</h2>

            <div className="space-y-24">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                >
                  <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                        
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="object-center object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h3>
                    <p className="font-medium text-gray-900 mt-1">
                      {product.price}
                    </p>
                    <p className="text-gray-500 mt-3">{product.description}</p>
                  </div>
                  <div className="sm:col-span-12 md:col-span-7">
                    <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                      <div>
                        <dt className="font-medium text-gray-900">
                          Delivery address
                        </dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{product.address[0]}</span>
                          <span className="block">{product.address[1]}</span>
                          <span className="block">{product.address[2]}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Shipping updates
                        </dt>
                        <dd className="mt-3 text-gray-500 space-y-3">
                          <p>{product.email}</p>
                          <p>{product.phone}</p>
                        </dd>
                      </div>
                    </dl>

                    {/* Billing */}
                    <div className="mt-10">
                      <div>
<div className="bg-gray-50 rounded-lg py-6 px-6 sm:col-span-12 md:col-span-7">
  <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
    <div className="pb-4 flex items-center justify-between">
      <dt className="text-gray-600">Subtotal</dt>
      <dd className="font-medium text-gray-900">$72</dd>
    </div>
    <div className="py-4 flex items-center justify-between">
      <dt className="text-gray-600">Shipping</dt>
      <dd className="font-medium text-gray-900">$5</dd>
    </div>
    <div className="py-4 flex items-center justify-between">
      <dt className="text-gray-600">Tax</dt>
      <dd className="font-medium text-gray-900">
        $6.16
      </dd>
    </div>
    <div className="pt-4 flex items-center justify-between">
      <dt className="font-medium text-gray-900">
        Order total
      </dt>
      <dd className="font-medium text-indigo-600">
        $83.16
      </dd>
    </div>
  </dl>
</div>
</div>

                   
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Billing */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(OrdersDetails);







