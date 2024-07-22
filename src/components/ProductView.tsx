import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  updateProduct,
  addComment,
  deleteComment,
  Product,
  Comment,
} from "../redux/productSlice";
import CommentModal from "./CommentModal";

const ProductView: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Extract productId from URL
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) =>
    state.products.find((p) => p.id === Number(productId))
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);

  const handleEdit = (updatedProduct: Product) => {
    fetch(`http://localhost:5000/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => dispatch(updateProduct(data)));
  };

  const handleAddComment = (comment: Omit<Comment, "id" | "productId">) => {
    const newComment = {
      ...comment,
      productId: Number(productId),
      id: Date.now(),
    };

    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => dispatch(addComment(data)));
  };

  const handleDeleteComment = (commentId: number) => {
    fetch(`http://localhost:5000/comments/${commentId}`, {
      method: "DELETE",
    }).then(() => dispatch(deleteComment(commentId)));
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.weight}</p>
      <button onClick={() => setEditModalOpen(true)}>Edit</button>
      <button onClick={() => setCommentModalOpen(true)}>Add Comment</button>
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        onSave={handleAddComment}
      />
      <ul>
        {product.comments.map((comment) => (
          <li key={comment.id}>
            <span>{comment.description}</span>
            <button onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductView;
