import ShowActions from "../show-actions"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from "../home"
import ActionDetails from "../actions-details"
import NotFound from "../not-found-page"

const AppRoutes = () =>{
    return(
        <BrowserRouter>
          <Routes>
            <Route exact path = '/acao/:action' element={<ActionDetails />}/>
            <Route exact path='/acoes/page/:page' element={<ShowActions />}/>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='*' element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes