import React, { useState } from 'react';
import Form from './components/Form';
import './App.css';
import CommentsList from './components/CommentsList';


function App() {

  const [comments, setComments] = useState([]);

  const createComment = (newComment) => {
    setComments(prev => [newComment, ...prev]);
  }


  return (
    <div className="App">
      <div className='container'>
        <div className='wrapper'>
          <Form create={createComment}/>
          <CommentsList comments={comments}/>
        </div>
      </div>
    </div>
  );
}

export default App;
