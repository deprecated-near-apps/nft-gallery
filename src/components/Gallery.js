import React, { Component, useEffect, useState } from 'react';
import * as nearAPI from 'near-api-js';
import { GAS, parseNearAmount } from '../state/near';
import {
	marketId,
	contractId,
	formatAccountId,
} from '../utils/near-utils';

const sortFunctions = {
	1: (a, b) => parseInt(a.metadata.issued_at || '0') - parseInt(b.metadata.issued_at || '0'),
	2: (b, a) => parseInt(a.metadata.issued_at || '0') - parseInt(b.metadata.issued_at || '0'),
	3: (a, b) => n2f(a.conditions?.near || '0') - n2f(b.conditions?.near || '0'),
	4: (b, a) => n2f(a.conditions?.near || '0') - n2f(b.conditions?.near || '0'),
};

export const Gallery = ({
	contractAccount,
	contracts = [],
}) => contracts.map(({id, tokens}) => 
	<div className="contract">
		<h1>Contract: {id}</h1>
		<div className="tokens">
			{
				tokens.map((t, i) => <div key={i} className={t.displayTag}>
					{t.displayFrag}
				</div>)
			}
		</div>
	</div>
);

