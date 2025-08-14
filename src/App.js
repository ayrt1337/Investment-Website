import { createGlobalStyle } from "styled-components";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRoutes from './components/app-routes'

function App() {
  return (
    <>
      <GlobalStyle />

      <AppRoutes />
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
