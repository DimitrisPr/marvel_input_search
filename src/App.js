import React from 'react';
import Button from './components/Button';
import ComboBox from './components/ComboBox';
var md5 = require('md5');

const timestamp = Date.now();
class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      api : {
        ts : timestamp,
        apikey : process.env.REACT_APP_MARVEL_PUBLIC_KEY,
        hash: md5( 
          timestamp +
          process.env.REACT_APP_MARVEL_PRIVATE_KEY +
          process.env.REACT_APP_MARVEL_PUBLIC_KEY +""     
        )
      }
    }
  }

  render() {
    return (
        <div className="flex-center-vh noselect">
              <ComboBox api={this.state.api} />
              <Button/>
        </div>
        
    );
  }
}

export default App;