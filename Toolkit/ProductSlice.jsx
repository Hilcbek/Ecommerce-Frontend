import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    total: 0,
    amount: 0,
    success: false,
  },
  reducers: {
    ADD_PRODUCT: (state, action) => {
      let ExistProduct_With_Size = state.products.some(
        (product) =>
          product.SizeChoice === action.payload.SizeChoice &&
          product._id === action.payload._id
      );
      let ExistedProduct_With_Color = state.products.some(
        (product) =>
          product.ColorChoice === action.payload.ColorChoice &&
          product._id === action.payload._id
      );
      if (!ExistProduct_With_Size || !ExistedProduct_With_Color) {
        state.amount += 1;
        state.products.push(action.payload);
      } else {
        let ExistProduct_With_Size = state.products.find(
          (product) =>
            product.SizeChoice === action.payload.SizeChoice &&
            product._id === action.payload._id &&
            product.ColorChoice === action.payload.ColorChoice
        );
        if (ExistProduct_With_Size) {
          ExistProduct_With_Size.amount += 1;
          ExistProduct_With_Size.SizeChoice = action.payload.SizeChoice;
          ExistProduct_With_Size.ColorChoice = action.payload.ColorChoice;
        }
      }
      state.total += action.payload.amount * action.payload.new_price;
    },
    DELETE_PRODUCT: (state, action) => {
      let Filtered_products = state.products.filter((product) => {
        return (
          product._id === action.payload.id &&
          product.ColorChoice === action.payload.color &&
          product.SizeChoice === action.payload.size
        );
      });
      let New_products = state.products.filter((product) => {
        return (
          product._id !== action.payload.id ||
          product.ColorChoice !== action.payload.color ||
          product.SizeChoice !== action.payload.size
        );
      });
      state.amount -= 1;
      state.products = New_products;
      state.total -=
        Filtered_products[0].amount * Filtered_products[0].new_price;
    },
    RESET_PRODUCT: (state, action) => {
      state.products = [];
      state.total = 0;
      state.amount = 0;
    },
    UPDATE_PRODUCT_AMOUNT: (state, action) => {
      let WantedProduct = state.products.filter((product) => {
        return (
          product._id === action.payload.id &&
          product.ColorChoice === action.payload.color &&
          product.SizeChoice === action.payload.size
        );
      });
      if (WantedProduct.length > 0) {
        if (action.payload.sign === "+") {
          WantedProduct[0].amount += 1;
          state.total += WantedProduct[0].new_price;
        } else {
          if (WantedProduct[0].amount > 1) {
            WantedProduct[0].amount -= 1;
            state.total -= WantedProduct[0].new_price;
          } else {
            if (state.products.length > 1) {
              let new_Product = state.products.filter((product) => {
                return product !== WantedProduct[0];
              });
              state.products = new_Product;
              state.amount -= 1;
              state.total -=
                WantedProduct[0].amount * WantedProduct[0].new_price;
            } else {
              state.products = [];
              state.amount = 0;
              state.total = 0;
            }
          }
        }
      }
    },
    EnableTheSuccessPage: (state, action) => {
      state.success = true;
    },
    DisableTheSuccessPage: (state, action) => {
      state.success = false;
    },
  },
});
export let {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  RESET_PRODUCT,
  UPDATE_PRODUCT_AMOUNT,
  EnableTheSuccessPage,
  DisableTheSuccessPage,
} = ProductSlice.actions;
export default ProductSlice.reducer;
