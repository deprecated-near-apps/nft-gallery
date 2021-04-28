import React, { useContext, useEffect, useState } from 'react';

import { appStore, onAppMount } from './state/app';
import { getForOwner, getAll } from './state/near';
import { useHistory } from './utils/history';

import { Gallery } from './components/Gallery';
import { Token } from './components/Token';

import Avatar from 'url:./img/avatar.jpg';
import NearLogo from 'url:./img/near_icon.svg';

import './App.scss';

const App = () => {
	const { state, dispatch, update } = useContext(appStore);
	const { contracts, contractAccount } = state

	const [owner, setOwner] = useState('')
	const [path, setPath] = useState(window.location.pathname)
	useHistory(() => setPath(window.location.pathname));
	let contractIndex, contract, contractId, tokenId
	let pathSplit = path.split('/t/')[1]?.split('/')
	if (pathSplit?.length > 0) {
		contractId = pathSplit[0]
		contractIndex = contracts.findIndex(({ id }) => id === contractId)
		contract = contracts[contractIndex]
		tokenId = pathSplit[1]
	}

	useEffect(() => dispatch(onAppMount()), []);
	useEffect(() => {
		if (!!contracts.length && path === '/') {
			history.pushState({}, '', '/t/' + contracts[0].id)
		}
	}, [contracts]);

	const handleGetForOwner = () => {
		if (!owner.length) return alert('enter an owner accountId you want to check')
		dispatch(getForOwner(owner))
	}

	const handleContract = (e) => {
		if (e.clientX > window.innerWidth * 0.75) {
			if (contractIndex + 1 === contracts.length) {
				history.pushState({}, '', '/t/' + contracts[0].id)
			} else {
				history.pushState({}, '', '/t/' + contracts[contractIndex + 1].id)
			}
		} else if (e.clientX < window.innerWidth * 0.25) {
			if (contractIndex === 0) {
				history.pushState({}, '', '/t/' + contracts[contracts.length - 1].id)
			} else {
				history.pushState({}, '', '/t/' + contracts[contractIndex - 1].id)
			}
		} else {
			window.scrollTo(0, 0)
		}
	}

	return <>
		{
			tokenId &&
			<Token {...{ contracts, contractId, tokenId }} />
		}

		<div className="menu">
			<input type="text" placeholder="Account ID" value={owner} onChange={(e) => setOwner(e.target.value)} />
			<button onClick={() => handleGetForOwner()}>Fetch</button><br/>
			<button onClick={() => dispatch(getAll())}>Fetch All NFTs</button>
		</div>


		{
			contract && <div className="contract">
				<h1 onClick={(e) => handleContract(e)}>{ contract.name }</h1>
				<div className="tokens">
					{
						contract.tokens.map(({
							token_id,
							displayFrag,
							displayHowLongAgo
						}, i) => {
							return <div key={i} onClick={() => history.pushState({}, '', '/t/' + contract.id + '/' + token_id)}>
								{displayFrag}
								<div className="token-detail">
									<div>{token_id}</div>
									<div className="time">Minted {displayHowLongAgo} ago</div>
								</div>
							</div>
						})
					}
				</div>
			</div>
		}
	</>;
};

export default App;
