import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Trans } from 'react-i18next';
import {
	Fade,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { listFormState } from '../recoil/atoms';

const List = ({ list, onSelect, onDelete }) => {
	const setListForm = useSetRecoilState(listFormState);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<ListItem button onClick={() => onSelect(list)}>
				<ListItemIcon>
					<Typography align="left" component="p">
						{list.listIcon.native}
					</Typography>
				</ListItemIcon>

				<ListItemText>{list.title}</ListItemText>

				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						aria-label="edit list"
						onClick={handleMenuOpen}
					>
						<MoreVertIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>

			<Menu
				id="fade-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleMenuClose}
				TransitionComponent={Fade}
			>
				<MenuItem
					onClick={() => {
						setListForm(list);
						setAnchorEl(null);
					}}
				>
					<ListItemIcon>
						<EditIcon />
					</ListItemIcon>
					<Typography component="p">
						<Trans i18nKey="form.list.edit">Edit</Trans>
					</Typography>
				</MenuItem>
				<MenuItem onClick={() => onDelete(list)}>
					<ListItemIcon>
						<DeleteIcon />
					</ListItemIcon>
					<Typography component="p">
						<Trans i18nKey="form.list.delete">Delete</Trans>
					</Typography>
				</MenuItem>
			</Menu>
		</>
	);
};

export default List;
