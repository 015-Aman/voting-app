import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/layout/Layout.jsx'
import VoterLogin from './pages/voterlogin/VoterLogin.jsx';
import VoterRegistration from './pages/voterRegistration/VoterRegisteration.jsx';
import AdminLogin from './pages/adminlogin/AdminLogin.jsx';
import Home from './pages/home/Home.jsx';
import CandidateRegistration from './pages/candidateregister/CandidateRegisteration.jsx';
import cookieParser from 'cookie-parser';
import CandidateLogin from './pages/candidatelogin/CandidateLogin.jsx';
import AdminDashboard from './pages/admindashboard/AdminDashboard.jsx';

import VoterDashboard from './pages/voterdashboard/VoterDashboard.jsx';
import CandidateDashboard from './pages/candidatedashboard/CandidateDashboard.jsx';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/adminlogin",
          element: <AdminLogin />,
        },
        {
          path: "/voterlogin",
          element: <VoterLogin />,
        },
        {
          path: "/voterreg",
          element: <VoterRegistration />,
        },
        {
          path: "/candidatereg",
          element: <CandidateRegistration />,
        },
        {
          path: "/candidatelogin",
          element: <CandidateLogin />,
        },
        {
          path: "/admindash",
          element: <AdminDashboard/>,
        },
        {
          path: "/candidatedash",
          element: <CandidateDashboard/>,
        },
        {
          path: "/voterdash",
          element: <VoterDashboard/>,
        }
      ],
    },
  ]);


    return <RouterProvider router={router} />;

  
}

export default App