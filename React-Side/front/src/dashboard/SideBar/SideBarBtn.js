function SideBarBtn({ nombreBtn, icon, route,active }) {

    let linkRoute = route ? route: "#";
    let boolActive = active ? "active":""; 

    return (
        <a href={linkRoute} className={boolActive}>
            <i className={icon} aria-hidden="true"></i>
            <span className="d-none d-sm-block d-none.d-sm-block">{nombreBtn}</span>
        </a>
    )
}

export default SideBarBtn;