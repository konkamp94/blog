import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        {/* <Route path="/register" component={Register} /> */}
        {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
