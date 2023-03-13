import React from "react";
import './Sidebar.scss';

import SidebarItems, { SidebarItemProps } from "./SidebarItems";

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

const sidebarItems: Array<SidebarItemProps> = [
	{
		path: './',
		isFolder: false,
		title: 'angela',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	},
	{
		path: './',
		isFolder: false,
		title: 'typescript',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	},
]

interface SidebarProps {
	items?: Array<SidebarItemProps>;
}

export default function Sidebar (
	{ items }: SidebarProps
) {

	return (
		<div className="sidebar">
			<div className="toolbar">
				<SortOutlinedIcon className="icon" />
				<CreateNewFolderOutlinedIcon className="icon" />
				<NoteAddOutlinedIcon className="icon" />
			</div>
			<SidebarItems items={sidebarItems} />
		</div>
	)
}