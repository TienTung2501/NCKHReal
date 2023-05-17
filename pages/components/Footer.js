import classNames from 'classnames/bind';
import styles from '../../styles/Footer.module.scss'
const cx = classNames.bind(styles);
function Footer() {
  return (
      <div className={cx('container')}>
          <h6>Copyright ©. All Rights Reserved</h6>
      </div>
  );
}

export default Footer;