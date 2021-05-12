import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  itemsPerPage: 25,
  category: "All products",
  search: {
      name: "",
      category: 0,
      pricemin: 0,
      pricemax: 999,
      minrating: 0,
      maxrating: 50,
      sort: null,
      sortDesc: null
    },
  useSearch: false
  };

// async Thunk for getting all products
export const getAllProducts = createAsyncThunk("/products/fetchAllProducts", async (search) => {
    //console.log(typeof search)
    // if there are search params
    if (search && typeof search === 'object') {
        //console.log("Many params!")
        let searchString = '?'
        if (search.name) {
            //console.log(search.name)
            searchString = searchString + `name=${search.name}&`
        }
        if (search.category) {
            //console.log(search.category)
            searchString = searchString + `category=${search.category}&`
        }
        if (search.pricemin) {
            //console.log(search.pricemin)
            searchString = searchString + `pricemin=${search.pricemin}&`
        }
        if (search.pricemax) {
            //console.log(search.pricemax)
            searchString = searchString + `pricemax=${search.pricemax}&`
        }
        if (search.minrating) {
            //console.log(search.minrating)
            searchString = searchString + `minrating=${search.minrating}&`
        }
        if (search.maxrating) {
            //console.log(search.maxrating)
            searchString = searchString + `maxrating=${search.maxrating}&`
        }
        if (search.sort) {
            //console.log(search.sort)
            searchString = searchString + `orderby=${search.sort}&`
        }
        if (search.sortDesc) {
            console.log(search.sortDesc)
            searchString = searchString + `orderby=${search.sortDesc}&`
        }
        //console.log(searchString)
        const response = await fetch(`/api/products/search${searchString}`);
        //console.log(response);
        if (response.ok) {
          const json = await response.json();
          return json;
        } else {
          return Promise.reject(
            new Error(`${response.status} - ${response.statusText}`)
          );
        }
    } else if (search && typeof search === 'number') {
        //console.log("Category!")
        // if it's just a category
        const response = await fetch(`/api/products/category/${search}`);
        //console.log(response);
        if (response.ok) {
          const json = await response.json();
          return json;
        } else {
          return Promise.reject(
            new Error(`${response.status} - ${response.statusText}`)
          );
        }
    } else {
        //console.log("No params!")
        // if no search, generic request
        const response = await fetch("/api/products/");
        //console.log(response);
        if (response.ok) {
          const json = await response.json();
          return json;
        } else {
          return Promise.reject(
            new Error(`${response.status} - ${response.statusText}`)
          );
        }
    }
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setItemsPerPage(state, action) {
        state.itemsPerPage = action.payload;
      },
    setSearchTerm(state,action) {
      state.search.name = action.payload;
      state.useSearch = true;
    },
    changeSearch(state, action) {
      if (action.payload.name) {
        state.search.name = action.payload.name;
      }
      if (action.payload.category) {
        state.search.category = action.payload.category
      }
      if (action.payload.pricemin) {
        state.search.pricemin = action.payload.pricemin
      }
      if (action.payload.pricemax) {
        state.search.pricemax = action.payload.pricemax
      }
      if (action.payload.minrating) {
        state.search.minrating = action.payload.minrating
      }
      if (action.payload.maxrating) {
        state.search.maxrating = action.payload.maxrating
      }
      if (action.payload.sort) {
        state.search.sort = action.payload.sort
        state.search.sortDesc = action.payload.sortDesc
      }
      if (action.payload.sortDesc) {
        state.search.sort = action.payload.sort
        state.search.sortDesc = action.payload.sortDesc
      }
      state.useSearch = true;
    },
    resetSearch(state, action) {
      state.search.name = null
      state.search.category = 0
      state.search.pricemin = 0
      state.search.pricemax = 999
      state.search.minrating = 0
      state.search.maxrating = 50
      state.search.sort = null
      state.search.sortDesc = null
      state.useSearch = false
    },
    updateCategory(state, action) {
        const productCategories = [
            "All products",
            "Books",
            "Audio/Visual",
            "Electronics",
            "Home & Garden",
            "Toys",
            "Clothes",
            "Sports & Outdoors",
            "Health & Beauty",
          ];
        state.search.category = action.payload;
        state.category = productCategories[action.payload];
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { setItemsPerPage, updateCategory, changeSearch, resetSearch, setSearchTerm } = productSlice.actions;

export default productSlice.reducer;

export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;
export const selectAllProducts = (state) => state.products.data;
export const selectItemsPerPage = (state) => state.products.itemsPerPage;
export const selectSearch = (state) => state.products.search;
export const selectUseSearch = (state) => state.products.useSearch;
export const selectCategory = (state) => state.products.category;

export const selectSingleProduct = (state, productId) =>
state.products.data.find((element) => element.product_id === productId);


