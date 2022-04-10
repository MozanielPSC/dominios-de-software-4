import { Navigate } from "react-router-dom";

interface Props {
  children: any;
  user: object
}

export const RedirectRoute = ({ user, children }: Props) => {
  if (user) {
    return <Navigate to="/my-routes" replace />;
  }

  return children;
};
