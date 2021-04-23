
import getConfig from '../config';
import * as nearAPI from 'near-api-js';
import { contracts } from '../contracts';
import { getWallet } from '../utils/near-utils';

export const {
	GAS,
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
	const { contractAccount } = await getWallet();

	const processedContracts = []
	const promises = contracts.map(async ({ id, getTokens }) => {
		const tokens = await getTokens(contractAccount)
		processedContracts.push({ id, tokens: tokens.reverse().filter((t) => !!t.displayFrag) })
		return true
	})
	await Promise.all(promises)

	await update('', { contracts: processedContracts, contractAccount });
};

export const getAll = () => async ({ update, getState, dispatch }) => {
	dispatch(initNear())
}


/// TODO explain
export const getForOwner = (accountId) => async ({ update, getState, dispatch }) => {
	const { contractAccount } = getState();

	const processedContracts = []
	const promises = contracts.map(async ({ id, getTokensForOwner }) => {
		const tokens = await getTokensForOwner(contractAccount, accountId)
		processedContracts.push({ id, tokens: tokens.reverse().filter((t) => !!t.displayFrag) })
		return true
	})
	await Promise.all(promises)

	await update('', { contracts: processedContracts, contractAccount });
};
