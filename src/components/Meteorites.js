import React from 'react';
import {Card} from 'react-bootstrap';

const Meteorites = (props) => {

    let meteoritesComponent = props.meteorites.map((meteorite, idx) => {
        return (
            <Card key={meteorite.id}>
                <Card.Body>
                    <Card.Title>{meteorite.name}</Card.Title>
                    <Card.Text>
                        Mass: {meteorite.mass} <br/>
                        Recclass: {meteorite.recclass}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    });

    return (
        <React.Fragment>
            {meteoritesComponent}
        </React.Fragment>
    )
}

export default Meteorites;