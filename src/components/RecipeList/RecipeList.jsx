import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './RecipeList.scss';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [filters, setFilters] = useState({
        type: [],
        portions: [],
        time: '',
        difficulty: [],
        cost: [],
        cookingMethod: [],
        country: [],
    });

    useEffect(() => {
        fetch('/recipes.json')
            .then((response) => response.json())
            .then((data) => {
                if (data.recipes && Array.isArray(data.recipes)) {
                    setRecipes(data.recipes);
                    setFilteredRecipes(data.recipes);
                } else {
                    console.error('Error: Data is not an array or contains `recipes` property');
                }
            })
            .catch((error) => console.error('Error loading recipes:', error));

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleFilterChange = (category, value) => {
        setFilters(prev => {
            const newFilters = {...prev};
            if (newFilters[category].includes(value)) {
                newFilters[category] = newFilters[category].filter(item => item !== value);
            } else {
                newFilters[category].push(value);
            }
            return newFilters;
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const applyFilters = () => {
        const filtered = recipes.filter((recipe) => {
            const matchesSearchQuery = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = !filters.type.length || filters.type.includes(recipe.type);
            const matchesPortions = !filters.portions.length || filters.portions.includes(recipe.portions.toString());
            const matchesTime = !filters.time || getTotalTime(recipe) <= parseInt(filters.time);
            const matchesDifficulty = !filters.difficulty.length || filters.difficulty.includes(recipe.difficulty);
            const matchesCost = !filters.cost.length || filters.cost.includes(recipe.cost.toString());
            const matchesCookingMethod = !filters.cookingMethod.length || filters.cookingMethod.includes(recipe.cookingMethod);
            const matchesCountry = !filters.country.length || filters.country.includes(recipe.country);

            return (
                matchesSearchQuery &&
                matchesType &&
                matchesPortions &&
                matchesTime &&
                matchesDifficulty &&
                matchesCost &&
                matchesCookingMethod &&
                matchesCountry
            );
        });

        setFilteredRecipes(filtered);
    };

    const getTotalTime = (recipe) => {
        return recipe.prepTime.hours * 60 + recipe.prepTime.minutes + recipe.cookTime.hours * 60 + recipe.cookTime.minutes;
    };

    const toggleFiltersVisibility = () => {
        setIsFiltersVisible(!isFiltersVisible);
    };

    const handleAddToFavorites = (recipe) => {
        const updatedFavorites = [...favorites];
        const recipeIndex = updatedFavorites.findIndex((fav) => fav.id === recipe.id);

        if (recipeIndex !== -1) {
            updatedFavorites.splice(recipeIndex, 1);
        } else {
            updatedFavorites.push(recipe);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (recipeId) => {
        return favorites.some((fav) => fav.id === recipeId);
    };

    return (
        <div className="list">
            <h2>Liste des recettes</h2>
            <div className="list__filter">
                <div className="list__filter__search">
                    <input
                        type="text"
                        placeholder="Rechercher une recette..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button onClick={applyFilters}>
                        <img src="/search.svg" alt="Logo de filtre"/>
                    </button>
                </div>

                <div className="list__filter__filters">
                    <button onClick={toggleFiltersVisibility}>
                        <img src="/filter.svg" alt="Logo de filtre"/>
                        {isFiltersVisible ? "Masquer les filtres" : "Filtrer par"}
                    </button>

                    {isFiltersVisible && (
                        <div className="list__filter__filters__options">
                            <div className="list__filter__filters__options--filter">
                                <span>
                                    <img src="/filter_categories.svg" alt="Logo de filtre"/>
                                    Catégorie
                                </span>
                                <div>
                                    {['Apéritif', 'Entrée', 'Plat principal', 'Accompagnement', 'Dessert', 'Boisson', 'Pain & viennoiserie'].map((type) => (
                                        <div className="checkbox" key={type}>
                                            <input
                                                type="checkbox"
                                                id={`type-${type}`}
                                                checked={filters.type.includes(type)}
                                                onChange={() => handleFilterChange('type', type)}
                                            />
                                            <label htmlFor={`type-${type}`}>{type}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="list__filter__filters__options--filter">
                                <span>
                                    <img src="/filter_portions.svg" alt="Logo de filtre"/>
                                    Nombre de portions
                                </span>
                                <div>
                                    {[1, 2, 4, 6].map((portions) => (
                                        <div className="checkbox" key={portions}>
                                            <input
                                                type="checkbox"
                                                id={`portions-${portions}`}
                                                checked={filters.portions.includes(portions.toString())}
                                                onChange={() => handleFilterChange('portions', portions.toString())}
                                            />
                                            <label htmlFor={`portions-${portions}`}>{portions} portion(s)</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="list__filter__filters__options--filter">
                                <span>
                                    <img src="/filter_time.svg" alt="Logo de filtre"/>
                                    Temps total
                                </span>
                                <input
                                    type="number"
                                    placeholder="Temps max"
                                    value={filters.time || ''}
                                    onChange={(e) => setFilters(prev => ({...prev, time: e.target.value}))}
                                />
                            </div>

                            <div className="list__filter__filters__options--filter">
                                <span>
                                    <img src="/filter_difficulty.svg" alt="Logo de filtre"/>
                                    Difficulté
                                </span>
                                <div>
                                    {[1, 2, 3].map((difficulty) => (
                                        <div className="checkbox" key={difficulty}>
                                            <input
                                                type="checkbox"
                                                id={`difficulty-${difficulty}`}
                                                checked={filters.difficulty.includes(difficulty)}
                                                onChange={() => handleFilterChange('difficulty', difficulty)}
                                            />
                                            <label htmlFor={`difficulty-${difficulty}`}>Niveau {difficulty}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="list__filter__filters__options--filter">
                                <span>
                                    <img src="/filter_cost.svg" alt="Logo de filtre"/>
                                    Coût
                                </span>
                                <div>
                                    {[1, 2, 3, 4].map((cost) => (
                                        <div className="checkbox" key={cost}>
                                            <input
                                                type="checkbox"
                                                id={`cost-${cost}`}
                                                checked={filters.cost.includes(cost.toString())}
                                                onChange={() => handleFilterChange('cost', cost.toString())}
                                            />
                                            <label htmlFor={`cost-${cost}`}>
                                                {cost === 1 ? "€" : cost === 2 ? "€€" : cost === 3 ? "€€€" : "€€€€"}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="list__filter__filters__options--filter">
                                <span>
                                    <img src="/filter_cookMethod.svg" alt="Logo de filtre"/>
                                    Méthode de cuisson
                                </span>
                                <div>
                                    {['Four', 'Poêle', 'Vapeur', 'Friture', 'Wok', 'Réfrigération', 'Grillade', 'Bain-marie', 'AirFryer', 'Mijoter'].map((method) => (
                                        <div className="checkbox" key={method}>
                                            <input
                                                type="checkbox"
                                                id={`method-${method}`}
                                                checked={filters.cookingMethod.includes(method)}
                                                onChange={() => handleFilterChange('cookingMethod', method)}
                                            />
                                            <label htmlFor={`method-${method}`}>{method}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="list__filter__filters__options--filter">
                                <span>
                                    <img src="/filter_country.svg" alt="Logo de filtre"/>
                                    Pays
                                </span>
                                <div>
                                    {['Global', 'France', 'Italie', 'Espagne', 'États-Unis', 'Mexique', 'Maroc', 'Inde', 'Norvège', 'Grèce', 'Liban', 'Japon', 'Pérou'].map((country) => (
                                        <div className="checkbox" key={country}>
                                            <input
                                                type="checkbox"
                                                id={`country-${country}`}
                                                checked={filters.country.includes(country)}
                                                onChange={() => handleFilterChange('country', country)}
                                            />
                                            <label htmlFor={`country-${country}`}>{country}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <button onClick={applyFilters}>
                        <img src="/check.svg" alt="Logo de filtre"/>
                        Appliquer les filtres
                    </button>
                </div>
            </div>


            <div className="list__card">
                {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe__card">
                        <Link to={`/recipe/${recipe.id}`} className="recipe__card__details-link">
                            <div className="recipe__card">
                                <div className="recipe__card--img">
                                    <img src={recipe.photo} alt={recipe.title}/>
                                </div>
                                <div className="recipe__card--tittle">
                                    <h3>{recipe.title}</h3>
                                </div>
                                <div className="recipe__card__info">
                                    <div className="recipe__card__info--time">
                                        <img src="/timeee.svg" alt="Logo de temps"/>
                                        <span>{getTotalTime(recipe)}</span>
                                    </div>
                                    <div className="recipe__card__info--portions">
                                        <img src="/portions.svg" alt="Logo de portions"/>
                                        <span>{recipe.portions}</span>
                                    </div>
                                    <div className="recipe__card__info--difficulty">
                                        {Array.from({length: recipe.difficulty}).map((_, index) => (
                                            <img
                                                key={`difficulty-color-${index}`}
                                                src="/difficulty_r.svg"
                                                alt={`Difficulté ${index + 1}`}
                                            />
                                        ))}
                                        {Array.from({length: 3 - recipe.difficulty}).map((_, index) => (
                                            <img
                                                key={`difficulty-gray-${index}`}
                                                src="/difficulty.svg"
                                                alt={`Difficulté ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="recipe__card__info--cost">
                                        {Array.from({length: recipe.cost}).map((_, index) => (
                                            <img key={`cost-${index}`} src="/price.svg" alt="Logo de prix"/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="recipe__card__bookmark">
                            <button onClick={() => handleAddToFavorites(recipe)}>
                                <img
                                    src={isFavorite(recipe.id) ? "/favorite_r.svg" : "/favorite.svg"}
                                    alt={isFavorite(recipe.id) ? "Recette favorite" : "Ajouter aux favoris"}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;