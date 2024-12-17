import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('/recipes.json')
            .then(response => response.json())
            .then(data => setRecipes(data.recipes))
            .catch(error => console.error('Erreur de chargement des recettes:', error));
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (!query) {
            setSuggestions([]);
            return;
        }

        const filteredSuggestions = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query.toLowerCase()) ||
            recipe.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(query.toLowerCase())
            )
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSearchClick = () => {
        console.log('Recherche lancée pour :', searchQuery);
    };

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__container__logo">
                    <img src="/logo.svg" alt="Logo"/>
                </Link>
                <div className="header__container__search-bar">
                    <input
                        type="text"
                        placeholder="Rechercher une recette ou un ingrédient..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        aria-label="Rechercher une recette, un ingrédient..."
                    />
                    <button
                        className="search-icon-btn"
                        type="button"
                        aria-label="Lancer la recherche"
                        onClick={handleSearchClick}
                    >
                        <img src="/search.svg" alt="Logo de filtre"/>
                    </button>
                    {suggestions.length > 0 && searchQuery && (
                        <ul className="search-suggestions">
                            {suggestions.map(recipe => (
                                <li key={recipe.id}>
                                    <Link to={`/recipe/${recipe.id}`} className="suggestion-item">
                                        <img src={recipe.photo} alt={recipe.title}/>
                                        <span>{recipe.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="header__container__user-links">
                    <Link to={`/add-recipe`}>
                        <button className="add-recipe">Ajouter une recette</button>
                    </Link>
                    <Link to="/favorite">
                        <img src="/recipelike.svg" alt="Favoris"/>
                    </Link>
                    <Link to="/">
                        <img src="/user.svg" alt="Profil"/>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;