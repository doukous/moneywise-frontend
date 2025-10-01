import { useRouteError, isRouteErrorResponse, NavLink } from "react-router";
import { useLocation } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data?.message || "Something went wrong."}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-y-12">
      <h1>Unexpected Error</h1>
      <p>
        {error instanceof Error
          ? error.message
          : String(error ?? "Unknown error")}
      </p>
      <NavLink to={location.pathname} className="btn btn-primary">
        Recharger la page
      </NavLink>
    </div>
  );
}
