import React from "react";
import './Sidebar.scss';

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

// todo: path
interface SidebarItemProps {
	title: string;
	dateCreated: Date;
	lastUpdated: Date;
}

const SidebarItem = (
	{ title, ...props }: SidebarItemProps
) => {

	return (
		<div className="sidebar-item">
			{ title }
		</div>
	)
}

const sidebarItems: Array<SidebarItemProps> = [
	{
		title: 'angela',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	},
	{
		title: 'typescript',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	},
]

interface SidebarProps {
	items?: Array<SidebarItemProps>;
}

export default function Sidebar (
	{ items = sidebarItems }: SidebarProps
) {

	return (
		<div className="sidebar">
			<div className="toolbar">
				<SortOutlinedIcon className="icon" />
				<CreateNewFolderOutlinedIcon className="icon" />
				<NoteAddOutlinedIcon className="icon" />
			</div>
			{ items.map((item, index) => 
			<div className="sidebar-item" key={index}>
				{ item.title }
			</div>
			)}
		</div>
	)
}