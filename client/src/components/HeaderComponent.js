import React from 'react';
import LanguageComponent from './LanguageComponent';
import '../styles/HeaderComponentStyle.css';
export default () => (
	<header>
		<h1 className="hero-title">Digital W<i className="fa fa-globe" aria-hidden="true"></i>rld</h1>
		<LanguageComponent/>
	</header>
);
