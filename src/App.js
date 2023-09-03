import "./App.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AddDishPanel from "./pages/AddDish/AddDishPanel";
import DishListPanel from "./pages/DishList/DishListPanel";

function App() {
  return (
    <Routes className="App">
      <Route path="/" element={<Admin />} />
      <Route path="/addDish" element={<AddDishPanel />} />
      <Route path="/dishList" element={<DishListPanel />} />
    </Routes>
  );
}

export default App;
