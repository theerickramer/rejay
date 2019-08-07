// @flow

export const ADD_TO_LIBRARY = 'ADD_TO_LIBRARY';

export function addToLib(track) {
  return {
    type: ADD_TO_LIBRARY,
    payload: track
  };
}
