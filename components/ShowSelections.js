import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CustomListItem from "../components/CustomListItem";

export default ({ address, address2, city, zip, email, company_name, state, plan }) => {
    return (
        <React.Fragment>
            <Grid container spacing={0} justify="center">
                <Grid item xs={12} md={6}>
                    <CustomListItem primary="Company" secondary={company_name} icon="fas fa-building fa-stack-1x fa-inverse"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomListItem primary="Address" secondary={address} icon="fas fa-address-card fa-stack-1x fa-inverse"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomListItem primary="Address 2" secondary={address2} icon="fas fa-address-card fa-stack-1x fa-inverse"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomListItem primary="City" secondary={city} icon="fas fa-city fa-stack-1x fa-inverse"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomListItem primary="State" secondary={state} icon="fas fa-city fa-stack-1x fa-inverse"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomListItem primary="Postal Code" secondary={zip} icon="fas fa-mailbox fa-stack-1x fa-inverse"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomListItem primary="Email" secondary={email} icon="fas fa-envelope fa-stack-1x fa-inverse"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomListItem primary="Plan" secondary={plan} icon="fas fa-keynote fa-stack-1x fa-inverse"/>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}
