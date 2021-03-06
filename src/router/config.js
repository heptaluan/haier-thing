import IndexComponent from '../components/index'
import Home from '../pages/home/index'

import HotelHub from '../pages/hotelHub/index'
import ParkHub from '../pages/parkHub/index'
import EducationHub from '../pages/educationHub/index'
import FamilyHub from '../pages/familyHub/index'

import Login from '../components/common/login/index'
import Setting from '../components/common/setting/index'


const routes = [
  {
    path: '/',
    component: IndexComponent,
    routes: [
      {
        path: '/home',
        component: Home,
        routes: [],
      },
      {
        path: '/family',
        component: FamilyHub,
        routes: [],
      },
      {
        path: '/park',
        component: ParkHub,
        routes: [],
      },
      {
        path: '/hotel',
        component: HotelHub,
        routes: [],
      },
      {
        path: '/education',
        component: EducationHub,
        routes: [],
      },
      {
        path: '/login',
        component: Login,
        routes: [],
      },
      {
        path: '/setting',
        component: Setting,
        routes: [],
      },
    ],
  },
]

export default routes
