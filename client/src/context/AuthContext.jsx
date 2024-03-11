import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";
import { baseUrl } from "../utils/baseUrl";




export const AuthContext=createContext()


export const AuthContextProvider=({children})=>{

   const [user,setUser] =useState(""); // THIS TO STORE ALL the user
   const[registerError,setRegisterError]=useState(null)
   const[isRegisterLoading,setIsRegisterLoading]=useState(false)

   const [registerInfo,setRegisterInfo]=useState({
      name:"",
      email:"",
      password:"",
   })
  
   // state for login

   const[loginError,setLoginError]=useState(null)
   const[isLoginLoading,setIsLoginLoading]=useState(false)

   const [loginInfo,setLoginInfo]=useState({
     
      email:"",
      password:"",
   })
   console.log("login",loginInfo);

   // fetch user from local storage

      useEffect(() => {
       const user=localStorage.getItem("User")
        setUser(JSON.parse(user))
 
       }, [])


  

//update register function
   const updateRegisterInfo= useCallback(
     (info) => {
       setRegisterInfo(info)
     }, [],
   )
//update login state
   const updateLoginInfo=useCallback((info)=>{
      setLoginInfo(info)
   })

   


   //user register api function work after clicking submit button

  const registerUser = useCallback(async (e) => {
     e.preventDefault()
      setIsRegisterLoading(true)
      setRegisterError(null)
       
       const response=await postRequest(
         `${baseUrl}/users/register`,JSON.stringify(registerInfo))

         setIsRegisterLoading(false)


         if(response.error){
            return setRegisterError(response)
         }
         // save user to localstorage to prevent re login
         localStorage.setItem("User",JSON.stringify(response))
         setUser(response)
     },
     [registerInfo],//  The function will be memoized and only re-created if the registerInfo dependency change
   )
   //logout User

   const logoutUser=useCallback(()=>{
        localStorage.removeItem("User")
        setUser(null);

   })


   // user login api for working after  submit

   const loginUser=useCallback( async  (e)=>{
      e.preventDefault()
      setIsLoginLoading(true)
      setLoginError(null)
               const response=await postRequest(
                  `${baseUrl}/users/login`,JSON.stringify(loginInfo))

                  setIsLoginLoading(false)

                  if(response.error){
                     return setLoginError(response)
                  }
                  localStorage.setItem("User",JSON.stringify(response))
                  setUser(response)

                  

      },[loginInfo]
   )



   



   

    


   return (
      <AuthContext.Provider value={{
         user,
         registerInfo,
         updateRegisterInfo,
         registerUser,
         registerError,
         isRegisterLoading,
         logoutUser,
         loginInfo,
         updateLoginInfo,
         isLoginLoading,
         loginError,
         loginUser

         
      }}>{children}</AuthContext.Provider>

   )

}
