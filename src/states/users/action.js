import api from '../../services/api';
import {setUsers} from './reducer';
import {setLoading} from '../shared/action';

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.get('/users');
    dispatch(setUsers(response.data.data.users));
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    dispatch(setLoading(false));
  }
};
