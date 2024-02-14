import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from "./isLoading.slice"
import axios from 'axios';

const initialState = {
    products: [],
    quantity: 0,
    product: {},
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts : (state, action) => {
            state.products = action.payload
        },
        setProduct : (state, action) => {
            state.product = action.payload
        },
        decrement : (state, action) => {
            if(state.quantity > 1)
            state.quantity--;
        },
        increment : (state, action) => {
            state.quantity++;
        }
    }
})

export const { setProducts, decrement, increment, setProduct } = productSlice.actions;

export default productSlice.reducer;

export const getProductsThunk = () => dispatch => {
    dispatch( setIsLoading(true) )

    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
        .then( resp => dispatch( setProducts( resp.data ) ) )
        .catch( error => console.error(error))
        .finally( () => dispatch( setIsLoading(false) ) )
}

export const filterCategoryThunk = id => dispatch => {
    dispatch( setIsLoading(true) )

    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then( resp => dispatch( setProducts(resp.data) ))
        .catch( error => console.error(error))
        .finally( () => dispatch( setIsLoading(false) ) )
}

export const searchCategoryThunk = searchValue => dispatch => {
    dispatch( setIsLoading(true) )

    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${searchValue}`)
        .then( resp => dispatch( setProducts(resp.data) ))
        .catch( error => console.error(error))
        .finally( () => dispatch( setIsLoading(false) ) )

}

export const getProductThunk = id => dispatch => {
    dispatch( setIsLoading(true) )

    axios
			.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
			.then(resp => {
				dispatch(setProduct(resp.data))
				dispatch(filterCategoryThunk(resp.data.category.id))
			})
			.catch(error => console.error(error))
            .finally( () => dispatch( setIsLoading(false) ) )
}