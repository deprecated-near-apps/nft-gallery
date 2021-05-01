
import getConfig from '../config';
import * as nearAPI from 'near-api-js';
import { contractCall } from './contract';
import { isAccountTaken } from './../utils/near-utils';
import { snackAttack } from './app'

export const {
	GAS,
	explorerUrl,
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractName,
} = getConfig();

export const {
	utils: {
		format: {
			formatNearAmount, parseNearAmount
		}
	}
} = nearAPI;

export const initNear = () => async ({ update, getState, dispatch }) => {
	const contracts = await contractCall('getTokens')
	await update('', { contracts });
	await update('app', { loading: false });
};

export const getAll = () => async ({ update, getState, dispatch }) => {
	dispatch(initNear())
}

/// TODO explain
export const getForOwner = (accountId) => async ({ update, getState, dispatch }) => {
	const exists = await isAccountTaken(accountId)
	if (!exists) {
		return dispatch(snackAttack('Account does not exist. Please try again.'))
	}
	const contracts = await contractCall('getTokensForOwner', accountId)
	await update('', { contracts });
	return true
};
