import React, { useState, useEffect } from 'react';

export function Doo() {
    const [text, setText] = useState('HELLOOOOOOOOO WOOOOOORLD');

    useEffect(() => {
        const interval = setInterval(() => {
            setText(prevText => prevText === 'HELLOOOOOOOOO WOOOOOORLD' ? 'Hello again!' : 'HELLOOOOOOOOO WOOOOOORLD');
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    return (
        <div>
            <p>hi</p>
            <h1>{text}</h1>
        </div>
    );
}

export default Doo;
