import "./App.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../src/context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SignIn from "./pages/SignIn";
import React, { lazy, Suspense } from "react";
import { Card } from "primereact/card";
import EditDishes from "./pages/EditDishes/EditDishes";

const Admin = lazy(() => import("./pages/Admin"));
const DishListPanel = lazy(() => import("./pages/DishList/DishListPanel"));
const AddDishPanel = lazy(() => import("./pages/AddDish/AddDishPanel"));

function App() {
  return (
    <AuthContextProvider>
      <Suspense fallback={<Card className="panel__card">Loading...</Card>}>
        <Routes className="App">
          <Route path="/" element={<SignIn />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addDish"
            element={
              <ProtectedRoute>
                <AddDishPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dishList"
            element={
              <ProtectedRoute>
                <DishListPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editList"
            element={
              <ProtectedRoute>
                <EditDishes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </AuthContextProvider>
  );
}

export default App;
