import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './FavoriteRecipes.scss';

const FavoriteRecipes = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavoriteRecipes(savedFavorites);
    }, []);

    const getTotalTime = (recipe) => {
        return recipe.prepTime.hours * 60 + recipe.prepTime.minutes + recipe.cookTime.hours * 60 + recipe.cookTime.minutes;
    };

    return (
        <div className="favorite-recipes">
            <h2>Recettes Favorites</h2>
            <div className="favorite-recipes__list">
                {favoriteRecipes.length === 0 ? (
                    <p>Aucune recette favorite.</p>
                ) : (
                    favoriteRecipes.map((recipe) => (
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavoriteRecipes;
