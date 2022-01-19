import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

/**
 * ユーザイアコン
 */
function Icon(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const logout = () => {
        document.getElementById('logout-form').submit();
    };
    
    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={ handleMenu }
                color="inherit"
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "inline-block" }}
                >
                    { props.user.name }
                </Typography>
                
                <AccountCircle />
            </IconButton>
            
            <Menu
                id="menu-appbar"
                anchorEl={ anchorEl }
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={ Boolean(anchorEl) }
                onClose={ handleClose }
            >
                <MenuItem onClick={handleClose}>
                    <a  onClick={ logout }>ログアウト</a>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                    <Link to="/history">質問閲覧履歴</Link>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                    <Link to="/my_page">マイページ</Link>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Icon;