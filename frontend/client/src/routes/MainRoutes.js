/* eslint-disable */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Login from 'views/auth/login';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const IntroductionDefault = Loadable(lazy(() => import('views/dashboard/Introduction')));
// utilities routing
const Payments = Loadable(lazy(() => import('views/utilities/Payment')));
const Membership = Loadable(lazy(() => import('views/utilities/Membership')));
const Chat = Loadable(lazy(() => import('views/utilities/Chat')));
const Sales = Loadable(lazy(() => import('views/utilities/Sales')));
const Currentgigs = Loadable(lazy(() => import('views/utilities/CurrentGigs')));
const AddGigs = Loadable(lazy(() => import('views/utilities/Addgigs')));
const EditGigs = Loadable(lazy(() => import('views/utilities/Editgigs')));
const EditProfile = Loadable(lazy(() => import('views/dashboard/EditProfile')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'login/:id',
      element: <Login />,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />,
        },
        {
          path: 'introduction',
          element: <IntroductionDefault />,
        },
        {
          path: 'editprofile',
          element: <EditProfile />,
        },
        {
          path: 'utils',
          children: [
            {
              path: 'payments',
              element: <Payments />,
            },
            {
              path: 'chat',
              element: <Chat />,
            },
            {
              path: 'sales',
              element: <Sales />,
            },
            {
              path: 'membership',
              element: <Membership />,
            },
          ],
        },
        {
          path: 'gigs',
          children: [
            {
              path: 'addgigs',
              element: <AddGigs />,
            },
            {
              path: 'viewgigs',
              element: <Currentgigs />,
            },
            {
              path: 'editgigs/:id',
              element: <EditGigs />,
            },
          ],
        },
      ],
    },
  ],
};

export default MainRoutes;
