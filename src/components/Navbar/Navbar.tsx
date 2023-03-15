import React from "react";
import './Navbar.scss';

import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';

import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NavbarProps {
	// ...	
}

export default function Navbar () {
	const showSidebar = useSelector((state: RootState) => state.app.showSidebar);
	const dispatch = useDispatch();

	return (
		<div className="navbar">
			<ViewSidebarOutlinedIcon 
				className="toggle-sidebar" 
				onClick={() => dispatch(toggleSidebar())}
			/>
		</div>
	)
}