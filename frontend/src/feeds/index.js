import React, { useState, useEffect } from "react";
import "./feed.style.css";
import { fetchAllFeeds } from '../api'

export const FeedCard = ({ user }) => {
    const [feeds, setFeeds] = useState([]);

    const fetchFeeds = async () => {
        try {
            const allFeeds = await fetchAllFeeds();
            if (allFeeds.status === 200)
            setFeeds(allFeeds.data.feeds);
        } catch (error) {
            console.log('first')
        }
    }

    useEffect(() => {
        try {
            fetchFeeds();
        } catch (error) {
            console.log('first')
        }
    }, []);
    return (
        feeds.map(p => {
            return (
                <a className="product-card" href="#dolce-gabbana-cropped">
                    <img className="product-card__image" src={p.images[0]} />
                    <p className="product-card__brand">{p.title}</p>
                    <p className="product-card__description">{p.description}</p>
                    <p className="product-card__price">Price: {p.price} $</p>
                </a>
            )
        })
    );
};
