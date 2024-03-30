import SideBarBtn from "./SideBarBtn";
import AccordionGroup from "./AccordionGroup";
import { faEnvelope, faPenNib } from '@fortawesome/free-solid-svg-icons'
function SideBar() {
    return (
        <div className="navi">
            <ul>
                <li>
                    <SideBarBtn nombreBtn={"Inicio"} icon={faPenNib} route={"/home"}></SideBarBtn>
                </li>
                <li>
                    <SideBarBtn nombreBtn={"Perfil"} icon={faEnvelope} route={"/profile"}></SideBarBtn>
                </li>
                <li>        
                    <AccordionGroup icon={faEnvelope} nombreBtn={"Representante de ventas"} nombreGrupo={"representante-ventas"}>
                        <SideBarBtn nombreBtn={"Realizar venta"} icon={faPenNib} route={"/realizar-venta"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar clientes"} icon={faPenNib} route={"/gestion-cliente"}></SideBarBtn>
                    </AccordionGroup>

                    <AccordionGroup icon={faEnvelope} nombreBtn={"Representante general"} nombreGrupo={"representante-general"}>
                        <SideBarBtn nombreBtn={"Realizar venta"} icon={faEnvelope} route={"/realizar-venta"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar clientes"} icon={faEnvelope} route={"/gestion-cliente"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar representantes"} icon={faEnvelope} route={"/gestionrepresentante"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar clasificación representantes"} icon={faEnvelope} route={"/gestionclasificacion"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Gestionar inventario"} icon={faEnvelope} route={"/gestion-inventario"}></SideBarBtn>
                    </AccordionGroup>

                    <AccordionGroup icon={faEnvelope} nombreBtn={"Cliente"} nombreGrupo={"cliente"}>
                        <SideBarBtn nombreBtn={"Gestión del representante"} icon={faEnvelope} route={"/gestionrepresentante-cliente"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Ver mis compras"} icon={faEnvelope} route={"/ver-compras"}></SideBarBtn>
                        <SideBarBtn nombreBtn={"Ver carrito"} icon={faEnvelope} route={"/ver-carrito"}></SideBarBtn>
                    </AccordionGroup>
                </li>
                <li>
                    <SideBarBtn nombreBtn={"Cerrar sesión"} icon={faEnvelope} route={"/"}></SideBarBtn>
                </li>
            </ul>
        </div>

    )
}

export default SideBar;