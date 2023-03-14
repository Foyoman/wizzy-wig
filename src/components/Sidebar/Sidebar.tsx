import React, { useState } from "react";
import './Sidebar.scss';

import FileSystem from "./FileSystem/FileSystem";
import { FsFile, SortFunction } from "@/types/FileSystem";

import { fsFiles } from "@/__mocks__/FileSystem";
import Toolbar from "./Toolbar/Toolbar";

export const sortFileSystem: SortFunction = (fileSystem, sortKey) => {
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

interface SidebarProps {
	items?: FsFile[];
}

export default function Sidebar (
	{ items = sortedFileSystem }: SidebarProps,
) {
  const [files, setFiles] = useState<FsFile[]>(items);

  const updateFileSystem: SortFunction = (items, sortKey) => {
		setFiles(sortFileSystem(items, sortKey));
		return items;
	}

	return (
		<div className="sidebar">
			<Toolbar items={files} onSort={updateFileSystem} />
			<FileSystem 
        items={files} 
      />
		</div>
	)
}