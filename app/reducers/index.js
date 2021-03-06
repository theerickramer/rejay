// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import library from './library';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    library
  });
}
