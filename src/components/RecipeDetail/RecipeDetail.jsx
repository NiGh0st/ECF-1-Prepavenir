import {useState} from "react";
import './RecipeDetail.scss';

const RecipeDetail = ({recipe}) => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const addToFavorites = (recipe) => {
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
        <div className="recipe-detail">
            <h2 className="recipe-detail__title">Détails de la recette</h2>
            <div className="recipe-detail__content">
                <div className="recipe-detail__header">
                    <div className="recipe-detail__image">
                        <img
                            src={recipe.photo}
                            alt={recipe.title}
                            className="recipe-detail__image--img"
                        />
                    </div>
                    <div className="recipe-detail__info">
                        <h3 className="recipe-detail__info--title">{recipe.title}</h3>
                        <div className="recipe-detail__info--details">
                            <span>
                                <img src="/portions.svg" alt="Portions"/>
                                <p>
                                    <strong>Pour</strong><br/>
                                    {recipe.portions}
                                </p>
                            </span>
                            <span>
                                <img src="/difficulty.svg" alt="Difficulté"/>
                                <p>
                                    <strong>Difficulté</strong><br/>
                                    {recipe.difficulty}
                                </p>
                            </span>
                            <span>
                                <img src="/cookPrep.svg" alt="Préparation"/>
                                <p>
                                    <strong>Préparation</strong><br/>
                                    {recipe.prepTime.hours}h {recipe.prepTime.minutes}m
                                </p>
                            </span>
                            <span>
                                <img src="/cookCuisson.svg" alt="Cuisson"/>
                                <p>
                                    <strong>Cuisson</strong><br/>
                                    {recipe.cookTime.hours}h {recipe.cookTime.minutes}m
                                </p>
                            </span>
                            <span>
                                <img src="/plate.svg" alt="Type de plat"/>
                                <p>
                                    <strong>Type de plat</strong><br/>
                                    {recipe.type}
                                </p>
                            </span>
                            <span>
                                <p>
                                    <strong>Coût</strong><br/>
                                    {Array.from({length: recipe.cost}).map((_, index) => (
                                        <img key={`cost-${index}`} src="/price.svg" alt="Logo de prix"/>
                                    ))}
                                </p>
                            </span>
                        </div>

                        <div className="recipe-detail__info--bookmark">
                            <button onClick={() => addToFavorites(recipe)}>
                                <img
                                    src={isFavorite(recipe.id) ? "/favorite_r.svg" : "/favorite.svg"}
                                    alt={isFavorite(recipe.id) ? "Recette favorite" : "Ajouter aux favoris"}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="recipe-detail__body">
                    <div className="recipe-detail__ingredients">
                        <h4>Ingrédients</h4>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="recipe-detail__steps">
                        <h4>Étapes</h4>
                        <ol>
                            {recipe.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;