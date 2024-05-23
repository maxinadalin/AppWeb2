import { connect } from "react-redux";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import {
  get_item_total,
  get_items,
  remove_item,
  get_total,
  product_id,
  update_item,
} from "../../redux/actions/cart";
import { useEffect, useState } from "react";

function FinalyCart({
  items,
  get_item_total,
  get_items,
  remove_item,
  get_total,
  total_items,
  amount,
  update_item,
  count,
  item,
}) {
  useEffect(() => {
    get_item_total();
    get_items();
    get_total();
  }, []);

  const [render, setRender] = useState(false);
  // delete items
  const handleRemoveItem = (productId) => {
    // Llama a la función remove_item pasando el ID del producto
    remove_item(productId);
    window.location.reload();
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {items != null &&
                items != undefined &&
                items &&
                items.map((item) => (
                  <li key={item.product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.photo}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a
                                href={item.product.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {item.product.name}
                              </a>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            $ {item.product.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="absolute top-0 right-0">
                            <button
                              onClick={() => handleRemoveItem(item)}
                              type="button"
                              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                      {item.inStock ? (
                        <CheckIcon
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ClockIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product.inStock
                          ? "In stock"
                          : `Ships in ${product.leadTime}`}
                      </span>
                    </p> */}
                    </div>
                  </li>
                ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              PEDIDO
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  $ {amount}.00
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  $ {amount}.00
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                to={"/Pagar"}
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Finalizar Compra
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.Cart.items,
  total_items: state.Cart.total_items,
  amount: state.Cart.amount,
});
export default connect(mapStateToProps, {
  get_item_total,
  get_items,
  remove_item,
  get_total,
  update_item,
})(FinalyCart);
