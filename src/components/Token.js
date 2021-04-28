import React, { Component, useEffect, useState } from 'react';
import { explorerUrl } from '../state/near'

export const Token = ({
	contracts, contractId, tokenId,
}) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'scroll'
    }, []);

    const contract = contracts.find(({id}) => id === contractId)
    let token
    if (contract) {
        token = contract.tokens.find(({ token_id }) => token_id === tokenId)
    }

    if (!token) return null
    console.log(token)

    return <div className="token" onClick={() => history.back()}>
		<div>
            { token.displayFrag }
            <div className="token-detail">
                <div><a href={explorerUrl + '/accounts/' + contractId}>{token.token_id}</a></div>
                <div>Owned by <a href={explorerUrl + '/accounts/' + token.owner_id}>{token.owner_id}</a></div>
                <div className="time">Minted {token.displayHowLongAgo} ago</div>
            </div>
        </div>
    </div>
}

