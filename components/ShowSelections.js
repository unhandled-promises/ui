import React from 'react';
import Styled from 'styled-components';

export default ({address, address2, city, zip, email, company_name, state, plan}) => {
    console.log(address, address2, city, zip, email, company_name, state, plan);
	return (
        <React.Fragment>
            <h3>Details</h3>
            <ListItemObj>
                <li><ListItem><strong>Company:</strong> {company_name}</ListItem></li>
                <li><ListItem><strong>Address:</strong> {address}</ListItem></li>
                <li><ListItem><strong>Address2:</strong> {address2}</ListItem></li>
                <li><ListItem><strong>City:</strong> {city}</ListItem></li>
                <li><ListItem><strong>State:</strong> {state}</ListItem></li>
                <li><ListItem><strong>Zip:</strong> {zip}</ListItem></li>
                <li><ListItem><strong>Email:</strong> {email}</ListItem></li>
                <li><ListItem><strong>Plan:</strong> {plan}</ListItem></li>
            </ListItemObj>
        </React.Fragment>
	)
}

const ListItemObj = Styled.ol`
    list-style: none; /* Remove default numbering */
    *list-style: decimal; /* Keep using default numbering for IE6/7 */
    font: 15px 'trebuchet MS', 'lucida sans';
    padding: 0;
    margin-bottom: 4em;
    text-shadow: 0 1px 0 rgba(255,255,255,.5);
`

const ListItem = Styled.a`
    position: relative;
    display: block;
    padding: .4em .4em .4em .8em;
    *padding: .4em;
    margin: .5em 0 .5em 2.5em;
    background: #BCD6E0;
    color: #444;
    text-decoration: none;
    transition: all .3s ease-out; 

    :hover{
        background: #eee;
    }   
    
    :before{
        content: " ";
        position: absolute; 
        left: -2.5em;
        top: 50%;
        margin-top: -1em;
        background: #2A88AD;
        height: 2em;
        width: 2em;
        line-height: 2em;
        text-align: center;
        font-weight: bold;
    }
    
    :after{
        position: absolute; 
        content: '';
        border: .5em solid transparent;
        left: -1em;
        top: 50%;
        margin-top: -.5em;
        transition: all .3s ease-out;               
    }
    
    :hover:after{
        left: -.5em;
        border-left-color: #2A88AD;             
    }   
`
