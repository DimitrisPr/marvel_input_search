import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import ComboBox from "../components/ComboBox";
import { shallow, configure } from 'enzyme';
import sinon from 'sinon'
import axios from 'axios'
var md5 = require('md5');
configure({adapter: new Adapter()});


const timestamp = Date.now();
const dummy_api =  {
    ts : timestamp,
    apikey : process.env.REACT_APP_MARVEL_PUBLIC_KEY,
    hash: md5( 
      timestamp +
      process.env.REACT_APP_MARVEL_PRIVATE_KEY +
      process.env.REACT_APP_MARVEL_PUBLIC_KEY +""     
    )
}

 describe('<ComboBox />', () => {

  const combobox = shallow(<ComboBox api = {dummy_api} />);
  it('Renders a ComboBox', () => {
    expect(combobox.find('.combobox').length).toEqual(1);
  });
  
  it('Makes AJAX call and fetches results, when user types', () => {
    combobox.find('input').simulate('change', { which: 't' })
    expect(combobox.find('.dropdown').length).toEqual(1);
  });


});


