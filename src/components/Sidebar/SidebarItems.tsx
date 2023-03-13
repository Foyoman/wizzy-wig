import React from "react";
import './SidebarItems.scss';

import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface SidebarItem {
	id: number;
	parentId?: number;
	path: string;
	title: string;
	dateCreated: Date;
	lastUpdated: Date;
	isFolder: boolean;
	children?: Array<SidebarItem>;
}

interface SidebarItemsProps {
	items: Array<SidebarItem>;
}

export default function SidebarItems ({ items }: SidebarItemsProps) {
	const mapDirectory = (
		items: Array<SidebarItem>,
		nested: boolean,
	) => {
		return items.map((item) => {
			if (item.children) {
				return (
					<TreeItem
						nodeId={`${item.id}`} 
						key={item.id} 
						label={item.title} 
						title={item.title}
						className={`sidebar-item ${ nested && 'nested' }`}
					>
						{ mapDirectory(item.children, true) }
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