import Product from "@/types/Product";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface ProductState {
  allProducts: Product[];     
  visibleCount: number;  
  loading: boolean;
  error: string | null;      
} 

const initialState: ProductState = {
  allProducts: [],
  visibleCount: 3,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts",
  async () => {
    const res = await fetch("/data/products.json");
    if (!res.ok) throw new Error("Ошибка загрузки продуктов");
    const data: Product[] = await res.json();
    return data;
  }
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setVisibleCount(state, action: PayloadAction<number>) {
      state.visibleCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка"
      })
  }
});

export const { setVisibleCount } = productSlice.actions;
export default productSlice.reducer;
