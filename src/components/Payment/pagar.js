import { connect } from "react-redux";
import Logo from "../../assets/img/sofigurumi.png";
import React from "react";
import { useCountries } from "use-react-countries";
import { Link } from "react-router-dom";
import { QuestionMarkCircleIcon,  } from '@heroicons/react/24/solid'

function Pay({}) {
  const { countries } = useCountries();

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src={Logo} alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Realizar Compra
        </h2>
      </div>

      <div className="w-full mt-8 ">
        <div className="w-full bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16" action="#" method="POST">
            <section className="space-y-6 lg:col-span-7">

                <div className=" flex flew-row xl:gap-x-4 ">
                <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    // value={name}
                    // onChange={(e) => onChange(e)}
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="last_Name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <div className="mt-1">
                  <input
                    id="last_Name"
                    name="last_Name"
                    // value={name}
                    // onChange={(e) => onChange(e)}
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

                </div>
            

              <div>
              <label
                htmlFor="Direccion"
                className="block text-sm font-medium text-gray-700"
              >
                Direccion
              </label>
              <div className="mt-1">
                <input
                  id="Direccion"
                  name="Direccion"
                  type="text"
                  autoComplete="Direccion"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Ciudad"
                className="block text-sm font-medium text-gray-700"
              >
                Ciudad
              </label>
              <div className="mt-1">
                <input
                  id="Ciudad"
                  name="Ciudad"
                  type="text"
                  autoComplete="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Pais
              </label>
              <select
                id="country"
                name="country"
                className="block w-full mt-1 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {countries.map(({ name, flags }) => (
                  <option key={name} value={name}>
                    <div className="flex items-center gap-x-2">
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-4 w-4 rounded-full object-cover inline-block"
                      />
                      {name}
                    </div>
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-1">
            <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Codigo Postal
              </label>
            <input
                    placeholder="0000"
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                  />
            </div>
            <div>
              <label
                htmlFor="Direccion"
                className="block text-sm font-medium text-gray-700"
              >
                Telefono
              </label>
              <div className="mt-1">
                <input
                  id="Telefono"
                  name="Telefono"
                  type="number"
                  autoComplete="Telefono"
                  required
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            </section>

             {/* Order summary */}
             <section
                    aria-labelledby="summary-heading"
                    className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                  >
                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                      PEDIDO
                    </h2>
        
                    <dl className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">$99.00</dd>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        <dt className="text-base font-medium text-gray-900">Total</dt>
                        <dd className="text-base font-medium text-gray-900">$112.32</dd>
                      </div>
                    </dl>
        
                    <div className="mt-6">
                      <Link to={"/Pagar"}
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
    </div>
  );
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {})(Pay);