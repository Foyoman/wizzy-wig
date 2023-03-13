import React from "react";
import './Sidebar.scss';

import SidebarItems, { SidebarItem } from "./SidebarItems";

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

const files: Array<SidebarItem> = [
	{
		id: 0,
		title: 'angela',
		dateCreated: new Date('01-01-2012 00:03:44'),
		lastUpdated: new Date('01-01-2021 00:03:44'),
		isFolder: false,
	},
	{
		id: 1,
		title: 'directory',
		dateCreated: new Date('12-02-1998 00:03:44'),
		lastUpdated: new Date('01-01-2000 00:03:44'),
		isFolder: true,
		children: [
			{
				id: 2,
				title: 'subdirectory',
				dateCreated: new Date('01-01-2001 00:03:44'),
				lastUpdated: new Date('01-01-2002 00:03:44'),
				isFolder: true,
				children: [
					{
						id: 1241,
						title: 'zeppo',
						dateCreated: new Date('01-01-2022 00:03:44'),
						lastUpdated: new Date('01-01-2023 00:03:44'),
						isFolder: false,
					},
					{
						id: 3,
						title: 'chico',
						dateCreated: new Date('01-01-2003 00:03:44'),
						lastUpdated: new Date('01-01-2004 00:03:44'),
						isFolder: false,
					},
					{
						id: 32423,
						title: 'hotdogs',
						dateCreated: new Date('01-01-1983 00:03:44'),
						lastUpdated: new Date('01-01-2004 00:03:44'),
						isFolder: false,
					},
					{
						id: 821,
						title: 'zebra',
						dateCreated: new Date('01-01-1983 00:03:44'),
						lastUpdated: new Date('01-01-2004 00:03:44'),
						isFolder: true,
						children: [
							{
								id: 69,
								title: 'django',
								dateCreated: new Date('01-01-1983 00:03:44'),
								lastUpdated: new Date('01-01-2004 00:03:44'),
								isFolder: false,
							},	
						]
					},
					{
						id: 7,
						title: 'truncated',
						dateCreated: new Date('01-01-2005 00:03:44'),
						lastUpdated: new Date('01-01-2006 00:03:44'),
						isFolder: true,
						children: [
							{
								id: 8,
								title: 'flabbergasat',
								dateCreated: new Date('01-01-2007 00:03:44'),
								lastUpdated: new Date('01-01-2008 00:03:44'),
								isFolder: true,
								children: [
									{
										id: 99,
										title: 'daniel',
										dateCreated: new Date('01-01-2009 00:03:44'),
										lastUpdated: new Date('01-01-2010 00:03:44'),
										isFolder: true,
										children: [
											{
												id: 98,
												title: 'doors',
												dateCreated: new Date('01-01-2011 00:03:44'),
												lastUpdated: new Date('01-01-2012 00:03:44'),
												isFolder: false,
											},	
										]
									},
									{
										id: 321,
										title: 'jason',
										dateCreated: new Date('01-01-2009 00:03:44'),
										lastUpdated: new Date('01-01-2010 00:03:44'),
										isFolder: true,
										children: [
											{
												id: 928,
												title: 'derrick',
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
		title: 'typescript',
		dateCreated: new Date(),
		lastUpdated: new Date(),
		isFolder: false,
	},
	{
		id: 5,
		title: 'folder',
		dateCreated: new Date(),
		lastUpdated: new Date(),
		isFolder: true,
		children: [
			{
				id: 6,
				title: 'subfile',
				dateCreated: new Date(),
				lastUpdated: new Date(),
				isFolder: false,
			}
		]
	},
	{
		id: 6542,
		title: 'empty',
		dateCreated: new Date(),
		lastUpdated: new Date(),
		isFolder: true,
	}
]

function sortFileSystem(fileSystem: Array<SidebarItem>): Array<SidebarItem> {
  const [folders, files] = fileSystem.reduce(
    (acc, item) => {
      if (item.isFolder) {
        acc[0].push(item);
      } else {
        acc[1].push(item);
      }
      return acc;
    },
    [[], []] as [SidebarItem[], SidebarItem[]]
  );

  const sortedFolders = folders
    .map((folder) => {
      const sortedChildren = sortFileSystem(folder.children || []);
      return { ...folder, children: sortedChildren };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const sortedFiles = files.sort((a, b) => a.title.localeCompare(b.title));

  return [...sortedFolders, ...sortedFiles];
}

const sortedFileSystem = sortFileSystem(files);

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


function alphabetically(
	a: SidebarItem, 
	b: SidebarItem
): number {
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

function lastUpdated(
	a: SidebarItem, 
	b: SidebarItem
): number {
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

interface SidebarProps {
	items?: Array<SidebarItem>;
}

export default function Sidebar (
	{ items = sortedFileSystem }: SidebarProps
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