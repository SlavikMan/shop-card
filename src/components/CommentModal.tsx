import React, { useState } from "react";
import Modal from "react-modal";
import { Comment } from "../redux/productSlice";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (comment: Omit<Comment, "id" | "productId">) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const newComment = {
      description,
      date: new Date().toLocaleString(),
    };
    onSave(newComment);
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Add Comment</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default CommentModal;
