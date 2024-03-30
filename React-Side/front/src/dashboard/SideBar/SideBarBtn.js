import {  Link  } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SideBarBtn({ nombreBtn, icon, route,active }) {

    let linkRoute = route ? route: "#";
    let boolActive = active ? "active":""; 
    return (
            <Link to={linkRoute} className={boolActive}>
             <FontAwesomeIcon icon={icon} />
            <span className="d-none d-sm-block d-none.d-sm-block">{nombreBtn}</span>
            </Link>
    )
}

export default SideBarBtn;