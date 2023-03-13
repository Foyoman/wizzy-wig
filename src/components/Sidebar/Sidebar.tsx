import React from "react";
import './Sidebar.scss';

import SidebarItems, { SidebarItem } from "./SidebarItems";

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

const files: Array<SidebarItem> = [
	{
		id: 0,
		path: './',
		title: 'angela',
		dateCreated: new Date('01-01-2012 00:03:44'),
		lastUpdated: new Date('01-01-2021 00:03:44'),
		isFolder: false,
	},
	{
		id: 1,
		path: './',
		title: 'directory',
		dateCreated: new Date('12-02-1998 00:03:44'),
		lastUpdated: new Date('01-01-2000 00:03:44'),
		isFolder: true,
		children: [
			{
				id: 2,
				parentId: 1,
				path: './directory/',
				title: 'subdirectory',
				dateCreated: new Date('01-01-2001 00:03:44'),
				lastUpdated: new Date('01-01-2002 00:03:44'),
				isFolder: true,
				children: [
					{
						id: 3,
						parentId: 2,
						path: './directory/subdirectory/',
						title: 'chico',
						dateCreated: new Date('01-01-2003 00:03:44'),
						lastUpdated: new Date('01-01-2004 00:03:44'),
						isFolder: false,
					},
					{
						id: 1241,
						parentId: 2,
						path: './directory/subdirectory/',
						title: 'zeppo',
						dateCreated: new Date('01-01-2022 00:03:44'),
						lastUpdated: new Date('01-01-2023 00:03:44'),
						isFolder: false,
					},
					{
						id: 32423,
						parentId: 2,
						path: './directory/subdirectory/',
						title: 'hotdogs',
						dateCreated: new Date('01-01-1983 00:03:44'),
						lastUpdated: new Date('01-01-2004 00:03:44'),
						isFolder: false,
					},
					{
						id: 7,
						parentId: 2,
						path: './directory/subdirectory/',
						title: 'subsubdirectory',
						dateCreated: new Date('01-01-2005 00:03:44'),
						lastUpdated: new Date('01-01-2006 00:03:44'),
						isFolder: true,
						children: [
							{
								id: 8,
								parentId: 2,
								path: './directory/subdirectory/subsubdirectory',
								title: 'subsubsubdirectory',
								dateCreated: new Date('01-01-2007 00:03:44'),
								lastUpdated: new Date('01-01-2008 00:03:44'),
								isFolder: true,
								children: [
									{
										id: 99,
										parentId: 2,
										path: './directory/subdirectory/subsubdirectory',
										title: 'subsubsubsubdirectory',
										dateCreated: new Date('01-01-2009 00:03:44'),
										lastUpdated: new Date('01-01-2010 00:03:44'),
										isFolder: true,
										children: [
											{
												id: 98,
												parentId: 2,
												path: './directory/subdirectory/subsubdirectory',
												title: 'subsubsubsubsubdirectory-file',
												dateCreated: new Date('01-01-2011 00:03:44'),
												lastUpdated: new Date('01-01-2012 00:03:44'),
												isFolder: false,
											},	
										]
									},	
								]
							},	
						]
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
				title: 'subfile',
				dateCreated: new Date(),
				lastUpdated: new Date(),
				isFolder: false,
			}
		]
	}
]

const findItemById = (
	id: SidebarItem['id'],
	items: Array<SidebarItem>
): SidebarItem | null => {
	for (const item of items) {
		if (item.id === id) {
			return item;
		}

		if (item.isFolder && item.children) {
			const foundItem = findItemById(id, item.children);
			if (foundItem) {
				return foundItem;
			}
		}
	}
	return null;
}

console.log(findItemById(98, files));

const sortAlphabetically = (
	items: SidebarItem[]
): SidebarItem[] => {
  return items.sort((a, b) => {
    return a.title.localeCompare(b.title);
  }).map((item) => {
    if (item.children) {
      item.children = sortAlphabetically(item.children);
    }
    return item;
  });
}

const alphabetical = sortAlphabetically(files);
console.log(alphabetical)

function sortFoldersAndFiles(files: Array<SidebarItem>): Array<SidebarItem> {
  const folders = files.filter((item) => item.isFolder).sort(compareFolders);
  const filesOnly = files.filter((item) => !item.isFolder).sort(compareFiles);
  return [...folders, ...filesOnly];
}

function compareFolders(a: SidebarItem, b: SidebarItem): number {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}

function compareFiles(a: SidebarItem, b: SidebarItem): number {
  const dateA = a.lastUpdated.getTime();
  const dateB = b.lastUpdated.getTime();
  if (dateA < dateB) {
    return 1;
  }
  if (dateA > dateB) {
    return -1;
  }
  return 0;
}

const filesAndFolders = sortFoldersAndFiles(files);
console.log(filesAndFolders);

const sortByDate = (
	items: SidebarItem[], 
	sortKey: 'dateCreated' | 'lastUpdated'
): SidebarItem[] => {
  return items.sort((a, b) => {
    const dateA = a[sortKey].getTime();
    const dateB = b[sortKey].getTime();
    return dateA - dateB;
  }).map((item) => {
    if (item.children) {
      item.children = sortByDate(item.children, sortKey);
    }
    return item;
  });
}

const sortedByDate = sortByDate(files, 'dateCreated');
console.log(sortedByDate);

interface SidebarProps {
	items?: Array<SidebarItem>;
}

export default function Sidebar (
	{ items = sortedByDate }: SidebarProps
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