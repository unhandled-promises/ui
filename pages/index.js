import React from 'react'
import Styled from 'styled-components'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Link from 'next/link'

const placeholder1 = "Doggo ipsum he made many woofs such treat wow very biscit mlem stop it fren very good spot you are doing me the shock, doggorino ruff borkf extremely cuuuuuute very taste wow. you are doing me the shock you are doin me a concern borkf."

const placeholder2 = "Very taste wow yapper smol wow such tempt, bork shooberino. Very jealous pupper h*ck wow such tempt smol noodle horse adorable doggo, vvv very good spot length boy fluffer fat boi, doggo wow such tempt big ol doggo. Shibe adorable doggo doge borkdrive, heckin good boys."

const placeholder3 = "Blep long bois wow very biscit bork such treat floofs, thicc mlem puggo wow very biscit. Ruff puggo fluffer pats, ur givin me a spook.  Clouds shoober borking doggo very taste wow shoober borkf, much ruin diet most angery pupper I have ever seen doggorino boofers. Borkf most angery pupper I have ever seen pupper you are doing me the shock, clouds."


export default () => {
  return (
    <Body>
      <Nav sticky={false}/>
      <Hero image="/static/images/endurance-exercise-female.jpg" />
      <Main>
        <Card title="Much Health" body={placeholder1} />
        <Card title="So Fit" body={placeholder2} />
        <Card title="Such Safe" body={placeholder3} />
        <JoinDiv>
          <h2>Sign Up <Link href="/signup"><a>Here</a></Link></h2>
          <h3>Already a Member? <Link href="/login"><a>Login</a></Link></h3>
        </JoinDiv>
      </Main>
      <Footer />
    </Body>
  )
}

const Body = Styled.div`
  display: grid;
  grid-template-rows: 100px auto 1fr auto;
`

const Main = Styled.main`
  background-color: #FFF;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: .75rem;
  padding: 1rem;
`

const JoinDiv = Styled.div`
  grid-column: 1/-1;
  justify-self: center;
  text-align: center;
`