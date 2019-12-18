import React, {useState, useEffect} from 'react';
import Meteorites from '../components/Meteorites';
import {Form, Button} from 'react-bootstrap'

const containerStyle = {
    margin: "10px"
}

const MeteoritesContainer = (props) => {

    const [sortBy, setSortBy] = useState('none');
    const [meteorites, setMeteorites] = useState(props.meteorites);

    useEffect(() => {
        setMeteorites(props.meteorites);
    }, [props.meteorites]);
    
    const sortByMass = () => {
        setMeteorites(prevMeteorites => {
            return [...prevMeteorites].sort((a,b) => {
                let aMass = parseInt(a.mass);
                let bMass = parseInt(b.mass);
                if (aMass > bMass) {
                    return 1;
                } else {
                    return -1;
                }
            })
        });
    };


    return (
        <div style={containerStyle}>
            <Button variant="success" onClick={sortByMass}>Sort By mass</Button>
            <Meteorites meteorites={meteorites}/>
        </div>
    )
}

export default MeteoritesContainer;