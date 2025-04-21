import api from '../../services/api';
import {setLoading} from '../shared/action';
import {setThreads, setThreadDetail, addThread} from './reducer';

export const fetchThreads = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.get('/threads');
    dispatch(setThreads(response.data.data.threads));
  } catch (error) {
    console.error('Error fetching threads:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchThreadDetail = (threadId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.get(`/threads/${threadId}`);
    dispatch(setThreadDetail(response.data.data.detailThread));
  } catch (error) {
    console.error('Error fetching thread detail:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createThread = ({title, body, category = ''}) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.post('/threads', {title, body, category});
    const newThread = response.data.data.thread;
    dispatch(addThread(newThread));
    return newThread.id;
  } catch (error) {
    console.error('Error creating thread:', error);
    return null;
  } finally {
    dispatch(setLoading(false));
  }
};

