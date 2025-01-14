import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AccordionGroup({ nombreBtn, icon, nombreGrupo, children }) {

    return (
        <div>
            <a href="#" data-bs-toggle="collapse" data-bs-target={"#" + nombreGrupo} aria-expanded="false"
                aria-controls={nombreGrupo}>
                <FontAwesomeIcon icon={icon} />
                <span className="d-none d-sm-block d-none.d-sm-block">{nombreBtn}</span>
            </a>

            <div className="accordion-item subnavi">
                <div id={nombreGrupo} className="accordion-collapse collapse">
                    <div className="accordion-body">
                        <ul>

                            {/* Renderiza los hijos como elementos de lista */}
                            {React.Children.map(children, (child, index) => (
                               
                               <li key={index}>{child}</li>
                               
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccordionGroup;