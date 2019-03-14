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
      <Main>
        <JoinDiv>
          <h1>Fit2Work is the next level of employee wellness.</h1>
          <Link href="/signup"><Create type="dark">Create an Account</Create></Link>
          <h4>Already a member? <Link href="/login"><a>Login</a></Link></h4>
        </JoinDiv>
        <Testimonials>
          <h2>TESTIMONIALS</h2>
          <p>Here's what some of our clients are saying about us!</p>
          <TestCard1 title="Much Health" body={placeholder1} />
          <TestCard2 title="So Fit" body={placeholder2} />
          <TestCard3 title="Such Safe" body={placeholder3} />
        </Testimonials>
        <How>
          <h2>HOW IT WORKS</h2>
          <p>It's bouncing around the Web like a beachball at a Nickelback concert. The safe word is WHiskey. Oh, man, he hit his ass with a parking cone! Nice. This is my hat now! This is totally my hat! So I galloped into a wooded glen, and after punch-dancing out my rage and suffering an extremely long and very painful fall, I realized what has to be done. Hey Sullivan, you chode! I owe you a shot in the nuts! My name is Rod, and I like to party. You know, pools are perfect for holding water... My name is Rod, and I like to party. I used to be legit. I was too legit. I was too legit to quit. but now I'm not legit. I'm unlegit. And for that reason, I must quit. My name is Rod, and I like to party. Oh, man, he hit his ass with a parking cone! Nice. Balls, man! We just ran over a small bus! God I go to church every goddamn Sunday! You gonna bring the demons out of me!? My name is Rod, and I like to party. Hey, Rod, what's that song about a grandma getting run over by a reindeer? This is my hat now! This is totally my hat! Balls, man! We just ran over a small bus! Funky Fresh. So I galloped into a wooded glen, and after punch-dancing out my rage and suffering an extremely long and very painful fall, I realized what has to be done.</p>
          <Wrap>
          <img src="/static/images/heart-health.jpeg" />
          </Wrap>
        </How>
        <Contact>
          <h2>CONTACT US</h2>
          <form>
          <p>Curious? Reach out to us and request a demo!</p>
          <ContactInput type="name" placeholder="Name"/>
          <ContactInput type="email" placeholder="Email"/>
          <ContactInput type="phone" placeholder="Phone Number"/>
          <Send type="dark" size="normal">Submit</Send>
          </form>
          <Wrap>
          <img src="/static/images/yoga.jpeg"/>
          </Wrap>
        </Contact>
      </Main>
      <Footer />
    </Body>
  )
}

const Body = Styled.div`
  background: url("/static/images/endurance-exercise-female.jpg") no-repeat fixed center;
  display: grid;
  grid-template-rows: 100px auto 1fr;
`

const Main = Styled.main`
  display:grid;
  grid-template-rows: 400px 400px 1fr 500px;
  grid-gap:500px;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;

  h1,h2,h3,h4 {
    font-family: 'Roboto', sans-serif;
  }

`
const JoinDiv = Styled.div`
  background: linear-gradient(to bottom right, #fed75e, #FFA600);
  max-width: 30vw;
  display: grid;
  grid-template-rows: repeat (3, 1fr);
  border-radius: 25px;
  opacity: .9;
  justify-self: left;
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

const Testimonials = Styled.div`
  display: grid;
  grid-template-rows: repeat (3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: ". title ."
                        "message message message"
                         "card1 card2 card3";
  padding: 1rem;
  grid-gap: .75rem;
  background: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  justify:center;
  text-align:center;

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
  background: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  text-align:center;
  display: grid;
  grid-gap: .75rem;
  grid-template-rows: repeat (2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "title img"
                      "message img"
                      "message img";

  h2 {
    grid-area: title;
  }

  p {
    grid-area: message;
    margin: 20px;
    text-align:left;
  }

  img {
    grid-area: img;
    margin: auto;
    width: 100%;
    object-fit: cover;
  }
`
const Contact = Styled.div `
  background: linear-gradient(to bottom right, #fed75e, #FFA600);
  border-radius: 25px;
  text-align:center;
  display: grid;
  grid-gap: .75rem;
  grid-template-areas: "title img"
                      "message img"
                      "message img";

  h2 {
    grid-area: title;
    margin:auto;
  }
  
  form {
    grid-area:message;
    margin: auto;
  }
  
  img {
    grid-area: img;
    margin: auto;
    width: 100%;
  }
`
const ContactInput = Styled(Input)` 
  margin:auto;
  width: 100%;
`

const Send = Styled(Button)`
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
  opacity: .5;
  box-shadow: 0 0 20px 200px #FFA600 inset;
}
`