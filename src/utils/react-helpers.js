import React from 'react'
import { howLongAgo } from './date'

const resolveImageError = (el, src) => {
    console.warn(`IMAGE ERROR: ${src} was unable to display properly in an img tag`)
    el.classList.add('removed')
}

export const tagToFrag = (tag, src, ...args) => {
    if (src.indexOf('youtu') > -1) {
        tag = 'youtube'
        src = `https://www.youtube.com/embed/${src.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)[1]}`
    }
	switch (tag) {
		case 'img': return <img
            src={src}
            onError={(e) => resolveImageError(e.target, src, ...args)}
        />
		case 'video': return <video src={src} />
		case 'youtube': return <iframe src={src} frameBorder="0" allowFullScreen></iframe>
	}
}

// this mut the token object, adding a React Fragment to it
export const addFrag = (token, media, tag) => {
    token.displayHowLongAgo = howLongAgo(token.metadata.issued_at, 'hour')
    token.displayTag = tag
    token.displayFrag = tagToFrag(tag, media)
}