import React, {Suspense} from "react";
import {Navigate, RouterProvider, createBrowserRouter} from "react-router-dom";
import {useAuth} from "@/providers/auth-provider";
import {ProtectedRoute} from "@/routes/protect-route";

// Only import components needed for the initial load
import NotFound from "@/components/app/404";
import OfflinePage from "@/components/app/offline";
import LoadingSpinner from "@/components/app/loading/spinner";

// Lazy load all page components
const Dashboard = React.lazy(() => import("@/pages/dashboard"));
const Reservation = React.lazy(() => import("@/pages/reservation"));
const Room = React.lazy(() => import("@/pages/room"));
const Department = React.lazy(() => import("@/pages/department"));
const Position = React.lazy(() => import("@/pages/position"));
const Employee = React.lazy(() => import("@/pages/employee"));
const POS = React.lazy(() => import("@/pages/pos"));
const Product = React.lazy(() => import("@/pages/product"));
const ProductCategory = React.lazy(() => import("@/pages/product-category"));
const RoomPicture = React.lazy(() => import("@/pages/room-picture"));
const Authentication = React.lazy(() => import("@/pages/authentication"));
const Home = React.lazy(() => import("@/pages/home"));
const Auth = React.lazy(() => import("@/pages/auth/auth"));
const Test = React.lazy(() => import("@/pages/test"));
const Customer = React.lazy(() => import("@/pages/customer"));

// Loading fallback component
// const LoadingSpinner = () => <div>Loading...</div>;

// LazyLoad wrapper component
const LazyLoad = (Component) => {
  const WrappedComponent = (props) => (
    <Suspense fallback={<LoadingSpinner />}>
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
    {path: "/test", element: LazyLoad(Test)()},
    {path: "/offline", element: <OfflinePage />},
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {path: "", element: LazyLoad(Home)()},
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

// import React from "react";
// import Dashboard from "@/pages/dashboard";
// import Reservation from "@/pages/reservation";
// import NotFound from "@/components/app/404";
// import Room from "@/pages/room";
// import Department from "@/pages/department";
// import Position from "@/pages/position";
// import Employee from "@/pages/employee";
// import POS from "@/pages/pos";
// import Product from "@/pages/product";
// import ProductCategory from "@/pages/product-category";
// import RoomPicture from "@/pages/room-picture";
// import Authentication from "@/pages/authentication";
// import Home from "@/pages/home";
// import Auth from "@/pages/auth/auth";
// import Test from "../pages/test";
// import OfflinePage from "@/components/app/offline";
// import Customer from "@/pages/customer";
// import {Navigate, RouterProvider, createBrowserRouter} from "react-router-dom";
// import {useAuth} from "@/providers/auth-provider";
// import {ProtectedRoute} from "@/routes/protect-route";

// const Routes = () => {
//   const {token} = useAuth();

//   const routesForPublic = [
//     {
//       path: "*",
//       element: <NotFound />,
//     },
//     {
//       path: "/test",
//       element: <Test />,
//     },
//     {
//       path: "/offline",
//       element: <OfflinePage />,
//     },
//   ];

//   const routesForAuthenticatedOnly = [
//     {
//       path: "/",
//       element: <ProtectedRoute />,
//       children: [
//         {
//           path: "",
//           element: <Home />,
//         },
//         {
//           path: "auth",
//           element: <Navigate to="/" />,
//         },
//         {
//           path: "/home",
//           element: <Home />,
//         },
//         {
//           path: "/dashboard",
//           element: <Dashboard />,
//         },
//         {
//           path: "/reservation",
//           element: <Reservation />,
//         },
//         {
//           path: "/room",
//           element: <Room />,
//         },
//         {
//           path: "/department",
//           element: <Department />,
//         },
//         {
//           path: "/position",
//           element: <Position />,
//         },
//         {
//           path: "/customer",
//           element: <Customer />,
//         },
//         {
//           path: "/employee",
//           element: <Employee />,
//         },
//         {
//           path: "/pos",
//           element: <POS />,
//         },
//         {
//           path: "/product",
//           element: <Product />,
//         },
//         {
//           path: "/category",
//           element: <ProductCategory />,
//         },
//         {
//           path: "/room-picture",
//           element: <RoomPicture />,
//         },
//         {
//           path: "/authentication",
//           element: <Authentication />,
//         },
//         {
//           path: "*",
//           element: <NotFound />,
//         },
//       ],
//     },
//   ];

//   const routesForNotAuthenticatedOnly = [
//     {
//       path: "/auth",
//       element: <Auth />,
//     },
//   ];

//   const router = createBrowserRouter([
//     ...routesForPublic,
//     ...(!token ? routesForNotAuthenticatedOnly : []),
//     ...routesForAuthenticatedOnly,
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default Routes;
