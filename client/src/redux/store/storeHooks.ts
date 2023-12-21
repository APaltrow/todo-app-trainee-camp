import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from '../actions';
import * as Thunks from '../thunks';

import { AppDispatch, RootState } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch: AppDispatch = useDispatch();

  return bindActionCreators({ ...ActionCreators, ...Thunks }, dispatch);
};
