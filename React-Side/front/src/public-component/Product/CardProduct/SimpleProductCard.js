import SimpleCard from "../../Card/SimpleCard/SimpleCard";

function SimpleProductCard({ nomProducto, idProd, precio, children }) {
   return( 
   <SimpleCard header={nomProducto} title={precio}>
        {children}
    </SimpleCard>)
}

export default SimpleProductCard;