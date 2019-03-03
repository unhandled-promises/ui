import React from 'react';
import Styled from 'styled-components'
import FullNav from '../../../components/FullNav';
import Link from 'next/link';

export default () => {
  return(
    <React.Fragment>
      <FullNav>
        <Link prefetch href="/dashboard/customer"><NavLink>Home</NavLink></Link>
        <Link href="/dashboard/customer/manage"><NavLink>Manage</NavLink></Link>
      </FullNav>
      <h1>Manage Customers</h1>
    </React.Fragment>
    
  )
}

const NavLink = Styled.a`
  margin:.5rem;
`