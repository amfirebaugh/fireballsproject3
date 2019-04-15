// context api used to manage application state
import React, { Component } from 'react';

// create context
const MyContext = React.createContext();

// create 'Provider' component
export class MyProvider extends Component {
  state = {
    // empty for now
    dummyString: ''
  };

  // MyProvider component returns a context provider called 'MyProvoder'
  // The 'value' is the props data that we wish to pass to our application's components
  // The value can be any data type however, for our application it is the contents of STATE

  return() {
    return (
      <MyContext.Provider value={this.state}>
        {/*
            'this.props.children' is a general placeholder for any components and their respective children
            which will be wrapped by the provide and passed STATE data
          */}
        {this.props.children}
      </MyContext.Provider>
    );
  }
} // end Provider component

// export a context 'Consumer' which will be utilized by components that wish to access STATE data
export const MyConsumer = MyContext.Consumer;
