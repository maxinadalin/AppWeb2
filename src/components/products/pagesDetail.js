import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  get_product,
  get_related_products,
} from "../../redux/actions/products";
import ImageGalery from "../products/ImageGalery";
import { Oval } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { get_total,
  get_item_total,
add_item,
get_items} from "../../redux/actions/cart"

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Product_Detail({
  get_product,
  get_related_products,
  product,
   add_item,
  isAuthenticated,
  get_total,
  get_items
  //   add_wishlist_item,
  //   get_wishlist_items,
  //   get_wishlist_item_total,
  //   remove_wishlist_item,
  //   get_reviews,
  //   get_review,
  //   create_review,
  //   update_review,
  //   delete_review,
  //   filter_reviews,
  // wishlist,
  // review,
  // reviews,
}) {
  const params = useParams();
  const id = params.productId;

  useEffect(() => {
    window.scrollTo(0, 0);
    get_product(id);
    get_related_products(id);

    // get_wishlist_items()
    // get_wishlist_item_total()
  }, []);

  // useEffect(() => {
  //     get_reviews(id);
  // }, [id]);

  // useEffect(() => {
  //     get_review(id);
  // }, [id]);

  // const [formData, setFormData] = useState({
  //   comment:'',
  //   rating:'',
  // })

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addToCart = async () => {
    if (
      product &&
      product !== null &&
      product !== undefined &&
      product.quantity > 0
    ) {
      setLoading(true);
      await add_item(product);
      setLoading(false);
      window.location.reload()
      window.scrollTo(0,0)
      console.log(product.id);
    }
  };

  // if  (!isAuthenticated)
  // return(<Navigate to={"/Login"}/>)

  return (
    <div className="bg-white">
      <div className="bg-white">
        <div className="pt-6">
          <ImageGalery photo={product && product.photo} />
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product && product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              {product && product !== null && product !== undefined ? (
                product.price_discount === 0 ? (
                  <p className="text-3xl tracking-tight text-gray-900">
                    $ {product.price}
                  </p>
                ) : (
                  <p className="text-3xl tracking-tight text-gray-900">
                    $ {product.final_price}
                  </p>
                )
              ) : (
                <p className="text-3xl tracking-tight text-gray-900">
                  No product information available
                </p>
              )}

              <div className="mt-10">
                {loading ? (
                  <button className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Oval type="Oval" color="#fff" width={20} height={20} />
                  </button>
                ) : (
                  <button
                    onClick={addToCart}
                    className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                  >
                    Agregar al Carrito
                  </button>
                )}
                {/* <WishlistHeart
                product={product}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                /> */}
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product &&
                      product !== null &&
                      product !== undefined &&
                      product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product &&
                      product !== null &&
                      product !== undefined &&
                      product.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  product: state.Products.product,
  // wishlist: state.Wishlist.wishlist,
  // review: state.Reviews.review,
  // reviews: state.Reviews.reviews,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  get_product,
  get_related_products,
    get_items,
  add_item,
    get_total,
  //  add_wishlist_item,
  //  get_wishlist_items,
  //  get_wishlist_item_total,
  //  remove_wishlist_item,
  //  get_reviews,
  //  get_review,
  //  create_review,
  //  update_review,
  //  delete_review,
  //  filter_reviews
})(Product_Detail);
