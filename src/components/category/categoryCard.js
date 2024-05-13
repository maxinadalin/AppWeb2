import { Link } from "react-router-dom"
const CategoryCard = ({ subcategory }) => {
  return (
      <div key={subcategory.id} className="group relative mx-2">
          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                  src={subcategory.photo}
                  alt=""
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
          </div>
          <div className="mt-4 flex justify-between">
              <div>
                  <h3 className="text-sm text-gray-700">
                      <Link to={`/Productos/${subcategory.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {subcategory.name}
                      </Link>
                  </h3>
              </div>
          </div>
      </div>
  );
}


export default CategoryCard