import CardComponent from "../public-component/Card/CardComponent";
function Profile() {
    return (
        <CardComponent titulo={"Perfil"}>
            <div className="p-3 mb-2 bg-success text-white">Cambio a perfil</div>
        </CardComponent>
    )
}

export default Profile;