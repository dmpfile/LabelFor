import React from 'react';
import '../../scss/header.scss';
import { ReactComponent as Github} from '../../assets/github.svg';
import { ReactComponent as Twitter} from '../../assets/twitter.svg';

type Props = {
  canvasSize: any
  setCanvasSize: any
}

const Header: React.FC<Props> = (props: Props) => {
  const SIZES = props.canvasSize;
  const setCanvasSize = props.setCanvasSize;

  const handleSizeChange = (e: any, line: string) => {
    e as HTMLElement;
    const targetVal = e.target.value;
    const wMax = 1200
    const hMax = 700
    if (targetVal) {
      if (line === 'x') {
        setCanvasSize({ ...SIZES, width: `${Number(targetVal) > wMax ? "1200": targetVal}px`})
      } else {
        setCanvasSize({ ...SIZES, height: `${Number(targetVal) > hMax ? "700": targetVal}px`})
      }
    }
  }

  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="header__title">Label for</h1>
        <div className="header__canvas">
          <span className="header__canvas--w">w</span>
          <input type="number" step="50" defaultValue="700" min="0" max="1200" onChange={e => handleSizeChange(e, "x")} className="header__canvas--size"/>
          <span>×</span>
          <span className="header__canvas--h">h</span>
          <input type="number" step="50" defaultValue="700" min="0" max="700" onChange={e => handleSizeChange(e, "y")} className="header__canvas--size"/>
        </div>
        <div className="header__logo">
          <a href='https://github.com/dmpfile' target="blank" rel="noopener"><Github /></a>
          <a href='https://twitter.com/dmpfile' target="blank" rel="noopener"><Twitter /></a>
        </div>
      </div>
    </header>
  )
}

export default Header