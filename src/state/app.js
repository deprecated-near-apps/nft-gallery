import { State } from '../utils/state';

import { initNear } from './near';

const initialState = {
	app: {
		mounted: false,
		loading: true,
		snack: null
	},
	near: {
		initialized: false,
	},
	contracts: [],
};

let snackTimeout

export const { appStore, AppProvider } = State(initialState, 'app');

export const onAppMount = () => async ({ update, getState, dispatch }) => {
	update('app', { mounted: true });
	dispatch(initNear());
};

export const snackAttack = (msg) => async ({ update, getState, dispatch }) => {
	console.log('Snacking on:', msg)
	update('app.snack', msg);
	if (snackTimeout) clearTimeout(snackTimeout)
	snackTimeout = setTimeout(() => update('app.snack', null), 3000)
};