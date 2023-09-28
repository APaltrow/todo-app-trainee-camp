import { createStore } from 'redux';

export const store = createStore(() => ({}));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
