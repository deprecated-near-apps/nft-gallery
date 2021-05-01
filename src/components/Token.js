import React, { Component, useEffect, useState } from 'react';
import { explorerUrl } from '../state/near'
import { snackAttack } from '../state/app'
import { share } from '../utils/mobile'


export const Token = ({
	dispatch, contracts, contractId, tokenId,
}) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'scroll'
    }, []);
    
    const handleShare = async (e, contractId, tokenId) => {
        e.stopPropagation()
        e.preventDefault()
        const headers = new Headers({
            'max-age': '3600'
        })
        const path = `https://helper.nearapi.org/v1/contract/${contractId}/nft_token/`
        const args = JSON.stringify({
            token_id: tokenId
        });
        const actions = JSON.stringify({
            botMap: {
                'og:title': 'NFTs on NEAR',
                'og:description': 'Check out this NFT on NEAR!',
                'og:image': { field: 'metadata.media' }
            },
            redirect: encodeURIComponent(`${window.location.origin}${window.location.pathname}?c=${contractId}&t=${tokenId}`),
            encodeUrl: true,
        });
        const url = path + args + '/' + actions;
        const response = await fetch(url, { headers }).then((res) => res.json());
        if (!response || !response.encodedUrl) {
            console.warn(response)
            return alert('Something went wrong trying to share this url, please try sharing from the address bar or use your browsers share feature')
        }
        const result = share(response.encodedUrl)
        if (!result.mobile) {
            dispatch(snackAttack('Link Copied!'))
        }
    }

    const contract = contracts.find(({id}) => id === contractId)
    let token
    if (contract) {
        token = contract.tokens.find(({ token_id }) => token_id === tokenId)
    }

    if (!token) return null

    return <div className="token" onClick={() => history.pushState({}, '', window.location.pathname + '?c=' + contractId)}>
		<div>
            <h3>Click to Close</h3>
            { token.displayFrag }
            <div className="token-detail">
                <div><a href={explorerUrl + '/accounts/' + contractId}>{token.token_id}</a></div>
                <div>Owned by <a href={explorerUrl + '/accounts/' + token.owner_id}>{token.owner_id}</a></div>
                <div><a href="#" onClick={(e) => handleShare(e, contractId, tokenId)}>SHARE NOW</a></div>
                <div className="time">Minted {token.displayHowLongAgo} ago</div>
                <div><button onClick={() => window.location.href = 'https://near-apps.github.io/nft-market/?t=' + token.token_id}>Make Offer!</button></div>
            </div>
        </div>
    </div>
}

