import axios from 'axios';

export const ADD_CAMPERS = "ADD_CAMPERS";
export const REMOVE_CAMPERS = "REMOVE_CAMPERS";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const BY_LAST_30_DAYS = "BY_LAST_30_DAYS";
export const BY_TOTAL = "BY_TOTAL";

export const getCampersData = () => {
    return function(dispatch) {
        return axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
            .then((response) => {
                dispatch({
                    type: ADD_CAMPERS,
                    campers: response.data
                });
            });
    }
}
