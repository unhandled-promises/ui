import React from 'react';
import Styled from 'styled-components';
import SubmitButton from "../components/SubmitButton";

export default ({ colorChoice, list, price, onClick }) => {
    return (
        <React.Fragment>
            <BundleOption>
                <BundleTop>
                    <span className="fa-stack fa-2x">
                        <IconBlock className="fas fa-square fa-stack-2x"></IconBlock>
                        <IconDetails colorChoice={colorChoice} className="fas fa-medal fa-stack-1x"></IconDetails>
                    </span>
                    <ul>
                        {list.map(item => {
                            return <BundleList key={item}>{item}</BundleList>
                        })}
                    </ul>
                </BundleTop>
                <div>
                    <BundlePrice>Price: {price}</BundlePrice>
                    <SubmitButton inverse="true" text="Select Package" onClick={onClick} />
                </div>
            </BundleOption>
        </React.Fragment>
    )
}

const BundleOption = Styled.div`
    float: left;
    background: #2A88AD;
    text-align: center;
    border-radius: 5px;
    padding: 10px;
    font-size: 150%;
    width: 200px;
    height: 300px;
    margin: 10px;
    display: inline-block;
`

const IconBlock = Styled.i`
    color: #FFFFFF;
`

const IconDetails = Styled.i`
    color: ${props => props.colorChoice};
`

const BundleList = Styled.li`
    font-size: 14px;
    text-align: left;
    color: #FFFFFF;
`

const BundlePrice = Styled.span`
    font-size: 18px;
    text-align: left;
    color: #FFFFFF;
`

const BundleTop = Styled.div`
    height: 225px;
`