import React from 'react'

const tagToFrag = (tag, ...args) => {
	switch (tag) {
		case 'img': return <img src={args[0]} />
		case 'video': return <video src={args[0]} />
	}
}

const addFrag = (token) => {
    const stringWithExt = token.metadata.media
    const supportedTags = [
        {
            tag: 'img',
            exts: ['gif', 'png', 'jpg', 'webp'],
        }
    ]
    const supported = supportedTags.find(({ exts }) => exts.some((ext) => {
        return stringWithExt.indexOf(ext) > -1
    }))
    if (!supported) {
        return console.warn(`${token.token_id} from dev-1618440176640-7650905 was not supported`)
    }
    // this method must mut the token object passed in by adding a React Fragment to it
    token.displayTag = supported.tag
    token.displayFrag = tagToFrag(supported.tag, token.metadata.media)
}

const mattTestNFTMarketId = 'dev-1618440176640-7650905'
const mattTestNFTMarket = {
    id: mattTestNFTMarketId,

    getTokens: async (account) => {
        // rpc
        const totalSupply = await account.viewFunction(mattTestNFTMarketId, 'nft_total_supply');

        // helper.nearapi.org
        const tokens = await fetch('https://helper.nearapi.org/v1/testnet/view', {
            method: 'POST',
            body: JSON.stringify({
                views: [{
                    contract: mattTestNFTMarketId,
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
                }]
            })
        }).then((r) => r.json())
        tokens.views[0].forEach(addFrag)
        return tokens.views[0]
    },

    getTokensForOwner: async (account, account_id) => {
        // rpc
        const totalSupply = await account.viewFunction(mattTestNFTMarketId, 'nft_supply_for_owner', { account_id });

        // helper.nearapi.org
        const tokens = await fetch('https://helper.nearapi.org/v1/testnet/view', {
            method: 'POST',
            body: JSON.stringify({
                views: [{
                    contract: mattTestNFTMarketId,
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
                }]
            })
        }).then((r) => r.json())

        tokens.views[0].forEach(addFrag)

        return tokens.views[0]
    },
    
}

export const contracts = [
    mattTestNFTMarket
]