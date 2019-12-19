import React, {useState, useEffect} from 'react';
import Meteorites from '../components/Meteorites';
import {Button} from 'react-bootstrap'
import Gmap from '../components/Gmap';

const containerStyle = {
    margin: "10px"
}

const MeteoritesContainer = (props) => {

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
            <Gmap  meteorites={meteorites}/>
            <Button variant="success" onClick={sortByMass} style={{margin:"10px"}}>Sort By mass</Button>
            <Meteorites meteorites={meteorites}/>
        </div>
    )
}

export default MeteoritesContainer;