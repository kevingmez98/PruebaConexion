import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import DashBoardPage from './dashboard/DashboardPage';

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Routes/Home';
import Profile from './Routes/Profile';

import RealizarVenta from './Routes/Representante/RealizarVenta';
import GestionarCliente from './Routes/Representante/GestionarCliente';
import GestionarRepresentante from './Routes/Rep-general/GestionarRepresentante';
import GestionarClasificacion from './Routes/Rep-general/GestionarClasificacion';
import GestionarInventario from './Routes/Rep-general/GestionarInventario';
import GestionarRepCl from './Routes/Cliente/GestionarRepCl';
import GestionarCompras from './Routes/Cliente/GestionarCompras';
import GestionarCarritoCl from './Routes/Cliente/GestionarCarritoCl';
import RealizarCompraCl from './Routes/Cliente/RealizarCompraCl';
import GestionarCarritoRep from './Routes/Representante/GestionarCarritoRep';

import VerListaEstadisticas from './Routes/Rep-general/VerListaEstadisticas';
import VerEstadisticas from './Routes/Representante/VerEstadisticas';

function App() {
  return (
    //Rutas del proyecto
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>

        <Route element={<DashBoardPage />}>  
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile/>} />

          <Route path='/mis-estadisticas' element={<VerEstadisticas/>}/>
          <Route path='/lista-estadisticas' element={<VerListaEstadisticas/>}/>
          
          <Route path='/realizar-venta' element={<RealizarVenta/>} />
          <Route path='/gestion-cliente' element={<GestionarCliente/>} />
          <Route path='/gestion-representante' element={<GestionarRepresentante/>} />
          <Route path='/gestion-clasificacion' element={<GestionarClasificacion/>} />
          <Route path='/gestion-inventario' element={<GestionarInventario/>} />

          <Route path='/ver-carrito' element={<GestionarCarritoRep/>} />

          <Route path='/gestion-representante-cliente' element={<GestionarRepCl/>} />
          <Route path='/ver-compras' element={<GestionarCompras/>} />
          <Route path='/ver-carrito-cliente' element={<GestionarCarritoCl/>} />
          <Route path='/realizar-compra' element={<RealizarCompraCl/>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
