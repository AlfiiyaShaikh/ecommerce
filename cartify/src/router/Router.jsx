import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import SignupForm from "../pages/forms/SignUp";
import Products from "../pages/shop/Products";
import ProductDetail from "../pages/shop/ProductDetail";
import Login from "../pages/forms/Login";
import ForgotPassword from "../pages/forms/ForgotPassword";
import ShoppingCart from "../pages/shop/ShoppingCart";
import Checkout from "../pages/shop/Checkout";
import Confirmation from "../pages/shop/Confirmation";
import AdminLayout from "../layout/AdminLayout";
import Users from "../pages/admin/Users";
import AdminProducts from "../pages/admin/AdminProducts";
import Stores from '../pages/admin/Stores'
import Transactions from "../pages/admin/Transaction";
import AdminHome from "../pages/admin/AdminHome";
import ProtectedRoute from '../components/ProtectedRoute';

const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user;
};
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            }, {
                path: "/products",
                element: <Products />

            },
            {
                path: "/product/:prodId",
                element: <ProductDetail />,
            }
        ]
    },
    {
        path: "/signup",
        element: <SignupForm />,
    }, {
        path: "/login",
        element: <Login />,
    }, {
        path: 'forgot-password',
        element: <ForgotPassword />
    }, {
        path: 'cart',
        element: <ShoppingCart />
    }, {
        path: '/checkout',
        element: <Checkout />
    }, {
        path: '/confirmation',
        element: <Confirmation />
    }, {
        path: '/dashboard',
        element: <AdminLayout />,
        children: [{
            path: '/dashboard/',
            element: <ProtectedRoute
                element={<AdminHome />}
                isAuthenticated={isAuthenticated()}
            />
        },
        {
            path: "products",
            element: <ProtectedRoute
                element={<AdminProducts />}
                isAuthenticated={isAuthenticated()}
            />
        },
        {
            path: "users",
            element: <ProtectedRoute
                element={<Users />}
                isAuthenticated={isAuthenticated()}
            />
        },
        {
            path: "stores",
            element: <ProtectedRoute
                element={<Stores />}
                isAuthenticated={isAuthenticated()}
            />
        },
        {
            path: "transactions",
            element: <ProtectedRoute
                element={<Transactions />}
                isAuthenticated={isAuthenticated()}
            />
        }
        ],
    },
]);
export default router