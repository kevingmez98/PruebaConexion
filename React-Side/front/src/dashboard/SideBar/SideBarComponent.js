import SideBarBtn from "./SideBarBtn";
import AccordionGroup from "./AccordionGroup";
import { faEnvelope, faPenNib, faHouse, faUser, faCircleUser, faCartShopping, faHandshake, faUsers, faWarehouse, faSignOut} from '@fortawesome/free-solid-svg-icons'
function SideBar() {
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
                        <SideBarBtn nombreBtn={"Realizar venta"} icon={faPenNib} route={"/realizar-venta"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Ver carrito"} icon={faCartShopping} route={"/ver-carrito"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar clientes"} icon={faUser} route={"/gestion-cliente"}></SideBarBtn>
                    </AccordionGroup>

                    <AccordionGroup icon={faCircleUser} nombreBtn={"Representante general"} nombreGrupo={"representante-general"}>
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
                    <SideBarBtn nombreBtn={"Cerrar sesión"} icon={faSignOut} route={"/"}></SideBarBtn>
                </li>
            </ul>
        </div>

    )
}

export default SideBar;