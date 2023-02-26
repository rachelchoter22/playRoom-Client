import React from 'react';
import ReactDOM from 'react-dom';
require('./app.scss');

function ErrorMassage() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleClick = () => {
    setErrorMessage("Example error message!")
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Show error message</button>
      {errorMessage && <div className="error"> {errorMessage} </div>}
    </div>
  );
}

ReactDOM.render(
  <ErrorMassage />, 
  document.getElementById('root')
);
