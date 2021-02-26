import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import {FaRss} from 'react-icons/fa'
import styles from '../styles/News.module.css'
import Loading from './Loading'

const mainUrl = `http://80.240.21.204:1337/news?`

const NewsList = () => {

  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState([])
  const [skip, setSkip] = useState(0)
  const limit = 14;
  
  const fetchNews = async () => {
    setLoading(true)
    const urlSkip = `skip=${skip}`
    const urlLimit = `&limit=${limit}`
	
    let url = `${mainUrl}${urlSkip}${urlLimit}`;
 
    try {
      const response = await fetch(url)
      const data = await response.json()
      setNews((oldNews) => {
        if (skip === 0) {
          return data.news
        } else {
          return [...oldNews, ...data.news]
        }
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchNews()
  }, [skip])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setSkip((oldNews) => {
          return oldNews + 14
        })
      }
    })
    return () => window.removeEventListener('scroll', event)
  }, [])
  
    
  return (
    <div className={styles.container}>
      <div className={styles.col__6}></div>
      <div className={styles.newsData}>
        <div className={styles.news__list}>
          {
            news.map((newsItem, index) => {
              return (
                <div className={styles.news} key={index}>
                  <div className={styles.sectionHead}>
                    {newsItem.source.title === 'Birmingham Live - Sport'? <h3 className={styles.bTitle}>B</h3> :
                    <img src={newsItem.source.url} className={styles.image} alt='image'/>}
                    <h4 className={styles.sourceTitle}>{newsItem.source.title}</h4>
                    <FaRss className={styles.rss}/>
                  </div>
                  <h3 className={styles.description}>{newsItem.title}</h3>
                  <p className={styles.date}>{newsItem.created_at}</p>
                  { newsItem.keywords.length>0 &&
                    <ul className={styles.keywords}>
                      {newsItem.keywords.map((item, index)=>{
                        return(
                          <li key={index}>
                            <a>{item.name}</a>
                          </li>
                        )
                        })}
                    </ul>
                  }
                  
                </div>
              )
            })
          }
        </div>
        {loading && <Loading />}

      </div>

      <div className={styles.col__6}></div>
    </div>
  )
}

export default NewsList