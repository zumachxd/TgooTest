import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NewPostPage from './Pages/NewPostPage';
import PostDetails from './Pages/PostDetail';
import EditPost from './Pages/EditPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/NewPost' element={<NewPostPage />} />
        <Route path="/postagens/:postId" element={<PostDetails />} />
        <Route path="/edit/:postId" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
