import React from 'react';
import '../../scss/editnav.scss';
import { ReactComponent as Text} from '../../assets/text.svg';
import { ReactComponent as Image} from '../../assets/image.svg';

const EditNav: React.FC = () => {
  return (
    <div className="editnav">
      <div className="editnav__inner">
        <ul>
          <li>テキスト<div className="editnav__logo"><Text/></div></li>
          <li>画像<div className="editnav__logo"><Image/></div></li>
        </ul>
      </div>
    </div>
  )
}

export default EditNav;