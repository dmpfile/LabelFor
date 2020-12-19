import React from 'react';
import '../../scss/footer.scss';

const Footer: React.FC = () => {
  const name = 'Ryosuke';
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <h1 className="footer__title">Copyright © {year} {name}</h1>
      </div>
    </footer>
  )
}

export default Footer