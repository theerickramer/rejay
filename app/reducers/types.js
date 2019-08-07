import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type libraryStateType = {
  +library: object[]
};

export type Action = {
  +type: string
};

export type GetState = () => libraryStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
