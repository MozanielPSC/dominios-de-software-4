import { Navigate } from "react-router-dom";

interface Props{
  children: any;
  user: object
}

export const ProtectedRoute = ({ user, children }: Props) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};