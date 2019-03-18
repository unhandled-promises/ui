import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Router from 'next/router';

const drawerWidth = 300;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#1f2d3f",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        backgroundColor: "#efeece",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        backgroundColor: "#efeece",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    logo: {
        fontFamily: "Baloo Chettan, cursive",
        fontSize: "40px",
        textAlign: "center",
        backgroundColor: "#1f2d3f",
        opacity: ".9",
        color: "#ffffff",
    }
});

class MiniDrawer extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

   handleClicked = async (event) => {
        const element = event.target;
        const { onClickIcon } = this.props;

        if (element.classList.contains("fa-user")) {
            Router.push("/dashboard/employee");
        } else if (element.classList.contains("fa-user-edit")) {
            onClickIcon("editEmployee");
        } else if (element.classList.contains("fa-users")) {
            Router.push("/dashboard/customer");
        } else if (element.classList.contains("fa-edit")) {
            onClickIcon("editCompany");
        } else if (element.classList.contains("fa-home")) {
            Router.push("/");
        } else if (element.classList.contains("fa-sign-out")) {
            await sessionStorage.removeItem("jwt");
            Router.push("/login");
        }
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <i className="far fa-caret-circle-down fa-fw"></i>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.logo} noWrap>
                            Fit2Work
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <i className="far fa-chevron-right fa-fw"></i> : <i className="far fa-chevron-left fa-fw"></i>}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['View Company Dashboard', 'Edit Company Profile'].map((text, index) => (
                            <ListItem button key={text} onClick={this.handleClicked}>
                                <ListItemIcon>{index % 2 === 0 ? <i className="fa fa-users fa-fw fa-2x" title="View Company Dashboard"></i> : <i className="far fa-edit fa-fw fa-2x"  title="Edit Company Profile"></i>}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List >
                        {["View User Dashboard", "Edit User Profile"].map((text, index) => (
                            <ListItem button key={text} onClick={this.handleClicked}>
                                <ListItemIcon>{index % 2 === 0 ? <i className="fas fa-user fa-fw fa-2x" title="View User Dashboard"></i> : <i className="fas fa-user-edit fa-fw fa-2x" title="Edit User Profile"></i>}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['Home', 'Logout'].map((text, index) => (
                            <ListItem button key={text} onClick={this.handleClicked}>
                                <ListItemIcon>{index % 2 === 0 ? <i className="fas fa-home fa-fw fa-2x" title="Home"></i> : <i className="fas fa-sign-out fa-fw fa-2x" title="Logout"></i>}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);