import Header from './Header';
import Body from './Body';

function CardComponent({ titulo, children }) {
    return (
        <div className="card card-login mx-auto text-center bg-dark">
            <Header titulo={titulo}></Header>
            <Body>
                {children}
            </Body>
        </div>

    )
}


export default CardComponent;