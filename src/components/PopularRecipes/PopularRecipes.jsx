import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./PopularRecipes.scss";

const PopularRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/recipes.json')
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data.recipes);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des recettes : ", error);
                setIsLoading(false);
            });
    }, []);

    const popularRecipes = recipes.slice(75, 85);

    return (
        <div className="popular__recipes">
            <h2>Recettes Populaires</h2>
            {isLoading ? (
                <p>Chargement des recettes...</p>
            ) : (
                <div className="popular__recipes__list">
                    {popularRecipes.map((recipe) => (
                        <Link to={`/recipe/${recipe.id}`}>
                            <div key={recipe.id} className="popular__recipe">
                                <img src={recipe.photo} alt={recipe.title} className="popular__recipe--photo"/>
                                <p className="popular__recipe--title">{recipe.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularRecipes;