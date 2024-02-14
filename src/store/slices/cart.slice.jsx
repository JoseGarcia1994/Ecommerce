import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from "./isLoading.slice"
import axios from 'axios';
import getConfig from "../../utils/getConfig"

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart : (state, action) => {
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCartThunk = () => dispatch => {
    dispatch( setIsLoading( true) )
    
    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig())
        .then( resp => dispatch( setCart(resp.data) ) )
        .catch( error => console.error(error))
        .finally( () => dispatch( setIsLoading(false) ) )
}

export const addCartThunk = data => dispatch => {
    dispatch( setIsLoading( true) )

    axios
        .post(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, data, getConfig())
        .then( () => dispatch( getCartThunk() ))
        .catch( error => console.error(error))
        .finally( () => dispatch( setIsLoading(false) ) )
}

export const cartUpdateThunk = (id, qty) => dispatch => {
    dispatch( setIsLoading( true) )

    const body = {
        quantity : qty
    }

    axios
        .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())
        .then( () => dispatch( getCartThunk() ))
        .catch( error => console.error(error))
        .finally( () => dispatch( setIsLoading(false) ) )
}

 // Purchase what we have on the shopping cart
export const purchaseCartThunk = () => dispatch => {
    dispatch( setIsLoading( true) )

    axios
        .post( `https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, {}, getConfig() )
        .then( () => dispatch( getCartThunk() ))
        .catch( error => console.error(error))
        .finally( () => dispatch( setIsLoading(false) ) )
}

// delete products from cart
export const deleteProductsThunk = id => dispatch => {
    dispatch( setIsLoading( true) )

    axios
        .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then( () => dispatch( getCartThunk() ))
        .catch( error => console.error(error))
        .finally( () => dispatch( setIsLoading(false) ) )
}