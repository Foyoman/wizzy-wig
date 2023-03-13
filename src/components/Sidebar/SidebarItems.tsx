import React from "react";
import './SidebarItems.scss';

import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface SidebarItemProps {
	id: number;
	parentId?: number;
	path: string;
	title: string;
	dateCreated: Date;
	lastUpdated: Date;
	isFolder: boolean;
	children?: Array<SidebarItemProps>;
}

interface SidebarItemsProps {
	items: Array<SidebarItemProps>;
}

export default function SidebarItems ({ items }: SidebarItemsProps) {
	const mapDirectory = (
		items: Array<SidebarItemProps>,
		nested: boolean,
	) => {

		// todo: to simplify file system, the array of children can be determined by id association 
		return items.map((item) => {
			// if (item.isFolder)
			const children = items.filter((child) => {
				return child.parentId === item.id;
			})
			console.log(children);

			if (item.isFolder) {
				return (
					<TreeItem
						nodeId={`${item.id}`} 
						key={item.id} 
						label={item.title} 
						title={item.title}
						className={`sidebar-item ${ nested && 'nested' }`}
					>
						{ mapDirectory(children, true) }
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


			// if (item.children) {
			// 	return (
			// 		<TreeItem
			// 			nodeId={`${item.id}`} 
			// 			key={item.id} 
			// 			label={item.title} 
			// 			title={item.title}
			// 			className={`sidebar-item ${ nested && 'nested' }`}
			// 		>
			// 			{ mapDirectory(item.children, true) }
			// 		</TreeItem>
			// 	)
			// } else {
			// 	return (
			// 		<TreeItem 
			// 			nodeId={`${item.id}`} 
			// 			key={item.id} 
			// 			label={item.title} 
			// 			title={item.title}
			// 			className={`sidebar-item ${ nested && 'nested' }`}
			// 		/>
			// 	)
			// }
		})
	}
	
	// maybe recursive?
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