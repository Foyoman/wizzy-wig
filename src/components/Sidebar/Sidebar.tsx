import React from "react";
import './Sidebar.scss';

import SidebarItems from "./SidebarItems/SidebarItems";
import { SidebarItem } from "@/types/SidebarItem";

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

import { files } from "@/__mocks__/SidebarItems";

export function sortFileSystem(fileSystem: Array<SidebarItem>): Array<SidebarItem> {
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

const appendChild = (item: SidebarItem, child: SidebarItem) => {
	if (!item.isFolder) throw new Error(`Item with id: ${item.id} is not a folder.`)
	if (item.children) {
		item.children.push(child);
	} else {
		item.children = [child];
	}
}

const appendById = (
	id: SidebarItem['id'],
	items: Array<SidebarItem>,
	child: SidebarItem,
): SidebarItem | null => {
	for (const item of items) {
		if (item.id === id) {
			appendChild(item, child);
		}

		if (item.isFolder && item.children) {
			const foundItem = appendById(id, item.children, child);
			if (foundItem) {
				appendChild(foundItem, child);
			}
		}
	}
	return null;
}

interface SidebarProps {
	items?: Array<SidebarItem>;
  passItem?: (item: SidebarItem) => void;
}

export default function Sidebar (
	{ items = sortedFileSystem, passItem }: SidebarProps,
) {

  const retrieveFile = (item: SidebarItem) => {
    console.log("item retrieved, passing to App");
    if (passItem) {
      passItem(item);
    }
  }

	return (
		<div className="sidebar">
			<div className="toolbar">
				<SortOutlinedIcon className="icon" />
				<CreateNewFolderOutlinedIcon className="icon" />
				<NoteAddOutlinedIcon className="icon" />
			</div>
			<SidebarItems 
        items={items} 
        echoFile={retrieveFile}
      />
		</div>
	)
}