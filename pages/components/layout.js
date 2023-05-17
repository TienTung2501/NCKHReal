import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { CardanoWallet } from '@meshsdk/react'
const Layout = ({ children,cardanoWallet}) => {
  return (
    <>
    <Header cardanoWallet={<CardanoWallet/>}/>
    <div>{children}</div>
    <Footer /> 
    </>
  )
}

export default Layout;