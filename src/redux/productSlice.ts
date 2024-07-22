import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Size {
  width: number;
  height: number;
}

export interface Comment {
  id: number;
  productId: number;
  description: string;
  date: string;
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: Comment[];
}

const initialState: Product[] = [];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => action.payload,
    addProduct: (state, action: PayloadAction<Product>) => [
      ...state,
      action.payload,
    ],
    updateProduct: (state, action: PayloadAction<Product>) =>
      state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      ),
    deleteProduct: (state, action: PayloadAction<number>) =>
      state.filter((product) => product.id !== action.payload),
    addComment: (state, action: PayloadAction<Comment>) => {
      const product = state.find(
        (product) => product.id === action.payload.productId
      );
      if (product) {
        product.comments.push(action.payload);
      }
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.forEach((product) => {
        product.comments = product.comments.filter(
          (comment) => comment.id !== action.payload
        );
      });
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  addComment,
  deleteComment,
} = productSlice.actions;
export default productSlice.reducer;
