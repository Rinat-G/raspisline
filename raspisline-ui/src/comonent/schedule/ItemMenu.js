import React, {useState} from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import * as PropTypes from 'prop-types';


const ItemMenu = (props) => {
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleEditClick = () => {
        setMenuAnchor(null);
        props.handleEditClick()
    }

    const handleDeleteClick = () => {
        setMenuAnchor(null);
        props.handleDeleteClick()

    }


    return (
        <React.Fragment>
            <Button variant={"contained"}
                    size={"small"}
                    style={{minWidth: '1px', paddingLeft: '4px', paddingRight: '4px'}}
                    onClick={(event) => setMenuAnchor(event.currentTarget)}
            >
                <MenuIcon fontSize={"small"}/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>Редактировать</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Удалить</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

ItemMenu.propTypes = {
    handleEditClick: PropTypes.func,
    handleDeleteClick: PropTypes.func
}

export default ItemMenu;