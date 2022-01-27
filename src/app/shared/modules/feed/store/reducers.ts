import { Action, createReducer, on } from '@ngrx/store';
import { FeedStateInterface } from '../types/feedState.interface';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from './actions/feed.action';

const initialState: FeedStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

const feedReducers = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    getFeedSuccessAction,
    (state, action): FeedStateInterface => ({
      ...state,
      data: action.feed,
      isLoading: false,
    })
  ),
  on(
    getFeedFailureAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false,
      error: 'Something went wrong',
    })
  )
);

export function reducers(state: FeedStateInterface, action: Action){
    return feedReducers(state, action)
}