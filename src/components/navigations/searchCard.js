import React from 'react';
import { connect } from 'react-redux';
import { get_products } from '../../redux/actions/products';
import { Link } from 'react-router-dom';

const SearchCard = ({  filtered_products }) => {
  return (
    <>

      <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-1 xxl:grid-cols-4 xl:gap-x-8">
        {filtered_products &&
        filtered_products !== null &&
        filtered_products !== undefined  &&
          filtered_products.map((product) => (
            <>
            <div key={product.id} className="group relative mx-2">  
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.photo}
                  alt=""
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/ProductosDetails/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
            </>
          ))
        }
        
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  producto: state.Products.products,

});

export default connect(mapStateToProps, { get_products })(SearchCard);
