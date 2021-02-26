import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import styles from '../styles/Nav.module.css';

const Nav = ()=>{
    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);
    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };
    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        if (showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.height = '0px';
        }
    }, [showLinks]);
    return (
        <nav className={styles.nav}>
          <div className={styles.nav__center}>
            <div className={styles.nav__header}>
              <a href='/' className={styles.logo} >newsbuzz</a>
              <button className={styles.nav__toggle} onClick={toggleLinks}>
                <FaBars />
              </button>
            </div>
            <div className={styles.links__container} ref={linksContainerRef}>
              <ul className={styles.links} ref={linksRef}>
                <li className={styles.login}>
                    <a>login</a>
                </li>
                <li className={styles.register}>
                    <a>register</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
};
    
export default Nav;