import { addFrag } from './utils/react-helpers'
import { getTokens, getTokensForOwner } from './utils/api-helper'

/// helpers for NFT Market example tokens
/// https://github.com/near-apps/nft-market

const getTokensNFTMarket = async (account, contract_id) => {
	const totalSupply = await account.viewFunction(contract_id, 'nft_total_supply');
	const tokens = await getTokens(contract_id, totalSupply)
	if (!tokens.length) {
		return []
	}
	// get the right batch of tokens from the api-helper call
	const result = tokens[0]
	// add React fragment for displaying in gallery
	result.forEach((t) => addFrag(t, t.metadata.media, 'img'))
	return result 
}

const getTokensForOwnerNFTMarket = async (account, contract_id, account_id) => {
	const totalSupply = await account.viewFunction(contract_id, 'nft_supply_for_owner', {
		account_id
	});
	const tokens = await getTokensForOwner(contract_id, account_id, totalSupply)
	if (!tokens.length) {
		return []
	}
	// get the right batch of tokens from the api-helper call
	const result = tokens[0]
	// add React fragment for displaying in gallery
	result.forEach((t) => addFrag(t, t.metadata.media, 'img'))
	return result
}

/// Begin contract specific handling here


const basicNFTMarketId = 'dev-1619583615568-7370472'
const basicNFTMarket = {
    id: basicNFTMarketId,
    name: 'Basic NFT Market',
    getTokens: (account) => getTokensNFTMarket(account, basicNFTMarketId),
    getTokensForOwner: (account, account_id) => getTokensForOwnerNFTMarket(account, basicNFTMarketId, account_id)
}

const anotherTestnetNFTId = 'dev-1619580955159-6326546'
const anotherTestnetNFT = {
    id: anotherTestnetNFTId,
    name: 'Another Test NFT Market',
    getTokens: (account) => getTokensNFTMarket(account, anotherTestnetNFTId),
    getTokensForOwner: (account, account_id) => getTokensForOwnerNFTMarket(account, anotherTestnetNFTId, account_id)
}

const mattTestNFTMarketId = 'dev-1618440176640-7650905'
const mattTestNFTMarket = {
    id: mattTestNFTMarketId,
    name: 'Matt Test NFT Market',
    getTokens: (account) => getTokensNFTMarket(account, mattTestNFTMarketId),
    getTokensForOwner: (account, account_id) => getTokensForOwnerNFTMarket(account, mattTestNFTMarketId, account_id)
}

export const contracts = [
    mattTestNFTMarket,
	basicNFTMarket,
	anotherTestnetNFT,
]