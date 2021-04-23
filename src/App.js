import React, { useContext, useEffect, useState } from 'react';

import { appStore, onAppMount } from './state/app';
import { getForOwner, getAll } from './state/near';

import { Gallery } from './components/Gallery';

import Avatar from 'url:./img/avatar.jpg';
import NearLogo from 'url:./img/near_icon.svg';

import './App.scss';

const App = () => {
	const { state, dispatch, update } = useContext(appStore);

	const { contracts, contractAccount } = state

	const [owner, setOwner] = useState('')

	const onMount = () => {
		dispatch(onAppMount());
	};
	useEffect(onMount, []);

	const handleGetForOwner = () => {
		if (!owner.length) return alert('enter an owner accountId you want to check')
		dispatch(getForOwner(owner))
	}

	return <>

	<h1>Controls!</h1>
	<input type="text" placeholder="Account ID" value={owner} onChange={(e) => setOwner(e.target.value)} />
	<button onClick={() => handleGetForOwner()}>Fetch</button><br/>
	<button onClick={() => dispatch(getAll())}>Fetch All NFTs</button>
		
		<div id="gallery">
			<Gallery {...{ contracts, contractAccount }} />
		</div>

	</>;
};

export default App;
