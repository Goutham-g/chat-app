import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Alert } from "react-bootstrap";





const Login = () => {

const {loginInfo,loginUser,updateLoginInfo,isLoginLoading,loginError,}=useContext(AuthContext)
 const loginDetails = (e)=>{
   // let value = e.target.value
    // let name = e.target.name
    //destructure >>
    let { value, name } = e.target
    updateLoginInfo({ ...loginInfo, [name]: value })

}

    return ( <>
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://i.postimg.cc/P553gkq2/allthings-how-how-to-enable-dark-mode-in-teams-chat-on-windows-11-teams-chat-dark-mode-removebg-prev.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-grey-500">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={loginUser} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-400">
                Email address
              </label>
              <div className="mt-2">
                <input
                onChange={loginDetails}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-slate-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-400">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-grey-700 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                onChange={loginDetails}

                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            {
                loginError?.error && (<Alert className="mt-2" variant="danger">
                <p>{loginError?.message}</p></Alert>)
              }
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-grey-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    
    
    
    </> );
}
 
export default Login;