// import { Navigate } from "react-router-dom";

// function UserProtectedRoute({ children }) {

//   const user = JSON.parse(
//     localStorage.getItem("user")
//   );

//   if (!user) {

//     return <Navigate to="/login" replace />;

//   }

//   return children;

// }

// export default UserProtectedRoute;
import { Navigate } from "react-router-dom";

function UserProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;

}

export default UserProtectedRoute;