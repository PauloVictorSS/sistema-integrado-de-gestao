import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export interface IAuthRouterProps {
    children: ReactNode
}

const AuthRoute: React.FunctionComponent<IAuthRouterProps> = (props) => {
    const { children } = props
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        AuthCheck()
    }, [auth])

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if(user)
            setLoading(false)
        else
            navigate("/")
    })

    if (loading) return <p>carregando...</p>

    return <>{children}</>
}

export default AuthRoute
