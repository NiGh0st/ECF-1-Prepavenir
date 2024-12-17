import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeDetail from '../../components/RecipeDetail/RecipeDetail';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch('/recipes.json')
            .then(response => response.json())
            .then(data => {
                const foundRecipe = data.recipes.find(recipe => recipe.id === id);
                setRecipe(foundRecipe);
            })
            .catch(error => console.error('Error loading recipe:', error));
    }, [id]);

    if (!recipe) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <RecipeDetail recipe={recipe} />
        </div>
    );
};

export default Recipe;