import React from 'react'
import Styled from 'styled-components'
import Nav from '../components/Nav'
import Card from '../components/Card'
import Button from '../components/Button'
import Footer from '../components/Footer'
import Link from 'next/link'
import Input from '../components/Input'

const placeholder1 = "Doggo ipsum he made many woofs such treat wow very biscit mlem stop it fren very good spot you are doing me the shock, doggorino ruff borkf extremely cuuuuuute very taste wow. you are doing me the shock you are doin me a concern borkf."

const placeholder2 = "Very taste wow yapper smol wow such tempt, bork shooberino. Very jealous pupper h*ck wow such tempt smol noodle horse adorable doggo, vvv very good spot length boy fluffer fat boi, doggo wow such tempt big ol doggo. Shibe adorable doggo doge borkdrive, heckin good boys."

const placeholder3 = "Blep long bois wow very biscit bork such treat floofs, thicc mlem puggo wow very biscit. Ruff puggo fluffer pats, ur givin me a spook.  Clouds shoober borking doggo very taste wow shoober borkf, much ruin diet most angery pupper I have ever seen doggorino boofers. Borkf most angery pupper I have ever seen pupper you are doing me the shock, clouds."

export default () => {
  return (
    <Body>
      <Nav sticky={false} />
      <Section1>
        <JoinDiv>
          <h1>Fit2Work is the next level of employee wellness.</h1>
          <Link href="/signup"><Create type="dark">Create an Account</Create></Link>
          <h4>Already a member? <Link href="/login"><a>Login</a></Link></h4>
        </JoinDiv>
        </Section1>
        <Section2>
        <Testimonials>
          <h1>TESTIMONIALS<hr/></h1>
          <p>Here's what some of our clients are saying about us!</p>
          <TestCard1 title="Much Health" body={placeholder1} />
          <TestCard2 title="So Fit" body={placeholder2} />
          <TestCard3 title="Such Safe" body={placeholder3} />
        </Testimonials>
        </Section2>
        <Section3>
        <How>
          <h1>HOW IT WORKS<hr/></h1>
          <h4>Having a healthy, happy workforce is one of the keys to increased productivity and efficiency. 
            Fit2Work allows companies and their employees to link their fitness tracker device to our online display dashboard. 
            Utilizing the Fitbit API, employees are able to see their heart rate, steps, and calories burned among other statistics. Company 
            owners can view employee heart rate and will be able to know if a safety action is needed.<br/>
            In eu veniam nostrud irure. Mollit elit adipisicing culpa irure ipsum voluptate ullamco. Officia proident do in cupidatat cillum qui voluptate pariatur do dolore culpa cupidatat non nostrud.
            Ullamco consectetur cupidatat fugiat deserunt. In reprehenderit qui cupidatat deserunt qui. Incididunt officia fugiat esse excepteur consectetur occaecat excepteur exercitation ipsum enim labore esse. Eiusmod occaecat ad aute id amet et fugiat cupidatat. Aliqua minim excepteur occaecat labore nulla. Tempor id incididunt consectetur sint exercitation nostrud ad veniam pariatur enim occaecat.
            </h4>
          <Wrap>
          <img src="/static/images/athlete-bike.jpg" />
          </Wrap>
        </How>
        </Section3>
        <Section4>
        <Contact>
          <h1>CONTACT US<hr/></h1>
          <p>Curious? Reach out and request a demo!</p>
          <form>
          <ContactInput type="name" placeholder="Name"/>
          <ContactInput type="email" placeholder="Email"/>
          <ContactInput type="phone" placeholder="Phone Number"/>
          <Send type="dark" size="normal">Submit</Send>
          </form>
          <Wrap>
          <img src="/static/images/yoga.jpeg"/>
          </Wrap>
        </Contact>    
        </Section4> 
      <Footer />
    </Body>
  )
}

const Body = Styled.div`
  display: grid;
  grid-template-rows: 100px 100vh 90vh 90vh 80vh 1fr;
  font-family: 'Montserrat', sans-serif;
  background: url("/static/images/endurance-exercise-female.jpg") no-repeat fixed center;
`

const Main = Styled.main`
  display:grid;
  grid-template-rows: 300px 400px 500px 500px;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  margin-top:100px;
`
const Section1 = Styled.div `
background: url("/static/images/endurance-exercise-female.jpg") no-repeat fixed center;
display: grid;
grid-template-rows: 150px 350px 100px;
grid-template-areas: ". . ." ". join ." ". . .";
`

const JoinDiv = Styled.div`
  background: linear-gradient(to bottom right, #fed75e, #FFA600);
  max-width: 30vw;
  grid-area: join;
  display: grid;
  border-radius: 25px;
  opacity: .9;
  justify-self: center;
  text-align: center;

  a {
    text-decoration:none;
    color: #000;
  }
  a :hover {
    color: #131B26;
  }
`
const Create = Styled(Button)`
  width: 70%;
  height: 100%;
  justify-self:center;

  & : hover {
    background-color: #131B26;
  }
`
const Section2 = Styled.div `
  background: #FFA600;
  display: grid;
  grid-template-rows: 150px 350px;
  grid-template-areas: ". . ." ". test .";
  -webkit-clip-path: polygon(50% 22%, 100% 0, 100% 75%, 50% 100%, 0% 75%, 0 0);
  clip-path: polygon(50% 22%, 100% 0, 100% 75%, 50% 100%, 0% 75%, 0 0);
`

const Testimonials = Styled.div`
  grid-area:test;
  display: grid;
  grid-template-rows: repeat (3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: ". title ."
                        "message message message"
                         "card1 card2 card3";
  padding: 1rem;
  grid-gap: .75rem;
  justify:center;
  text-align:center;

  h1 {
    grid-area: title;
  }
  p {
    grid-area: message;
    margin: 10;
  }
`
const TestCard1 = Styled(Card)`
  grid-area:card1;
  background-color: #DCDCDC;
`
const TestCard2 = Styled(Card)`
  grid-area:card2;
  background-color: #DCDCDC;
`
const TestCard3 = Styled(Card)`
  grid-area:card3;
  background-color: #DCDCDC;
`
const Section3 = Styled.div `
  background: #FFA600;
  display: grid;
  grid-template-rows: 150px 350px 100px;
  grid-template-areas: ". . ." ". how .";
  -webkit-clip-path: polygon(50% 22%, 100% 0, 100% 75%, 50% 100%, 0% 75%, 0 0);
  clip-path: polygon(50% 22%, 100% 0, 100% 75%, 50% 100%, 0% 75%, 0 0);
`

const How = Styled.div `
  grid-area:how;
  background: #FFA600;
  text-align:center;
  display: grid;
  grid-gap: .75rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "title img"
                      "message img"
                      "message img";

  h1 {
    grid-area: title;
    text-align:left;
  }

  h4 {
    grid-area: message;
    margin: 20px;
    text-align:left;
  }

  img {
    grid-area: img;
    margin: auto;
    width: 100%;
    -webkit-clip-path: polygon(100% 0, 100% 66%, 0 100%, 0 34%);
    clip-path: polygon(100% 0, 100% 66%, 0 100%, 0 34%);
  }
`
const Section4 = Styled.div `
  background: #FFA600;
  display: grid;
  grid-template-rows: 150px 350px;
  grid-template-areas: ". . ." "contact contact .";
  -webkit-clip-path: polygon(50% 22%, 100% 0, 100% 75%, 50% 100%, 0% 75%, 0 0);
  clip-path: polygon(50% 22%, 100% 0%, 100% 100%, 50% 100%, 0% 100%, 0 0);
`

const Contact = Styled.div `
  grid-area: contact;
  background: #FFA600;
  text-align:center;
  display: grid;
  grid-gap: .75rem;
  grid-template-areas: "img title"
                      "img header"
                      "img message"
                      "img message";

  h1 {
    grid-area: title;
    margin:auto;
  }

  p {
    grid-area: header;
    margin:auto;
  }
  
  form {
    grid-area:message;
    margin: auto;
    width: 70%;
    margin-top:2px;
  }
  
  img {
    grid-area: img;
    width: 100%;
    -webkit-clip-path: polygon(100% 34%, 100% 100%, 0 66%, 0 0);
    clip-path: polygon(100% 34%, 100% 100%, 0 66%, 0 0);
  }
`
const ContactInput = Styled(Input)` 
  margin:auto;
  width: 100%;
`

const Send = Styled(Button)`
width: 70%;
  height: 100%;
  justify-self:center;
& : hover {
  background-color: #131B26;
}
`

const Wrap = Styled.div `
grid-area: img;
margin: auto;
position: relative;

& : after {
  content:"";
  position: absolute;
  top:0;
  left:0;
  height:100%;
  width:100%;
  background: #FFA600;
  opacity: .6;
}
`