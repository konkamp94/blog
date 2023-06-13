import { Outlet, Navigate } from "react-router-dom"
import Header from "./components/header"
import { useContext } from "react"
import { authContext } from "./context/authContext"

const Layout = () => {
    const { getToken } = useContext(authContext)

    if(!getToken()) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default Layout