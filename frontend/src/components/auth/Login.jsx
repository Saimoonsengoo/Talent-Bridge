import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)

        // 🔐 ROLE-BASED REDIRECT
        const role = res.data.user.role

        if (role === "admin") {
          navigate("/superadmin/dashboard")
        } else {
          navigate("/")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/superadmin/dashboard")
      } else {
        navigate("/")
      }
    }
  }, [user])

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h1>

          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="you@example.com"
              className="mt-1"
              required
            />
          </div>

          <div className="mb-6">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-1"
              required
            />
          </div>

          {loading ? (
            <Button className="w-full py-3 flex justify-center gap-2" disabled>
              <Loader2 className="w-5 h-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Login
            </Button>
          )}

          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
