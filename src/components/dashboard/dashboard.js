import { connect } from "react-redux"
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  ClipboardIcon,
UserIcon,
} from '@heroicons/react/24/outline'
import Orders from "./ordenes/orderDetails"
import { Link } from "react-router-dom"
import DashboardLink from "./dashboardLinks"



const navigation = [
  { name: 'Ordenes', href: '#', icon: ClipboardIcon, current: true },
  { name: 'Perfil', href: '/Dashboard/Perfil', icon: UserIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
 

return(
         <div >
          <DashboardLink
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    navigation={navigation}
    />
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Ordenes</h1>
              </div>
              <div className="max-w-7xl mx-auto">
                <Orders/>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
        
      </div>
      


)

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps,{

})(Dashboard)