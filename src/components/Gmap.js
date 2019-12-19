import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const Marker = ({text}) => {
    return (
        <div style={{color: 'red'}}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span style={{fontWeight: 600}}>&nbsp;{text}</span>
        </div>
    )
}

const Gmap = (props) => {

    // google map default setting
    const [defaultProps, setDefaultProps] = useState({
        key: {
            key:"AIzaSyDQ9x7t1C1UCD0oZ-gi7I9GEQ1hED5P0Ck"
        },
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 1
    });

    const [markerComponent, setMarkerComponent] = useState(null);

    useEffect(() => {
        let meteoritesInfo = []
        props.meteorites.forEach((meteorite) => {
            if (meteorite.geolocation) {
                meteoritesInfo.push({
                    text: meteorite.name,
                    lat: meteorite.geolocation.coordinates[0],
                    lng: meteorite.geolocation.coordinates[1]
                });
            }
        });

        let markerComponent = meteoritesInfo.map((marker, idx) => {
            return (
                <Marker key={marker.text} lat={marker.lat} lng={marker.lng} text={marker.text} />
            )
        })

        setMarkerComponent(markerComponent);
    }, [props.meteorites]);

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={defaultProps.key}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {markerComponent}
        </GoogleMapReact>
      </div>
    );
}

export default Gmap;