import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  MinusIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { connect } from "react-redux";
import { get_categories } from "../../redux/actions/category";
import {
  get_products,
  get_filtered_products,
} from "../../redux/actions/products";
// En el archivo que importa (categoria.js)
import { prices } from "../../helpers/fixedPrices";
import ProductCard from "./productCardTotal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductsComplete({
  get_products,
  products,
  get_filtered_products,
  filtered_products,
  categories,
  get_categories,
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filtered, setFiltered] = useState(false);

  const [formData, setFormData] = useState({
    category_id: "0",
    price_range: "Any",
    sortBy: "created",
    order: "desc",
  });

  const { category_id, price_range, sortBy, order } = formData;

  useEffect(() => {
    get_categories();
    get_products();
    window.scrollTo(0, 0);
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    get_filtered_products(category_id, price_range, sortBy, order);
    setFiltered(true);
  };

  const showProducts = () => {
    let results = [];
    let display = [];

    if (
      filtered_products &&
      filtered_products !== null &&
      filtered_products !== undefined &&
      filtered
    ) {
      filtered_products.map((product, index) => {
        return display.push(
          <div key={index}>
            <ProductCard product={product} />
          </div>
        );
      });
    } else if (
      !filtered &&
      products &&
      products !== null &&
      products !== undefined
    ) {
      products.map((product, index) => {
        return display.push(
          <div key={index}>
            <ProductCard product={product} />
          </div>
        );
      });
    }

    for (let i = 0; i < display.length; i += 3) {
      results.push(
        <div key={i} className="grid md:grid-cols-3 ">
          {display[i] ? display[i] : <div className=""></div>}
          {display[i + 1] ? display[i + 1] : <div className=""></div>}
          {display[i + 2] ? display[i + 2] : <div className=""></div>}
        </div>
      );
    }

    return results;
  };

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Todos los patrones
              </h1>

              <div className="flex items-center">
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <AdjustmentsHorizontalIcon
                  className="w-5 h-5"
                  aria-hidden="true"
                />
              </button>
            </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form onSubmit={(e) => onSubmit(e)} className="hidden lg:block">
                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-sofiapro-regular text-gray-900">
                              Prices
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {prices &&
                                prices.map((price, index) => {
                                  if (price.id === 0) {
                                    return (
                                      <div key={index} className="form-check">
                                        <input
                                          onChange={(e) => onChange(e)}
                                          value={price.name}
                                          name="price_range"
                                          type="radio"
                                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                          defaultChecked
                                        />
                                        <label className="ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light">
                                          {price.name}
                                        </label>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div key={index} className="form-check">
                                        <input
                                          onChange={(e) => onChange(e)}
                                          value={price.name}
                                          name="price_range"
                                          type="radio"
                                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                        />
                                        <label className="ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light">
                                          {price.name}
                                        </label>
                                      </div>
                                    );
                                  }
                                })}
                            </div>
                          </Disclosure.Panel>
                        </h3>
                      </>
                    )}
                  </Disclosure>


                  <button
                    type="submit"
                    className="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Buscar
                  </button>
                </form>
                
                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {/* Replace with your content */}

                    {products && showProducts()}
                  </div>
                </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  categories: state.Categories.categories,
  products: state.Products.products,
  filtered_products: state.Products.filtered_products,
});

export default connect(mapStateToProps, {
  get_categories,
  get_products,
  get_filtered_products,
})(ProductsComplete);
