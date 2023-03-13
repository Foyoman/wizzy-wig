import React from "react";
import './SidebarItems.scss';

import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// todo: path
export interface SidebarItemProps {
	id: number;
	parentId?: number;
	path: string;
	isFolder: boolean;
	title: string;
	dateCreated: Date;
	lastUpdated: Date;
}

interface SidebarItemsProps {
	items: Array<SidebarItemProps>;
}

export default function SidebarItems ({ items }: SidebarItemsProps) {
	const mapDirectory = (
		currentDirectory: SidebarItemProps, items: Array<SidebarItemProps>
	) => {
		
		const subItems = items.filter((item: SidebarItemProps) => {
			return item.parentId === currentDirectory.id;
		})

		const isFolder = (item: SidebarItemProps) => item.isFolder;
		if (items.some(isFolder)) {
			console.log('current item is folder');
			return (
				<TreeItem
					nodeId={`${currentDirectory.id}`} 
					key={currentDirectory.id} 
					label={currentDirectory.title} 
					className="sidebar-item"
				>
				{ subItems.map(item => {
					if (item.isFolder) {
						mapDirectory(item, items);
					} 
					return (
						<TreeItem 
							nodeId={`${currentDirectory.id}`} 
							key={currentDirectory.id} 
							label={currentDirectory.title} 
							className="sidebar-item sub-item"
						/>
					)
				})}
				</TreeItem>
			)
		} else {
			return items.map((item) => (
				<TreeItem 
					nodeId={`${item.id}`} 
					key={item.id} 
					label={item.title} 
					className="sidebar-item"
				/>
			))
		}
	}
	
	// maybe recursive?
	const mappedItems = items.map((item) => {
		if (item.isFolder) {
			mapDirectory(item, items);
		} else {
			return (
				<TreeItem 
					nodeId={`${item.id}`} 
					key={item.id} 
					label={item.title} 
					className="sidebar-item"
				/>
			)
		}
	})

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