import * as React from 'react';
import { useEffect }  from 'react';
import '../../scss/editmodal.scss';
import Select from 'react-select';
import axios from 'axios';

type Props = {
  current: any
  texts: any
  setText: any
  fonts: any
  setFont: any
  setModalState: any
}

type editInfo = {
  text: string
  size: string
  font: string
  color: string
}

const EditModal: React.FC<Props> = (props: Props) => {
  const current = props.current
  const texts = props.texts
  const setText = props.setText
  const fonts = props.fonts
  const setFont = props.setFont
  const setModalState = props.setModalState
  
  const editInfo: editInfo = {
    text: current.text,
    size: current.size,
    color: current.color,
    font: current.font,
  }

  // AIzaSyAnZnRlCH9djzcVJIlSZieMp2P5AVBQL-Y
  // https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAnZnRlCH9djzcVJIlSZieMp2P5AVBQL-Y
  const fontOptions: any = []

  const customStyles = {
    input: () => ({
      color: 'black',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: 'black',
    }),
  };

  const fetchFontsLists = async() => {
    const apiURL = 'https://www.googleapis.com/webfonts/v1/webfonts?sort=trending&key=AIzaSyAnZnRlCH9djzcVJIlSZieMp2P5AVBQL-Y';
    await axios.get(apiURL)
      .then(function (response) {
        const data = response.data.items;
        data.forEach((el:any) => {
          fontOptions.push({label: el.family, value: el.family})
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleOnChange = (e: any, type: string): void => {
    e as HTMLElement;
    if (type === 'text') {
      editInfo.text = e.target.value;
    } else if (type === 'size') {
      editInfo.size = e.target.value;
    } else if (type === 'color') {
      editInfo.color = e.target.value;
    } else if (type === 'font') {
      editInfo.font = e?.value;
    }
  }

  const setEditInfo = () => {
    setFont([
      ...fonts,
      {
        font: editInfo.font,
        weight: [400]
      }
    ])

    const newTexts = texts.filter((el: any) => {
      if (el.uuid == current.uuid) {
        el.text = editInfo.text;
        el.size = editInfo.size;
        el.color = editInfo.color;
        el.font = editInfo.font;
      }
      return true;
    })
    setText([...newTexts])
  }

  const setModalInfo = () => {
    setModalState(false)
  }

  useEffect(() => {
    fetchFontsLists();
  }, [fontOptions]);

  return (
    <div className="editmodal">
      <h2 className="editmodal__header">テキスト編集</h2>
      <div className="editmodal__inner">
        <ul>
          <li className="editmodal__text">
            <div>テキスト</div>
            <input type="text" defaultValue={current.text} onChange={e => handleOnChange(e, 'text')}/>
          </li>
          <li className="editmodal__size">
            <div>サイズ</div>
            <input type="text" defaultValue={current.size} onChange={e => handleOnChange(e, 'size')}/><span>px</span>
          </li>
          <li className="editmodal__color">
            <div>カラー</div>
            <input type="color" defaultValue={current.color} onChange={e => handleOnChange(e, 'color')}/>
          </li>
          <li className="editmodal__font">
            <div>フォント</div>
            <div className="editmodal__select">
              <Select
                styles={customStyles}
                options={fontOptions}
                onChange={e => handleOnChange(e, 'font')}
                defaultValue={{label: current.font, value: current.font}}
                maxMenuHeight={140}
                isClearable={true}
                width='100px'
              />
            </div>
          </li>
          <button className="editmodal__btn" onClick={setEditInfo}>登録</button>
          <button className="editmodal__btn" onClick={setModalInfo}>閉じる</button>
        </ul>
      </div>
    </div>
  )
}

export default EditModal;