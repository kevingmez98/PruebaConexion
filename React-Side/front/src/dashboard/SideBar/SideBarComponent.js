import SideBarBtn from "./SideBarBtn";
import AccordionGroup from "./AccordionGroup";
function SideBar(){
   return(
        <div className="navi">
            <ul>
                <li>
                    <SideBarBtn nombreBtn={"Inicio"} icon={"fa fa-home"} route={"/home"}></SideBarBtn>
                </li>
                <li>
                    <AccordionGroup icon={"fa fa-home"} nombreBtn={"Grupo 1"} nombreGrupo={"Funcion-1"}>
                        <SideBarBtn nombreBtn={"Hijo 1"} icon={"fa fa-home"}></SideBarBtn>   
                        <SideBarBtn nombreBtn={"Hijo 2"} icon={"fa fa-home"}></SideBarBtn>    
                    </AccordionGroup> 
                </li>
            </ul>
        </div>

   )
}

export default SideBar;