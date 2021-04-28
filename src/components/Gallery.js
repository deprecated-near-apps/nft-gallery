import React, { Component, useEffect, useState } from 'react';

export const Gallery = ({id, name, tokens = []}) => {

	return <div className="contract" key={id}>
		<h1>{name}</h1>
		
	</div>
};

