
import { connect } from "react-redux"
import {SignIn} from "../../redux/actions/auth"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import logo from "../../assets/img/sofigurumi.png"
function Login({
    SignIn,
    isAuthenticated,
    loading
}) {

  const [redirect,setRedirect] = useState(false)

    const [formData, setFormData] = useState(
        {email:"",
        password:""}
    )

    const {email,password} = formData

    const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = (e) =>{
        e.preventDefault();
        SignIn(email,password)
        setRedirect(true)
    }

    if(redirect && !loading )
      return <Navigate to={"/"}/>

    return (
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form  onSubmit={(e)=> onSubmit(e)} className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e)=>onChange(e)}
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e)=>onChange(e)}
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-pink-200 focus:ring-pink-400 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm">
                    <Link to={"/RecuperarContraseña"} className="font-medium text-black-600 hover:text-pink-400">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-pink-300 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
  const mapStateToProps = (state) => ({
isAuthenticated : state.auth.isAuthenticated,
loading: state.auth.loading,
  })

  export default connect (mapStateToProps,{
    SignIn,

  })(Login)