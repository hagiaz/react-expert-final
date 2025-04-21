import {setLoading as setLoadingReducer} from './reducer';

export const setLoading = (isLoading) => (dispatch) => {
  dispatch(setLoadingReducer(isLoading));
};
