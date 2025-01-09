import React, { useEffect, useState } from 'react';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch('/api/favorites')
            .then((response) => response.json())
            .then((data) => setFavorites(data))
            .catch((error) => console.error('Error fetching favorites:', error));
    }, []);

    return (
        <div>
            <h1>Favorites</h1>
            <ul>
                {favorites.map((fav) => (
                    <li key={fav._id}>
                        {fav.title} by {fav.author}{' '}
                        <button onClick={() => removeFavorite(fav._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    function removeFavorite(id) {
        fetch(`/api/favorites/${id}`, { method: 'DELETE' })
            .then(() => setFavorites(favorites.filter((fav) => fav._id !== id)))
            .catch((error) => console.error('Error deleting favorite:', error));
    }
}

export default Favorites;
