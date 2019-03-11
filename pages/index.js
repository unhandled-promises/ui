import React from 'react'
import Styled from 'styled-components'
import Nav from '../components/Nav'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Link from 'next/link'

const placeholder1 = "Doggo ipsum he made many woofs such treat wow very biscit mlem stop it fren very good spot you are doing me the shock, doggorino ruff borkf extremely cuuuuuute very taste wow. you are doing me the shock you are doin me a concern borkf."

const placeholder2 = "Very taste wow yapper smol wow such tempt, bork shooberino. Very jealous pupper h*ck wow such tempt smol noodle horse adorable doggo, vvv very good spot length boy fluffer fat boi, doggo wow such tempt big ol doggo. Shibe adorable doggo doge borkdrive, heckin good boys."

const placeholder3 = "Blep long bois wow very biscit bork such treat floofs, thicc mlem puggo wow very biscit. Ruff puggo fluffer pats, ur givin me a spook.  Clouds shoober borking doggo very taste wow shoober borkf, much ruin diet most angery pupper I have ever seen doggorino boofers. Borkf most angery pupper I have ever seen pupper you are doing me the shock, clouds."

export default () => {
  return (
    <Body>
      <Nav sticky={false} />
      <Main>
        <JoinDiv>
          <h1>fit2work is the next level of employee wellness.</h1>
          <h2>Sign Up today! <Link href="/signup"><a>Click Here</a></Link></h2>
          <h4>Already a Member? <Link href="/login"><a>Login</a></Link></h4>
        </JoinDiv>
        <Testimonials>
          <h2>Testimonials</h2>
          <p>Here's what some of our clients are saying about us!</p>
          <TestCard1 title="Much Health" body={placeholder1} />
          <TestCard2 title="So Fit" body={placeholder2} />
          <TestCard3 title="Such Safe" body={placeholder3} />
        </Testimonials>
        <How>
          <h2>How it Works</h2>
        </How>
        <Contact>
          <h2>Schedule a Demo</h2>
        </Contact>
      </Main>
      <Footer />
    </Body>
  )
}

const Body = Styled.div`
  background: url("/static/images/endurance-exercise-female.jpg") no-repeat fixed center;
  display: grid;
  grid-template-rows: 100px auto 1fr auto;
`

const Main = Styled.main`
  display:grid;
  grid-template-rows: repeat(3,100px);
  grid-gap:200px;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  
  h1,h2,h3,h4 {
    font-family: 'Roboto', sans-serif;
  }

`
const JoinDiv = Styled.div`
  background-image: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  opacity: .9;
  height: 100%;
  justify-self: left;
  text-align: center;
  overflow:hidden;

  h1,h2, h3, h4 {
    margin: auto;
    margin-left:20px;
    margin-right:20px;
  }

  a {
    text-decoration:none;
    color: #000;
  }
  a :hover {
    color: #9FBEBA;
  }
`
const Testimonials = Styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: ". title ."
                        "message message message"
                         "card1 card2 card3";
  padding: 1rem;
  background-image: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  justify:center;
  text-align:center;
  overflow:hidden;
  min-height: 100%;

  h2 {
    grid-area: title;
  }
  p {
    grid-area: message;
    margin: 10;
  }
`
const TestCard1 = Styled(Card)`
  grid-area:card1;
`
const TestCard2 = Styled(Card)`
  grid-area:card2;
`
const TestCard3 = Styled(Card)`
  grid-area:card3;
`
const How = Styled.div `
  background-image: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  text-align:center;
`
const Contact = Styled.div `
  background-image: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  text-align:center;
`