import React from "react";
import { Outlet } from "react-router";
import {Toaster} from 'react-hot-toast'

function App() {
  return <>
  <Outlet />
  <Toaster/>
  </>
}

export default App;
