import React from "react";
import './SidebarItems.scss';

import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { SidebarItem } from "@/types/SidebarItem";

interface SidebarItemsProps {
	items: Array<SidebarItem>;
	echoFile?: (item: SidebarItem) => void;
}

export default function SidebarItems (
	{ items, echoFile	}: SidebarItemsProps
) {
	const handleClick = (item: SidebarItem) => {
		console.log(item);
		if (echoFile && !item.isFolder) {
			echoFile(item);
		}
	}

	const mapDirectory = (
		items: Array<SidebarItem>,
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