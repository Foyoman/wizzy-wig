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
		title: 'angela',
		dateCreated: new Date(),
		lastUpdated: new Date(),
		isFolder: false,
	},
	{
		id: 1,
		path: './',
		title: 'directory',
		dateCreated: new Date(),
		lastUpdated: new Date(),
		isFolder: true,
		children: [
			{
				id: 2,
				parentId: 1,
				path: './directory/',
				title: 'subdirectory',
				dateCreated: new Date(),
				lastUpdated: new Date(),
				isFolder: true,
				children: [
					{
						id: 3,
						parentId: 2,
						path: './directory/subdirectory/',
						title: 'subdirectory-file',
						dateCreated: new Date(),
						lastUpdated: new Date(),
						isFolder: false,
					},
				]
			},
		]
	},
	{
		id: 4,
		path: './',
		title: 'typescript',
		dateCreated: new Date(),
		lastUpdated: new Date(),
		isFolder: false,
	},
	{
		id: 5,
		path: './',
		title: 'folder',
		dateCreated: new Date(),
		lastUpdated: new Date(),
		isFolder: true,
		children: [
			{
				id: 6,
				path: './folder',
				title: 'subfolder',
				dateCreated: new Date(),
				lastUpdated: new Date(),
				isFolder: false,
			}
		]
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