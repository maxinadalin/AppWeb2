import { connect } from 'react-redux'
import {list_orders} from '../../../redux/actions/orders'
import {
    get_items,
    get_total,
    get_item_total
} from "../../../redux/actions/cart";
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import DashboardLink from '../../../components/dashboard/dashboardLinks';
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  PaperClipIcon,
  UserIcon,
  ClipboardCheckIcon,
} from '@heroicons/react/outline'

import { Link } from 'react-router-dom';
import { countries } from '../../../helpers/fixedCountries';
import { update_user_profile } from '../../../redux/actions/profile';
import { Oval } from "react-loader-spinner"
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const navigation = [
  { name: 'Ordenes', href: '/Dashboard', icon: ClipboardCheckIcon, current: true },
  { name: 'Perfil', href: '/Dashboard/Perfil', icon: UserIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Profile =({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    isAuthenticated,
    user,
    update_user_profile,
    profile
})=>{

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        get_items()
        get_total()
        get_item_total()
        list_orders()
    }, [])

    const [formData, setFormData] = useState({
        address_line_1: '',
        address_line_2: '',
        city: '',
        state_province_region: '',
        zipcode: '',
        phone: '',
        country_region: 'Canada'
    });

    const {
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        zipcode,
        phone,
        country_region
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      setLoading(true)
      update_user_profile(
          address_line_1,
          address_line_2,
          city,
          state_province_region,
          zipcode,
          phone,
          country_region
      );
      setLoading(false)
      window.scrollTo(0, 0);
  };

    if(!isAuthenticated)
        return <Navigate to="/"/>

    return (
        <>
            <div>
    <DashboardLink
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    navigation={navigation}
    />

    
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <form onSubmit={e => onSubmit(e)} className="max-w-3xl mx-auto">
      
        
              <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Address Line 1: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='address_line_1'
                      placeholder={`${profile.address_line_1}`}
                      onChange={e => onChange(e)}
                      value={address_line_1}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Address Line 2: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='address_line_2'
                      placeholder={`${profile.address_line_2}`}
                      onChange={e => onChange(e)}
                      value={address_line_2}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                City
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='city'
                      placeholder={`${profile.city}`}
                      onChange={e => onChange(e)}
                      value={city}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                State/Province: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='state_province_region'
                            placeholder={`${profile.state_province_region}`}
                            onChange={e => onChange(e)}
                            value={state_province_region}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Postal Code/Zipcode: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='zipcode'
                            placeholder={`${profile.zipcode}`}
                            onChange={e => onChange(e)}
                            value={zipcode}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Phone: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='phone'
                            placeholder={`${profile.phone}`}
                            onChange={e => onChange(e)}
                            value={phone}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Country
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                            id='country_region' 
                            name='country_region'
                            onChange={e => onChange(e)}
                        >
                            <option value={country_region}>{profile.country_region}</option>
                            {
                                countries && countries.map((country, index) => (
                                    <option key={index} value={country.name}>{country.name}</option>
                                ))
                            }
                        </select>
                </div>
              </div>

              {loading?<button
                className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Oval
                type="Oval"
                width={20}
                height={20}
                color="#fff"
                />
              </button>:<button
                type="submit"
                className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>}

            </form>
            </div>
            </div>
          </main>
        </div>
      </div>
        </>
    )
}

const mapStateToProps =state=>({
    orders: state.Orders.orders,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    profile: state.Profile.profile,
})

export default connect(mapStateToProps,{
    list_orders,
    get_items,
    get_total,
    get_item_total,
    update_user_profile
}) (Profile)