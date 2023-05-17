import Link from "next/link";
import classNames from 'classnames/bind';
import styles from '../styles/Home.module.scss';
const cx = classNames.bind(styles);
export default function Home() {
  return (
    <div className={cx('container')}>
        <div className={cx('container-header')}>
                <div className={cx('header')}>
                    <div className={cx('header-content')}>
                        <h1>The Best Place to Collect Awesome NFTs</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolorem blanditiis ad
                            perferendis, labore delectus dolor adipisicing elit sit amet, adipisicing elit. Eveniet
                            adipisicing elit.
                        </p>
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            /
                            <li>
                                <Link href="/Mint">Mint Page</Link>
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
  );
}
