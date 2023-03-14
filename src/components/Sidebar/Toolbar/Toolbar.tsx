import React from "react";
import './Toolbar.scss';

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Check from '@mui/icons-material/Check';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { FsFile, SortFunction } from "@/types/FileSystem";

interface ToolbarProps {
	items: FsFile[],
	onSort: SortFunction
}

export default function Toolbar (
	{ items, onSort }: ToolbarProps
) {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect: SortFunction = (items, sortKey) => {
		if (onSort) {
			onSort(items, sortKey);
		}
    setAnchorEl(null);
		return items;
  };

	interface CheckedProps extends JSX.IntrinsicAttributes {
		visible?: boolean;
	}

	const Checked = ({ visible = false }: CheckedProps) => {
    return (
      <ListItemIcon 
				style={{ 
					visibility: visible ? 'visible' : 'hidden' 
				}}
			>
        <Check />
      </ListItemIcon>
    )
  }

	return (
		<div className="toolbar">
			<Button
				className="toolbar-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<SortOutlinedIcon className="icon" />
			</Button>
			<Menu
				id="sort-menu"
				anchorEl={anchorEl}
				open={open}
				// onClose={() => handleSelect(items, "title")}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuList id="menu-list" dense>
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "title")}
					>
						<Checked visible={true} />
						<ListItemText>File Name (A - Z)</ListItemText>
					</MenuItem>
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "title")}
					>
						<Checked />
						<ListItemText>File Name (Z - A)</ListItemText>
					</MenuItem>
					<Divider />
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "lastUpdated")}
					>
						<Checked />
						<ListItemText>Date Modified (Newest First)</ListItemText>
					</MenuItem>
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "lastUpdated")}
					>
						<Checked />
						<ListItemText>Date Modified (Oldest First)</ListItemText>
					</MenuItem>
					<Divider />
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "dateCreated")}
					>
						<Checked />
						<ListItemText>Date Created (Newest First)</ListItemText>
					</MenuItem>
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "dateCreated")}
					>
						<Checked />
						<ListItemText>Date Created (Oldest First)</ListItemText>
					</MenuItem>
				</MenuList>
			</Menu>

			<CreateNewFolderOutlinedIcon className="icon" />
			<NoteAddOutlinedIcon className="icon" />
		</div>
	)
}