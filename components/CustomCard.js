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

const styles = theme => ({
    card: {
        maxWidth: 250,
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
});

class CustomCard extends React.Component {

    render() {
        const { classes, src } = this.props;

        const imagePath=`/static/images/${src}`;

        return (
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
                                <Avatar aria-label="Package" className={this.props.colorChoice}>
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
                        <CardContent>
                            <ul>
                                {this.props.list.map(item => {
                                    return <li key={item}>{item}</li>
                                })}
                            </ul>
                            <Button variant="contained" color="primary" type="submit">
                                Select
                            </Button>
                        </CardContent>
                    </Card>
                )}
            />
        );
    }
}

CustomCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCard);
