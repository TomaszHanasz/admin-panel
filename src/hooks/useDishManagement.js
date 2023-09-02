import { useState } from "react";

const useDishManagement = () => {
  const defaultDishValues = {
    name: "",
    price: null,
    description: "",
    image: "",
    ingredients: [],
    hidden: false,
  };

  const [dish, setDish] = useState(defaultDishValues);
  const [dishes, setDishes] = useState([]);

  const onChangeHandler = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  return {
    dish,
    dishes,
    setDish,
    setDishes,
    onChangeHandler,
    defaultDishValues,
  };
};

export default useDishManagement;
