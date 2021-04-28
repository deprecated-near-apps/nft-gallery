
import getConfig from '../config';
import * as nearAPI from 'near-api-js';
import { contractCall } from './contract';

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
};

export const getAll = () => async ({ update, getState, dispatch }) => {
	dispatch(initNear())
}

/// TODO explain
export const getForOwner = (accountId) => async ({ update, getState, dispatch }) => {
	const contracts = await contractCall('getTokensForOwner', accountId)
	await update('', { contracts });
};
