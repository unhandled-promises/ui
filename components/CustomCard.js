import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        maxWidth: 250,
        height: "100%",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: "#cd7f32",
    },
    content: {
        height: "200px",
    }
});

class CustomCard extends React.Component {

    render() {
        const { classes, src } = this.props;
        const imagePath = `/static/images/${src}`;

        return (
            <React.Fragment>
                <Formik
                    initialValues={{
                        plan: "",
                    }}
                    onSubmit={(values) => {
                        this.setState(values);
                        this.handleNext();
                    }}
                    render={({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Package" className={this.props.classType}>
                                        {this.props.label[0]}
                                    </Avatar>
                                }
                                title={this.props.label}
                                subheader={this.props.size}
                            />
                            <CardMedia
                                className={classes.media}
                                image={imagePath}
                                title={this.props.label}
                            />
                            <CardContent className={
                                this.props.name === "provider" ? "" :
                                (classes.content)
                            }>
                                <List dense={true}>
                                    {this.props.list.map(item => {
                                        return (
                                            <ListItem key={item}>
                                                <ListItemIcon>
                                                    <i className="far fa-check-square"></i>
                                                </ListItemIcon>
                                                <ListItemText
                                                    secondary={item}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </CardContent>
                            <CardContent>
                                <Divider light />
                                <Typography variant="h6" gutterBottom color={ this.props.statement === "Coming Soon" ? "error" : "default"}>
                                    {this.props.statement}
                                </Typography>

                                { this.props.statement !== "Coming Soon" ?
                                    <Button variant="contained" color="primary" type="submit" onClick={() => this.props.onSubmit({plan: this.props.label})}>
                                        Select
                                    </Button>
                                : "" }
                            </CardContent>
                        </Card>
                    )}
                />
            </React.Fragment>
        );
    }
}

CustomCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCard);
