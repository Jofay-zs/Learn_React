```js
import React from  'react';
import ReactDom from 'react-dom';

function Greeting(){
  // It not return a HTML, always return JSX
  return (
    <div>
      <h1>Hi,</h1>
    </div>
  )
}

// This is the way to do the same thing above, but with an arrow function
const Greeting = () =>{
  return React.createElement(
    'div', 
    {}, 
    React.createElement(
      'h1', 
      {}, 
      'Hi'
    )
  );
};

ReactDom.render(<Greeting/>, document.getElementById('root'));
```