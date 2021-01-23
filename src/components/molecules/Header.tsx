import React from 'react';
import '../../scss/header.scss';
import { ReactComponent as Github} from '../../assets/github.svg';
import { ReactComponent as Twitter} from '../../assets/twitter.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="header__title">Label for</h1>
        <div className="header__logo">
          <a href='https://github.com/dmpfile' target="blank" rel="noopener"><Github /></a>
          <a href='https://twitter.com/dmpfile' target="blank" rel="noopener"><Twitter /></a>
        </div>
      </div>
    </header>
  )
}

export default Header