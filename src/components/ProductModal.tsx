import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addProduct } from "../redux/productSlice";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    count: 0,
    imageUrl: "",
    size: { width: 0, height: 0 },
    weight: "",
    comments: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]:
        name === "width" || name === "height"
          ? { ...prevState.size, [name]: Number(value) }
          : value,
    }));
  };

  const handleSubmit = () => {
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => dispatch(addProduct(data)));
    onClose();
  };

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="modal">
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <input
        type="number"
        name="count"
        value={product.count}
        onChange={handleChange}
        placeholder="Product Count"
      />
      <input
        type="text"
        name="imageUrl"
        value={product.imageUrl}
        onChange={handleChange}
        placeholder="Product Image URL"
      />
      <input
        type="number"
        name="width"
        value={product.size.width}
        onChange={handleChange}
        placeholder="Width"
      />
      <input
        type="number"
        name="height"
        value={product.size.height}
        onChange={handleChange}
        placeholder="Height"
      />
      <input
        type="text"
        name="weight"
        value={product.weight}
        onChange={handleChange}
        placeholder="Product Weight"
      />
      <button onClick={handleSubmit}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ProductModal;
