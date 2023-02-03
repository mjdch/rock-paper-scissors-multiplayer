import React, { ImgHTMLAttributes } from 'react';
import logo from '../../assets/rps-logo.png';

export const Logo: React.FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
	return <img src={logo} {...props} />;
};
