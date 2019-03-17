import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default ({ ... props }) => {
    return (
        <React.Fragment>
            <ListItem disableGutters={true} dense={true}>
                <ListItemIcon>
                    <span className="fa-stack fa-2x">
                        <i className="fas fa-square fa-stack-2x"></i>
                        <i className={props.icon}></i>
                    </span>
                </ListItemIcon>
                <ListItemText
                    primary={props.primary}
                    secondary={props.secondary}
                />
            </ListItem>
        </React.Fragment>
    )
}
