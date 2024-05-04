import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)


        const LoginUser = async(user) => {
            const {data} = await axios.get("https://65f482ddf54db27bc021df12.mockapi.io/api/v1/users")

            if(data) {
                const user_data = data.filter(item =>{
                    if(item.email === user.email && item.password ===user.password){
                        return item
                    }
                })
              if(user_data[0]){
                localStorage.setItem('@user' , JSON.stringify(user_data[0]))
                setUser(user_data[0])
                toast.success(`Bem-Vindo ${user_data[0].name}`)

                return true
              }
              return false
            }
            return false
        }

        const Logoff = () => {
            localStorage.removeItem('@user')
            setUser(null)
        }
        

    useEffect(() => {
        const storageUser = localStorage.getItem('@user')

        if(storageUser) {
            setUser(JSON.parse(storageUser))
        }

        
        
    }, [])

    return(
        <AuthContext.Provider value={{
            user,
            userLogged: Boolean(user),
            LoginUser,
            Logoff
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}