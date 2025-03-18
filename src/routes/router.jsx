import React, {Suspense, lazy} from "react";
import {Navigate, RouterProvider, createBrowserRouter} from "react-router-dom";
import {useAuth} from "@/providers/auth-provider";
import {ProtectedRoute} from "@/routes/protect-route";

// Only import components needed for the initial load
import NotFound from "@/components/app/404";
import OfflinePage from "@/components/app/offline";
import LoadingSpinner from "@/components/app/loading/spinner";
import HomeClient from "@/pages/client/home";

// Lazy load all page components
const Dashboard = lazy(() => import("@/pages/admin/dashboard"));
const Reservation = lazy(() => import("@/pages/admin/reservation"));
const Room = lazy(() => import("@/pages/admin/room"));
const Department = lazy(() => import("@/pages/admin/department"));
const Position = lazy(() => import("@/pages/admin/position"));
const Employee = lazy(() => import("@/pages/admin/employee"));
const POS = lazy(() => import("@/pages/admin/pos"));
const Product = lazy(() => import("@/pages/admin/product"));
const ProductCategory = lazy(() => import("@/pages/admin/product-category"));
const RoomPicture = lazy(() => import("@/pages/admin/room-picture"));
const Authentication = lazy(() => import("@/pages/admin/authentication"));
const Home = lazy(() => import("@/pages/admin/home"));
const Auth = lazy(() => import("@/pages/admin/auth/auth"));
const Customer = lazy(() => import("@/pages/admin/customer"));
const Test = lazy(() => import("@/pages/test"));

const LazyLoad = (Component) => {
  const WrappedComponent = (props) => (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[90vh]">
          <LoadingSpinner
            size="xl"
            variant="circle"
            color="purple"
            text="Loading..."
          />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `LazyLoad(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

const Routes = () => {
  const {token} = useAuth();

  const routesForPublic = [
    {path: "*", element: <NotFound />},
    {path: "/", element: <HomeClient />},
    {path: "/test", element: LazyLoad(Test)()},
    {path: "/offline", element: <OfflinePage />},
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        // {path: "", element: LazyLoad(Home)()},
        {path: "auth", element: <Navigate to="/" />},
        {path: "/home", element: LazyLoad(Home)()},
        {path: "/dashboard", element: LazyLoad(Dashboard)()},
        {path: "/reservation", element: LazyLoad(Reservation)()},
        {path: "/room", element: LazyLoad(Room)()},
        {path: "/department", element: LazyLoad(Department)()},
        {path: "/position", element: LazyLoad(Position)()},
        {path: "/customer", element: LazyLoad(Customer)()},
        {path: "/employee", element: LazyLoad(Employee)()},
        {path: "/pos", element: LazyLoad(POS)()},
        {path: "/product", element: LazyLoad(Product)()},
        {path: "/category", element: LazyLoad(ProductCategory)()},
        {path: "/room-picture", element: LazyLoad(RoomPicture)()},
        {path: "/authentication", element: LazyLoad(Authentication)()},
        {path: "*", element: <NotFound />},
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {path: "/auth", element: LazyLoad(Auth)()},
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
