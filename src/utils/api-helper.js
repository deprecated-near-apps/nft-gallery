

// https://github.com/near/near-api-helper

// consts
// const domain = 'http://127.0.0.1:8787';
const domain = 'https://helper.nearapi.org'
const domainAndPath = domain + '/v1/contract/';
const testNFTPath = domainAndPath + 'dev-1618440176640-7650905/nft_token/';
const batchPath = domain + '/v1/batch/';

export const getTokens = async (contract, totalSupply) => {
    const batch = [{
        contract,
        method: 'nft_tokens',
        args: {},
        batch: {
            from_index: '0', // must be name of contract arg (above)
            limit: totalSupply, // must be name of contract arg (above)
            step: '100', // divides contract arg 'limit'
            flatten: [], // how to combine results
        },
        sort: {
            path: 'metadata.issued_at',
        }
    }];
    const url = batchPath + JSON.stringify(batch);
    // console.log('\n URL:\n', url, '\n');
    const tokens = await fetch(batchPath + JSON.stringify(batch)).then((res) => res.json());
    return tokens
}

export const getTokensForOwner = async (contract, account_id, totalSupply) => {
    const batch = [{
        contract,
        method: 'nft_tokens_for_owner',
        args: {
            account_id
        },
        batch: {
            from_index: '0', // must be name of contract arg (above)
            limit: totalSupply, // must be name of contract arg (above)
            step: '100', // divides contract arg 'limit'
            flatten: [], // how to combine results
        },
        sort: {
            path: 'metadata.issued_at',
        }
    }];
    const url = batchPath + JSON.stringify(batch);
    // console.log('\n URL:\n', url, '\n');
    const tokens = await fetch(batchPath + JSON.stringify(batch)).then((res) => res.json());
    return tokens
}