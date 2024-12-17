import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeDetail from '../../components/RecipeDetail/RecipeDetail'; // Import du composant de détail

const Recipe = () => {
    const { id } = useParams(); // Récupère l'ID de la recette depuis l'URL
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        // Charger les recettes et filtrer par ID
        fetch('/recipes.json')
            .then(response => response.json())
            .then(data => {
                const foundRecipe = data.recipes.find(recipe => recipe.id === id);
                setRecipe(foundRecipe);
            })
            .catch(error => console.error('Error loading recipe:', error));
    }, [id]);

    if (!recipe) {
        return <div>Chargement...</div>; // Afficher un message pendant le chargement
    }

    return (
        <div>
            <RecipeDetail recipe={recipe} />
        </div>
    );
};

export default Recipe;
