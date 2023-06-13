import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from './pages/login';
import Layout from './Layout';
import Posts from './pages/posts';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        {/* TODO create register component and add it in a container that can be changed with login */}
        <Route path="/login" element={<Login/>} />
        <Route element={<Layout />} >
          <Route index element={<Navigate to='/blog' />} />
          <Route path="/blog" element={<h1>page 1</h1>} />
          <Route path="/blog/posts" element={<Posts/>} />
          <Route path="/blog/post/:id" element={<h1>page 3</h1>}/>
          <Route path="*" element={<Navigate to='/blog' />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
