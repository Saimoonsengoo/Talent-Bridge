import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobsRecruiter from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/SuperAdmin/AdminLayout'
import AdminUsers from './components/SuperAdmin/AdminUser'
import AdminCompanies from './components/SuperAdmin/AdminCompanies'
import AdminJobs from './components/SuperAdmin/AdminJobs'
import AdminDashboard from './components/SuperAdmin/AdminDashboard'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // Admin Routes
  {
    path: "/admin/companies",
    element: <ProtectedRoute allowedRoles={["recruiter"]}>
      <Companies />
    </ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute allowedRoles={["recruiter"]}>
      <CompanyCreate />
    </ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute allowedRoles={["recruiter"]}>
      <CompanySetup />
    </ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute allowedRoles={["recruiter"]}>
      <AdminJobsRecruiter />
    </ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute allowedRoles={["recruiter"]}>
      <PostJob />
    </ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute allowedRoles={["recruiter"]}>
      <Applicants />
    </ProtectedRoute>
  },
  // Super Admin Dashboard 
  {
    path: "/superadmin",
    element: <ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>,
    children: [
      { path: "", element: <AdminDashboard /> }, // default
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "companies", element: <AdminCompanies /> },
      { path: "jobs", element: <AdminJobs /> }
    ]
  }




])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
