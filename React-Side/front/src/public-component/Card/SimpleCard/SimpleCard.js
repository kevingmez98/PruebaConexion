
import Body from '../CommonComponent/Body';
import SimpleHeader from './SimpleHeader';

function SimpleCard({ header, children, title }) {
    return (
        <div className="card mx-auto text-center simple-card">
            <SimpleHeader titulo={header}/>
            <Body>
            <h5 className="card-title">{title}</h5>
                {children}
            </Body>
        </div>

    )
}


export default SimpleCard;