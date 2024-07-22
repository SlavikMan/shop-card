import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setProducts, deleteProduct } from "../redux/productSlice";
import ProductModal from "./ProductModal";

const ProductListView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => dispatch(setProducts(data)));
  }, [dispatch]);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" }).then(
      () => dispatch(deleteProduct(id))
    );
  };

  // Sorting logic here...

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Add Product</button>
      <ProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListView;
