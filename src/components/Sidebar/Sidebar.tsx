import React, { useState } from "react";
import './Sidebar.scss';

import FileSystem from "./FileSystem/FileSystem";
import { FsFile } from "@/types/FsFile";

import { fsFiles } from "@/__mocks__/FileSystem";
import Toolbar from "./Toolbar/Toolbar";

export function sortFileSystem(
	fileSystem: FsFile[], 
	sortKey: "title" | "dateCreated" | "lastUpdated"
): FsFile[] {
  const [folders, files] = fileSystem.reduce(
    (acc, item) => {
      if (item.isFolder) {
        acc[0].push(item);
      } else {
        acc[1].push(item);
      }
      return acc;
    },
    [[], []] as [FsFile[], FsFile[]]
  );

  const sortedFolders = folders
    .map((folder) => {
      const sortedChildren = sortFileSystem(folder.children || [], sortKey);
      return { ...folder, children: sortedChildren };
    })
    .sort((a, b) => { 
			if (sortKey === "title") {
				return a.title.localeCompare(b.title)
			} else {
				const dateA = a[sortKey];
				const dateB = b[sortKey];
				if (dateA < dateB) {
					return 1;
				}
				if (dateA > dateB) {
					return -1;
				}
				return 0;
			}
		});
	
	let sortedFiles: FsFile[];
	if (sortKey === "title") {
		sortedFiles = files.sort((a, b) => a.title.localeCompare(b.title));
	} else {
		sortedFiles = files.sort((a, b) => {
			const dateA = a[sortKey];
			const dateB = b[sortKey];
			if (dateA < dateB) {
				return 1;
			}
			if (dateA > dateB) {
				return -1;
			}
			return 0;
		});
	}

  return [...sortedFolders, ...sortedFiles];
}

const sortedFileSystem = sortFileSystem(fsFiles, "dateCreated");

function lastUpdated(
	a: FsFile, 
	b: FsFile
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
	items: FsFile[], 
	sortKey: 'dateCreated' | 'lastUpdated'
): FsFile[] => {
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

const appendChild = (item: FsFile, child: FsFile) => {
	if (!item.isFolder) {
    throw new Error(`Item with id: ${item.id} is not a folder.`);
  }
	if (item.children) {
		item.children.push(child);
	} else {
		item.children = [child];
	}
}

const appendById = (
	id: FsFile['id'],
	items: FsFile[],
	child: FsFile,
): FsFile | null => {
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

const sortItems = () => {

}

interface SidebarProps {
	items?: FsFile[];
}

export default function Sidebar (
	{ items = sortedFileSystem }: SidebarProps,
) {
  const [files, setFiles] = useState<FsFile[] | null>(items);

  const updateFileSystem = (items: FsFile[], sortKey: string) => {

  }

	return (
		<div className="sidebar">
			<Toolbar items={items} />
			<FileSystem 
        items={items} 
      />
		</div>
	)
}