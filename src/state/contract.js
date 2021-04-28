
import { getWallet } from '../utils/near-utils';
import { contracts } from '../contracts';

export const contractCall = async (method, ...args) => {
    const { contractAccount } = getWallet()
    const processed = []
	const promises = contracts.map(async (contract) => {
        if (!contract[method]) return
		const tokens = await contract[method](contractAccount, ...args)
		const{ id, name } = contract
		processed.push({ id, name, tokens: tokens.filter((t) => !!t.displayFrag) })
		return true
	})
	await Promise.all(promises)
    return processed
}