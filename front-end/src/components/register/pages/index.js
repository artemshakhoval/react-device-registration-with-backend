import React from 'react';
import { Box, Typography, makeStyles, Modal, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ListItemLink = props => {
    return <ListItem button component="a" {...props} />;
}

const rand = () => {
    return Math.round(Math.random() * 20) - 10
}

const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const PageList = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState(false)
    const [modalStyle] = React.useState(getModalStyle)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const body = (
        <Box style={modalStyle} className={classes.paper}>
            <Typography variant="h4">Modal</Typography>
            <Typography>Modal content</Typography>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
            >
                Close</Button>
        </Box>
    )

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <div>
                    <ListItem button onClick={handleOpen}>
                        <ListItemIcon>
                            <CheckCircleRoundedIcon style={{ color: 'green' }} />
                        </ListItemIcon>
                        <ListItemText primary="Last Installations" />
                    </ListItem>
                    <Modal
                        open={isOpen}
                        onClose={handleClose}
                    >
                        {body}
                    </Modal>
                </div>
                <ListItem button>
                    <ListItemIcon>
                        <WarningRoundedIcon style={{ color: 'orange' }} />
                    </ListItemIcon>
                    <ListItemText primary="Last Warnings" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText primary="All Installations" />
                </ListItem>
                <ListItemLink href="#simple-list">
                    <ListItemText primary="All Warnings" />
                </ListItemLink>
            </List>
        </div>
    );
}

export default PageList