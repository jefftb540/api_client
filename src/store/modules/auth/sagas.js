import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Login com sucesso');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(payload.path);
  } catch (error) {
    toast.error('Usuário ou senha inválidos');
    yield put(actions.loginFailure());
  }
}

function persisteRehydrate({ payload }) {
  const token = get(payload, 'auth.token');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  // eslint-disable-next-line no-unused-vars
  const { id, name, password, email } = payload;

  try {
    if (id) {
      yield call(axios.put, `/users/`, {
        name,
        password: password || undefined,
        email,
        id,
      });
      toast.success('Conta alterada com sucesso');
      yield put(actions.registerUpdatedSuccess({ name, email }));
    } else {
      yield call(axios.post, `/users/`, {
        name,
        password: password || undefined,
        email,
      });
      toast.success('Conta criada com sucesso');
      yield put(actions.registerCreatedSuccess());
      history.push('/login');
    }
  } catch (error) {
    const errors = get(error, 'response.data.errors', []);
    const status = get(error, 'response.status');
    if (status === 401) {
      toast.error('Você precisa fazer login novamente');
      yield put(actions.loginFailure);
      return history.push('/login');
    }
    if (errors.length > 0) errors.map((err) => toast.error(err));
    else toast.error('Erro desconhecido');

    yield put(actions.registerFailure);
  }
}
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persisteRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
