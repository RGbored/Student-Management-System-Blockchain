import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Problems from './Manage/Problems';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Quiz from './Manage/Quiz';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App/>
  }, 
  {
    path: "/manage/problems", 
    element: <Problems/>
  }, 
  {
    path: "/quiz", 
    element: <Quiz/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      {/* <App /> */}
      <RouterProvider router={router}/>
    </React.StrictMode>
);
