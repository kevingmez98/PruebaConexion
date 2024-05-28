import SideBarBtn from "./SideBarBtn";
import AccordionGroup from "./AccordionGroup";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { eliminarCarrito } from '../../public-component/Product/Carrito/CarritoSession';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartPie, faChartBar, faPenNib, faHouse, faUser, faCircleUser, faCartShopping,
    faHandshake, faUsers, faWarehouse, faSignOut
} from '@fortawesome/free-solid-svg-icons'
function SideBar() {

    // Función para cerrar sesión
    const handleCerrarSesion = async () => {
        try {
            // Si la petición se realiza con éxito, Elimina el sessionstorage
            window.sessionStorage.removeItem("Serial");

            //Se elimina el carrito
            eliminarCarrito();
            // Realiza la petición para cerrar sesión
            await peticionCierre();

        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la petición
            console.error("Error al cerrar sesión:", error);
        }
    };

    //Peticion para cerrar la sesion        
    var peticionCierre = async () => {
      await Axios.post('http://localhost:8080/Login/cerrarsesion', {}, {
        "Serial": window.sessionStorage.getItem("Serial") 
      });
    };
    return (
        <div className="navi">
            <ul>
                <li>
                    <SideBarBtn nombreBtn={"Inicio"} icon={faHouse} route={"/home"}></SideBarBtn>
                </li>
                <li>
                    <SideBarBtn nombreBtn={"Perfil"} icon={faUser} route={"/profile"}></SideBarBtn>
                </li>
                <li>
                    <AccordionGroup icon={faCircleUser} nombreBtn={"Representante de ventas"} nombreGrupo={"representante-ventas"}>
                        <SideBarBtn nombreBtn={"Mis estadisticas"} icon={faChartBar} route={"/mis-estadisticas"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Realizar venta"} icon={faPenNib} route={"/realizar-venta"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Ver carrito"} icon={faCartShopping} route={"/ver-carrito"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar clientes"} icon={faUser} route={"/gestion-cliente"}></SideBarBtn>
                    </AccordionGroup>

                    <AccordionGroup icon={faCircleUser} nombreBtn={"Representante general"} nombreGrupo={"representante-general"}>
                        <SideBarBtn nombreBtn={"Estadisticas representantes"} icon={faChartPie} route={"/lista-estadisticas"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Realizar venta"} icon={faPenNib} route={"/realizar-venta"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar clientes"} icon={faUser} route={"/gestion-cliente"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar representantes"} icon={faUsers} route={"/gestion-representante"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar clasificación representantes"} icon={faHandshake} route={"/gestion-clasificacion"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar inventario"} icon={faWarehouse} route={"/gestion-inventario"}></SideBarBtn>
                    </AccordionGroup>

                    <AccordionGroup icon={faCircleUser} nombreBtn={"Cliente"} nombreGrupo={"cliente"}>
                        <SideBarBtn nombreBtn={"Gestión del representante"} icon={faHandshake} route={"/gestion-representante-cliente"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Ver mis compras"} icon={faWarehouse} route={"/ver-compras"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Realizar compra"} icon={faPenNib} route={"/realizar-compra"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Ver carrito"} icon={faCartShopping} route={"/ver-carrito-cliente"}></SideBarBtn>
                    </AccordionGroup>
                </li>
                <li>
                    <Link to={"/"} onClick={handleCerrarSesion}>
                        <FontAwesomeIcon icon={faSignOut} />
                        <span className="d-none d-sm-block d-none.d-sm-block">Cerrar sesión</span>
                    </Link>
                </li>
            </ul>
        </div>

    )
}

export default SideBar;