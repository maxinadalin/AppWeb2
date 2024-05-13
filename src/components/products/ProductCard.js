import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { get_products } from "../../redux/actions/products";

const ProCard = ({ producto, get_products }) => {
  const params = useParams();

  const subcategory = params.subcategoryid;


  useEffect(() => {
    get_products();
  }, []);

  console.log("Subcategoría:", subcategory);


  return (
    <>
      {producto &&
        producto !== null &&
        producto !== undefined &&
        producto.map((item) => {
            console.log("item.category:", item.category);
          if (item.category === parseInt(subcategory)) { 
            return (
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div key={item.id} className="group relative mx-2">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={item.photo}
                    alt=""
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                    <Link to={`/ProductDetail/${item.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${item.price}</p>
                </div>
              </div>
              </div>
              

              
            );
          }
        })}
    </>
  );
};

const mapStateToProps = (state) => ({
  producto: state.Products.products,
});

export default connect(mapStateToProps, {
  get_products,
})(ProCard);
