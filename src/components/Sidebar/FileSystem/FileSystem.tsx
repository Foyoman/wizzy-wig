import React from "react";
import './FileSystem.scss';

import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { FsFile } from "@/types/FsFile";

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from "@/store/store";
import { updateFile } from "@/store/fileSlice";

interface FileSystemProps {
	items: FsFile[];
	echoFile?: (item: FsFile) => void;
}

const FileSystem = (
	{ items, echoFile	}: FileSystemProps
) => {
	const dispatch = useDispatch();
	// const file = useSelector((state: RootState))

	const handleClick = (item: FsFile) => {
		console.log(item);
		if (item.fileId && !item.isFolder) {
			dispatch(updateFile(item.fileId));
			// echoFile(item);
		}
	}

	const mapDirectory = (
		items: FsFile[],
		nested: boolean,
	) => {
		return items.map((item) => {
			if (item.isFolder) {
				return (
					<TreeItem
						nodeId={`${item.id}`} 
						key={item.id} 
						label={item.title} 
						title={item.title}
						className={`sidebar-item ${ nested && 'nested' }`}
						onClick={() => handleClick(item)}
					>
					{ item.children?.length ? 
						mapDirectory(item.children, true) 
						: 
						<span style={{ display: 'none' }} />
					}
					</TreeItem>
				)
			} else {
				return (
					<TreeItem 
						nodeId={`${item.id}`} 
						key={item.id} 
						label={item.title} 
						title={item.title}
						className={`sidebar-item ${ nested && 'nested' }`}
						onClick={() => handleClick(item)}
					/>
				)
			}
		})
	}
	
	const mappedItems = mapDirectory(items, false);

	return (
		<TreeView 
			className="sidebar-items"
			aria-label="file system navigator"
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
		>
			{ mappedItems }
		</TreeView>
	)
}

export default React.memo(FileSystem);