import Product from "@/types/Product";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface ProductState {
  allProducts: Product[];     
  visibleCount: number;  
  visibleIds: string[];
  loading: boolean;
  error: string | null;      
} 

const initialState: ProductState = {
  allProducts: [],
  visibleCount: 3,
  visibleIds: [],
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
      state.visibleIds = state.allProducts.slice(0,action.payload).map(p => p.id);
    },
    replaceVisibleProduct: (state, action: PayloadAction<{oldProductId: string, newProduct: Product}>) => {
      const {oldProductId, newProduct} = action.payload;

      const visibleIndex = state.visibleIds.findIndex(id => id == oldProductId);
      if (visibleIndex === -1) return;

      state.visibleIds[visibleIndex] = newProduct.id;

      const existingIndex = state.allProducts.findIndex(p => p.id === newProduct.id)
      if (existingIndex !== -1){
        state.allProducts[existingIndex] = newProduct;
      } else {
        state.allProducts.push(newProduct);
      }
    }
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
        state.visibleIds = action.payload.slice(0, state.visibleCount).map(p => p.id);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка"
      })
  }
});

export const { setVisibleCount, replaceVisibleProduct } = productSlice.actions;
export default productSlice.reducer;
