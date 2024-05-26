
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import  { XMarkIcon,} from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon,AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { connect } from 'react-redux'
import {get_categories} from '../../redux/actions/category'
import {get_products, get_filtered_products} from '../../redux/actions/products'
// En el archivo que importa (categoria.js)
import { prices } from '../../helpers/fixedPrices';
import ProCard from './ProductCard';
import { useParams } from 'react-router-dom';




const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Products ({
  get_products,
  products,
  get_filtered_products,
  filtered_products,
  categories,
  get_categories
}) {
  useEffect(() => {
    get_categories();
    get_products();
    window.scrollTo(0,0);
  }, [])

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  
  const [filtered, setFiltered] = useState(false)

  const params = useParams()
  const subcategory = params.subcategoryid
  
  const [formData, setFormData] = useState({
    category_id: '0',
    price_range: 'Any',
    sortBy: 'created',
    order: 'desc'
  })

  const { 
    category_id,
    price_range,
    sortBy,
    order
  } = formData




  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    get_filtered_products(category_id, price_range, sortBy , order)
    setFiltered(true)
  }


  const showProducts = () => {
    let results = [];
    let display = [];

    if (
      filtered_products &&
        filtered_products !== null &&
        filtered_products !== undefined &&
        filtered ? (
          filtered_products.map((product,index) => {
            return display.push(
              <div key={index}>
                <ProCard product={product} />
              </div>)
          }
          )

    ) : (
          !filtered &&
          products &&
          products !== null &&
          products !== undefined &&
          products.map((product,index) => {
            if (product.category === parseInt(subcategory)) {
              return display.push(
                <div key={index}>
                  <ProCard product={product} />
                </div>
              );
            } else {
              return null;
            }
          })
        ))

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
     
          <div className="bg-white">
    <div>
      {/* Mobile filter dialog */}


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">

          
  {categories != null &&
    categories != undefined &&
    categories &&
    categories.map((item) => {
      return item.sub_categories.map((subcategories, subIndex) => {
       if (subcategory == subcategories.id){
          console.log(subcategories.id)
        return(
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{subcategories.name}</h1>
        
      
)}}) })}
     
          
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Filters */}
            <form onSubmit={e=>onSubmit(e)} className="hidden lg:block">
            <label
                                          name='category_id'
                                          onChange={(e) => onChange(e)}
                                          value={"0"}
                                          className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                      />

              <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                {({ open }) => (
                  <>
                  <h3 className="-mx-2 -my-3 flow-root">
                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                      <span className="font-sofiapro-regular text-gray-900">Prices</span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <MinusIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-6">
                        {
                            prices && prices.map((price, index) => {
                                if (price.id === 0) {
                                    return (
                                        <div key={index} className='form-check'>
                                            <input
                                                onChange={e => onChange(e)}
                                                value={price.name}
                                                name='price_range'
                                                type='radio'
                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                defaultChecked
                                            />
                                            <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index} className='form-check'>
                                            <input
                                                onChange={e => onChange(e)}
                                                value={price.name}
                                                name='price_range'
                                                type='radio'
                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                            />
                                            <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                        </div>
                                    )
                                }
                            })
                        }
                      </div>
                    </Disclosure.Panel>

                    

                  </h3>
                  </>
                )}
                </Disclosure>

                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                {({ open }) => (
                  <>
                  <h3 className="-mx-2 -my-3 flow-root">
                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                      <span className="font-sofiapro-regular text-gray-900">Mas Filtros</span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <MinusIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-6">
                        <div className='form-group '>
                            <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                            >Ver por</label>
                              <select
                                  className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                  id='sortBy'
                                  name='sortBy'
                                  onChange={e => onChange(e)}
                                  value={sortBy}
                              >
                                <option value='date_created'>Fecha</option>
                                <option value='price'>Precio</option>
                                <option value='sold'>Sold</option>
                                <option value='title'>Nombre</option>

                              </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                            >Orden</label>
                            <select
                                className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                id='order'
                                name='order'
                                onChange={e => onChange(e)}
                                value={order}
                            >
                                <option value='asc'>A - Z</option>
                                <option value='desc'>Z - A</option>
                            </select>
                        </div>
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
    
  )
}

const mapStateToProps = state => ({
  categories: state.Categories.categories,
  products: state.Products.products,
  filtered_products: state.Products.filtered_products
})

export default connect(mapStateToProps,{
  get_categories,
  get_products,
  get_filtered_products
})(Products)