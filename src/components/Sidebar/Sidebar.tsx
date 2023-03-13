import React from "react";
import './Sidebar.scss';

import SidebarItems, { SidebarItemProps } from "./SidebarItems";

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

const files: Array<SidebarItemProps> = [
	{
		id: 0,
		path: './',
		isFolder: false,
		title: 'angela',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	},
	{
		id: 1,
		path: './',
		isFolder: true,
		title: 'directory',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	},
	{
		id: 2,
		parentId: 1,
		path: './directory/',
		isFolder: true,
		title: 'subdirectory',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	},
	{
		id: 3,
		path: './',
		isFolder: false,
		title: 'typescript',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	},
	{
		id: 4,
		path: './',
		isFolder: true,
		title: 'folder',
		dateCreated: new Date(),
		lastUpdated: new Date(),
	}
]

interface SidebarProps {
	items?: Array<SidebarItemProps>;
}

export default function Sidebar (
	{ items = files }: SidebarProps
) {

	return (
		<div className="sidebar">
			<div className="toolbar">
				<SortOutlinedIcon className="icon" />
				<CreateNewFolderOutlinedIcon className="icon" />
				<NoteAddOutlinedIcon className="icon" />
			</div>
			<SidebarItems items={items} />
		</div>
	)
}