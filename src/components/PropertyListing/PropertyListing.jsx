import React, { useEffect, useState } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';
import {API_URL} from "../../constants/apiConstants";

const PropertyListing = () => {
    const [listings, setListings] = useState([]);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        fetch(`${API_URL}/properties`)
            .then((res) => res.json())
            .then((json) => setListings(json))
            .catch((err) => setErrorMessage(err.message));
    }, []);

    const placeholder = errorMessage ? <div>Error</div> : <div>Loading</div>;

    return (
        <ul className="PropertyListing">
            {listings
                ? listings.map((property, index) => (
                    <li key={index}>
                        <PropertyCard {...property} />
                    </li>
                ))
                : placeholder}
        </ul>
    );
};

export default PropertyListing;
