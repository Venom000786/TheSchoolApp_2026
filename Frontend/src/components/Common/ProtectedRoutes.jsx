import { Navigate } from "react-router-dom";

function ProtectedRoute({

    children,

    allowedRole

}) {

    const token =
    localStorage.getItem("token");

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );


    // no token
    if (!token) {

        return <Navigate to="/" />;
    }


    // wrong role
    if (
        allowedRole &&
        user?.role !== allowedRole
    ) {

        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;