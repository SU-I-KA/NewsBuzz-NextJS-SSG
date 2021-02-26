import Head from 'next/head'
import Nav from '../components/Nav'
import fetch from 'node-fetch'
import NewsList from '../components/NewsList'

import styles from '../styles/Home.module.css'

const Home = ()=> {
  return (
    <>
      <Nav />
      <NewsList />
    
    </>
  )
}

export default Home;