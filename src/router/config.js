import IndexComponent from '../components/index'
import Home from '../pages/home/index'

import HotelHub from '../pages/hotelHub/index'
import ParkHub from '../pages/parkHub/index'
import EducationHub from '../pages/educationHub/index'
import FamilyHub from '../pages/familyHub/index'

import IntelligentFamily from '../components/intelligentFamily/index'
import IntelligentSystems from '../components/intelligentSystems/index'
import IntelligentEntertainment from '../components/intelligentEntertainment/index'

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
        routes: [
          {
            path: '/family/family',
            component: IntelligentFamily,
            routes: [],
          },
          {
            path: '/family/systems',
            component: IntelligentSystems,
            routes: [],
          },
          {
            path: '/family/entertainment',
            component: IntelligentEntertainment,
            routes: [],
          },
        ],
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
    ],
  },
]

export default routes
