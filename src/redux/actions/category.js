import {
GET_CATEGORIES_SUCCESS,
GET_CATEGORIES_FAIL,
GET_CATEGORY_BY_ARRIVAL_SUCCESS,
GET_CATEGORY_BY_ARRIVAL_FAIL}
from "./types"
import axios from "axios"

export const get_categories = () => async dispatch => {
    const config = {
        headers : {
            'accept' : 'application/json'
        }
    }

    try { const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/categories`, config)
            if (res.status == 200)
                dispatch({
                    type:GET_CATEGORIES_SUCCESS,
                    payload:res.data
                })
            else 
                {dispatch({
                    type:GET_CATEGORIES_FAIL
                })
}
        
    } catch (error) {
        dispatch({
            type:GET_CATEGORIES_FAIL
        })
    }
}

export const get_categoty_by_arrival = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/get-categories?sortBy=date_created&limit=2`, config);
    
        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORY_BY_ARRIVAL_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CATEGORY_BY_ARRIVAL_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: GET_CATEGORY_BY_ARRIVAL_FAIL
        });
    }
}