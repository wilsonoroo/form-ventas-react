import {Navigate, Route, Routes} from 'react-router-dom'
import { RegisterPage } from '../registrar/RegisterPage'


export const AppRouter = () => {
  return (
    <Routes>

        <Route path='distribuidores/:id' element={ <RegisterPage/> } />

        {/* <Route path='/*' element={ <Navigate to="register"/> } /> */}

    </Routes>
  )
};
