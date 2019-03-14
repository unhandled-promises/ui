import React from 'react'
import Styled from 'styled-components';

export default ({ friends }) => {
  return (
    <Card>
      <CardHeading>
        <h3>Friends</h3>
      </CardHeading>
      <CardBody>
        {friends.map((friend, i) => {
          return (
            <Group>
              <Bubble>{friend.average.steps}</Bubble>
              <img
                src={friend.user.avatar}
                style={{ height: 50, left: 10, borderRadius: "50%" }}
                alt=""
              />
              <h4>{friend.user.displayName}</h4>
            </Group>
          )
        })}
      </CardBody>
    </Card>
  )
}

const Card = Styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  box-shadow: #696773 -10px 5px 10px;
  min-height: 200px;
  margin-bottom: 20px;
  margin-top: 10px;
`

const CardHeading = Styled.div`
  margin: 0;
  h3{
    margin:.5rem;
  }
`

const CardBody = Styled.div`
  margin:0;
  align-self: center;
  margin: 10px;
`

const Bubble = Styled.span`
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: blue;
  border-radius: 10px;
  float: right;
`

const Group = Styled.div`
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
}
`

