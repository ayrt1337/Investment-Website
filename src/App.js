import ShowActions from "./components/show-actions";
import { createGlobalStyle } from "styled-components";
import './App.css'
import { HashRouter, Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from "./components/home";
import 'bootstrap/dist/css/bootstrap.min.css'
import ActionDetails from "./components/actions-details";

function App() {
  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
          <Routes>
            <Route exact path = '/acoes/:action' element={<ActionDetails />}/>
            <Route exact path='/acoes/page/:page' element={<ShowActions />}/>
            <Route exact path='/' element={<Home />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    text-decoration: none;
    box-sizing: border-box;
    font-family: "Nunito", sans-serif;
  }
`

export default App
