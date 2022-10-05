import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'

const GpsInfo = (props) => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

    function handleError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setError(err.message);
    }

    function handleSuccess(pos) {
        console.log(pos);
        setPosition(pos.coords);
    }

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
        navigator.geolocation.watchPosition(handleSuccess, handleError, options);
        console.log(props);
    }, [props])

    const addPoint = (e) => {
        console.log("addPoint()");
        props.add(
            {
                id: nanoid(),
                text: "Lat: " + position.latitude + ", Long: " + position.longitude,
                complete: false,
            }
        )
    }
    

    const renderGpsInfo = () => {
        if (position) {
            return <div id="gpsInfo" onClick={addPoint.bind(this)}>
                Lat: {position.latitude}, Long: {position.longitude}
                </div>
        } else if (error) {
            return <div>{error}</div>
        } else {
            return <div>Loading ...</div>
        }
    }

    return (
        <>
        {renderGpsInfo()}
       </>
    )
}

export default GpsInfo;