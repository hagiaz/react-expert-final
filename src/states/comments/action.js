import api from '../../services/api';
import {setLoading} from '../shared/action';
import {addComment} from './reducer';
import {setThreadDetail} from '../threads/reducer';

export const createComment = (threadId, content) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.post(`/threads/${threadId}/comments`, {content});
    const comment = response.data.data.comment;

    dispatch(addComment({
      threadId,
      comment,
    }));

    const threadResponse = await api.get(`/threads/${threadId}`);
    dispatch(setThreadDetail(threadResponse.data.data.detailThread));

    return comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    return null;
  } finally {
    dispatch(setLoading(false));
  }
};
