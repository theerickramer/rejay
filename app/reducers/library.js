// @flow
import type { Action } from './types';
import { ADD_TO_LIBRARY } from '../actions/library';

export default function library(state: object[] = [], action: Action) {
  switch (action.type) {
    case ADD_TO_LIBRARY: {
      const lib = state.slice();
      lib.push(action.payload);
      return lib;
    }
    default:
      return state;
  }
}
