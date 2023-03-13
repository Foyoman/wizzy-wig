import React from "react";
import './SidebarItems.scss';

import { TreeView, TreeItem } from "@mui/lab";

// todo: path
export interface SidebarItemProps {
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
	const mappedItems = items.map((item, index) => {

		return (
			<TreeItem 
				nodeId={`${index}`} 
				key={index} 
				label={item.title} 
				className="sidebar-item"
			/>
		)
	})

	return (
		<TreeView className="sidebar-items">
			{ mappedItems }
		</TreeView>
	)
}