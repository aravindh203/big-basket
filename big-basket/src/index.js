import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Redux from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));


const Main = () =>{
  return(
      <div>
          <Redux/>
      </div>
  );
}

root.render(<Main/>);


