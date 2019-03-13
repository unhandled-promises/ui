import React from 'react';
import Styled from 'styled-components';

export default ({ image, alttext, available, onClick }) => {

    return (
        <React.Fragment>
            <AvailableBlock onClick={onClick}>
                <img src={image} alt={alttext} width="128" height="128" />
                <br />
                <AvailableText available={available}>{available ? "Available!" : "Coming Soon!"}</AvailableText>
            </AvailableBlock>
        </React.Fragment>
    )
}

const AvailableBlock = Styled.div`
    display: inline-block;
    cursor: pointer;
    padding: 25px;
    margin: 25px;
`

const AvailableText = Styled.p`
    color: ${props => {
        if (!props.available) {
            return "red";
        }
    }}
`