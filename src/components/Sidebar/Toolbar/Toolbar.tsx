import React, { useState } from "react";
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

import { FsFile, SortKeys, SortFunction } from "@/types/FileSystem";
import { useDispatch } from "react-redux";
import { sortFs } from "@/store/appSlice";

interface ToolbarProps {
	items: FsFile[],
}

export default function Toolbar (
	{ items }: ToolbarProps
) {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [sort, setSort] = 
		useState<{
			sortKey: SortKeys, reverse: boolean
		} | null>({
			sortKey: "title", reverse: false
		});
	const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect: SortFunction = (items, sortKey, reverse) => {
		dispatch(sortFs({items, sortKey, reverse}));
		setSort({sortKey: sortKey, reverse: reverse});
    setAnchorEl(null);
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
				onClose={() => setAnchorEl(null)}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuList id="menu-list" dense>
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "title", false)}
					>
						<Checked visible={sort?.sortKey === "title" && !sort?.reverse} />
						<ListItemText>File Name (A - Z)</ListItemText>
					</MenuItem>
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "title", true)}
					>
						<Checked visible={sort?.sortKey === "title" && sort?.reverse} />
						<ListItemText>File Name (Z - A)</ListItemText>
					</MenuItem>
					<Divider />
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "lastUpdated", false)}
					>
						<Checked visible={sort?.sortKey === "lastUpdated" && !sort?.reverse} />
						<ListItemText>Date Modified (Newest First)</ListItemText>
					</MenuItem>
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "lastUpdated", true)}
					>
						<Checked visible={sort?.sortKey === "lastUpdated" && sort?.reverse} />
						<ListItemText>Date Modified (Oldest First)</ListItemText>
					</MenuItem>
					<Divider />
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "dateCreated", false)}
					>
						<Checked visible={sort?.sortKey === "dateCreated" && !sort?.reverse} />
						<ListItemText>Date Created (Newest First)</ListItemText>
					</MenuItem>
					<MenuItem 
						className="menu-item" 
						onClick={() => handleSelect(items, "dateCreated", true)}
					>
						<Checked visible={sort?.sortKey === "dateCreated" && sort?.reverse} />
						<ListItemText>Date Created (Oldest First)</ListItemText>
					</MenuItem>
				</MenuList>
			</Menu>

			<CreateNewFolderOutlinedIcon className="icon" />
			<NoteAddOutlinedIcon className="icon" />
		</div>
	)
}