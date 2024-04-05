import CardComponent from "../public-component/Card/DarkCard/CardComponent";
function Home() {
    return (
        <CardComponent titulo={"Home"}>
           <div className="p-3 mb-2 bg-info text-white">Cambio a home</div>
        </CardComponent>
    )
}

export default Home;