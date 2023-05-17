import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CardanoWallet } from '@meshsdk/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import classNames from 'classnames/bind';
import styles from '../../styles/Header.module.scss'
const cx = classNames.bind(styles);
const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleOnclick() {
    setIsNavExpanded(!isNavExpanded);
  }

  return (
    <header className={isScrolled ? cx('header', 'scrolled') : cx('header')}>
    <div className={cx('inner')}>
        <div className={cx('logo')}>
            <Link href='/'>
                <Image src="/images/logo.jpg" alt="NFT" width={50} height={50}  />
            </Link>
        </div>
        <div className={cx('navbar')}>
            <ul className={isNavExpanded ? cx('navbar-default') : cx('navbar-default', 'expanded')}>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/mint'>Mint</Link>
                </li>
                {/* <li>
                    <Link href='/Document">Document</Link>
                </li> */}
            </ul>
                {/* <Link href='ConnectWallet">Connect Wallet</Link> */}
                <CardanoWallet/>
            <button onClick={handleOnclick} className={cx('btn-nav')}>
                <FontAwesomeIcon icon={faBars} />
            </button>
        </div>
    </div>
</header>
  );
};

export default Header;
