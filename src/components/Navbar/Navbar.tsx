import React from "react";
import Image from "next/image";
import './Navbar.scss';
import logo from '../../assets/images/favicon-32x32.png';

interface NavbarProps {
	// ...	
}

export default function Navbar () {
	return (
		<div className="navbar">
			<Image src={logo} alt="logo" />
		</div>
	)
}