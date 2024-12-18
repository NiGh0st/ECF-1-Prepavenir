import {useState} from 'react';
import './RecipeForm.scss';

const RecipeForm = () => {
    const [step, setStep] = useState(1);
    const [recipeData, setRecipeData] = useState({
        title: "", type: "", portions: "", prepTime: {hours: "", minutes: ""}, cookTime: {hours: "", minutes: ""},
        cookingMethod: "", difficulty: "", cost: "", photo: "", ingredients: [{name: '', quantity: '', unit: ''}], steps: [''],
    });

    const nextStep = () => setStep(prevStep => prevStep + 1);
    const prevStep = () => setStep(prevStep => prevStep - 1);

    const inputChange = (e) => {
        const {name, value} = e.target;
        if (name === 'title') {
            setTitleError(value.length < 3);
        }
        setRecipeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const prepTimeChange = (e) => {
        const {name, value} = e.target;
        setRecipeData(prevData => ({
            ...prevData,
            prepTime: {
                ...prevData.prepTime,
                [name]: value,
            },
        }));
    };

    const cookTimeChange = (e) => {
        const {name, value} = e.target;
        setRecipeData(prevData => ({
            ...prevData,
            cookTime: {
                ...prevData.cookTime,
                [name]: value,
            },
        }));
    };

    const [titleError, setTitleError] = useState(false);
    const [ingredientError, setIngredientError] = useState(false);
    const [stepError, setStepError] = useState(false);

    const addIngredient = () => {
        const lastIngredient = recipeData.ingredients[recipeData.ingredients.length - 1];

        if (lastIngredient.name && lastIngredient.quantity && lastIngredient.unit) {
            setRecipeData(prevData => ({
                ...prevData,
                ingredients: [...prevData.ingredients, {name: '', quantity: '', unit: ''}],
            }));
            setIngredientError(false);
        } else {
            setIngredientError(true);
        }
    };

    const removeIngredient = (index) => {
        const newIngredients = recipeData.ingredients.filter((_, i) => i !== index);
        setRecipeData(prevData => ({
            ...prevData,
            ingredients: newIngredients,
        }));
    };

    const ingredientChange = (e, index) => {
        const {name, value} = e.target;
        const newIngredients = [...recipeData.ingredients];
        newIngredients[index][name] = value;
        setRecipeData(prevData => ({
            ...prevData,
            ingredients: newIngredients,
        }));
    };


    const addStep = () => {
        const lastStep = recipeData.steps[recipeData.steps.length - 1];

        if (lastStep.trim() !== '') {
            setRecipeData(prevData => ({
                ...prevData,
                steps: [...prevData.steps, ''],
            }));
            setStepError(false);
        } else {
            setStepError(true);
        }
    };

    const removeStep = (index) => {
        const newSteps = recipeData.steps.filter((_, i) => i !== index);
        setRecipeData(prevData => ({
            ...prevData,
            steps: newSteps,
        }));
    };

    const stepChange = (e, index) => {
        const {value} = e.target;
        const newSteps = [...recipeData.steps];
        newSteps[index] = value;
        setRecipeData(prevData => ({
            ...prevData,
            steps: newSteps,
        }));
    };

    const isStep1Valid = () => {
        return (
            recipeData.title.length >= 3 && recipeData.type && recipeData.portions && recipeData.prepTime.hours &&
            recipeData.prepTime.minutes && recipeData.cookTime.hours && recipeData.cookTime.minutes &&
            recipeData.cookingMethod && recipeData.difficulty && recipeData.cost && recipeData.photo
        );
    };

    const isStep2Valid = () => {
        const ingredientsValid = recipeData.ingredients.every(
            ingredient => ingredient.name && ingredient.quantity && ingredient.unit
        );

        const stepsValid = recipeData.steps.every(
            step => step.trim() !== ''
        );

        return ingredientsValid && stepsValid;
    };


    const submitForm = () => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        storedRecipes.push(recipeData);

        localStorage.setItem('recipes', JSON.stringify(storedRecipes));

        console.log('Recette ajoutée:', recipeData);

        setRecipeData({
            title: "",
            type: "",
            portions: "",
            prepTime: { hours: "", minutes: "" },
            cookTime: { hours: "", minutes: "" },
            cookingMethod: "",
            difficulty: "",
            cost: "",
            photo: "",
            ingredients: [{ name: '', quantity: '', unit: '' }],
            steps: [''],
        });

        setStep(1);
    };

    return (
        <div className="recipe-form">
            <h1 className="recipe-form__title">Ajouter une recette</h1>
            <h4 className="recipe-form__subtitle">Les informations que vous fournirez permettront aux autres
                utilisateurs de trouver facilement votre recette en fonction de leurs préférences et de leurs
                attentes.</h4>
            {step === 1 && (
                <div className="recipe-form__step--1">
                    <h2 className="recipe-form__step--title">Étape 1 : Informations de base</h2>
                    <label className="recipe-form__label">
                        Nom de la recette
                        <input
                            type="text"
                            name="title"
                            placeholder="Nom de votre recette"
                            minLength="3"
                            value={recipeData.title}
                            onChange={inputChange}
                            className="recipe-form__input"
                        />
                        {titleError && (
                            <p className="error-message">Le titre doit faire minimum 3 caractères.</p>
                        )}
                    </label>

                    <div className="recipe-form__option">
                        <label className="recipe-form__label">Type de plat</label>
                        <div className="recipe-form__grid-buttons">
                            {[
                                {label: 'Petit-Déjeuner', icon: '/iconBreakfast.svg'},
                                {label: 'Apéritif', icon: '/iconAppetizer.svg'},
                                {label: 'Entrée', icon: '/iconStarter.svg'},
                                {label: 'Plat principal', icon: "/iconDishes.svg"},
                                {label: 'Accompagnement', icon: "/iconAccompaniment.svg"},
                                {label: 'Dessert', icon: "/iconDessert.svg"},
                                {label: 'Boisson', icon: "/iconDrinks.svg"},
                                {label: 'Pain & viennoiserie', icon: "/iconBread.svg"}
                            ].map(({label, icon}) => (
                                <button
                                    key={label}
                                    className={`recipe-form__grid-button ${recipeData.type === label ? 'recipe-form__grid-button--selected' : ''}`}
                                    onClick={() => setRecipeData({...recipeData, type: label})}
                                >
                                    <img src={icon} alt={label} className="recipe-form__grid-button-icon"/>
                                    <span className="recipe-form__grid-button-text">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="recipe-form__label">
                        Nombre de portions
                        <input
                            type="number"
                            name="portions"

                            min="1" max="20"
                            placeholder="1-20 portions"
                            value={recipeData.portions}
                            onChange={inputChange}
                            className="recipe-form__input"
                        />
                    </label>

                    <div className="recipe-form__time-inputs">
                        <span>Temps de préparation</span>
                        <label className="recipe-form__label">
                            Heures
                            <input
                                type="number"
                                name="hours"
                                min="0" max="10"
                                placeholder="0-10 heures"
                                value={recipeData.prepTime.hours}
                                onChange={prepTimeChange}
                                className="recipe-form__input"
                            />
                        </label>
                        <span>:</span>
                        <label className="recipe-form__label">
                            Minutes
                            <input
                                type="number"
                                name="minutes"
                                min="0" max="60"
                                placeholder="0-60 minutes"
                                value={recipeData.prepTime.minutes}
                                onChange={prepTimeChange}
                                className="recipe-form__input"
                            />
                        </label>
                    </div>

                    <div className="recipe-form__time-inputs">
                        <span>Temps de cuisson</span>
                        <label className="recipe-form__label">
                            Heures
                            <input
                                type="number"
                                name="hours"
                                min="0" max="10"
                                placeholder="0-10 heures"
                                value={recipeData.cookTime.hours}
                                onChange={cookTimeChange}
                                className="recipe-form__input"
                            />
                        </label>
                        <span>:</span>
                        <label className="recipe-form__label">
                            Minutes
                            <input
                                type="number"
                                name="minutes"
                                min="0" max="60"
                                placeholder="0-60 minutes"
                                value={recipeData.cookTime.minutes}
                                onChange={cookTimeChange}
                                className="recipe-form__input"
                            />
                        </label>
                    </div>

                    <div className="recipe-form__cooking-method">
                        <label className="recipe-form__label">Type de cuisson</label>
                        <div className="recipe-form__grid-buttons cookingMethod">
                            {[
                                {label: 'Four', icon: "/iconFour.svg"},
                                {label: 'Poêle', icon: "/iconPoele.svg"},
                                {label: 'Vapeur', icon: "/iconVapeur.svg"},
                                {label: 'Friture', icon: "/iconFriteuse.svg"},
                                {label: 'Wok', icon: "/iconWok.svg"},
                                {label: 'Réfrigération', icon: "/iconFrigo.svg"},
                                {label: 'Grillade', icon: "/iconGrill.svg"},
                                {label: 'Bain-marie', icon: "/iconBain.svg"},
                                {label: 'AirFryer', icon: "/iconAir.svg"},
                                {label: 'Mijoter', icon: "/iconMijoter.svg"}
                            ].map(({label, icon}) => (
                                <button
                                    key={label}
                                    className={`recipe-form__grid-button ${recipeData.cookingMethod === label ? 'recipe-form__grid-button--selected' : ''}`}
                                    onClick={() => setRecipeData({...recipeData, cookingMethod: label})}
                                >
                                    <img src={icon} alt={label} className="recipe-form__grid-button-icon"/>
                                    <span className="recipe-form__grid-button-text">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="recipe-form__difficulty">
                        <label className="recipe-form__label">Difficulté</label>
                        <div className="recipe-form__grid-selection">
                            {[1, 2, 3].map((level) => (
                                <button
                                    key={level}
                                    className={`recipe-form__grid-select ${recipeData.difficulty >= level ? 'recipe-form__grid-select--selected' : ''}`}
                                    onClick={() => setRecipeData({...recipeData, difficulty: level})}
                                >
                                    <img
                                        src={recipeData.difficulty >= level ? '/difficulty_r.svg' : '/difficulty.svg'}
                                        alt={`Difficulté ${level}`}
                                        className="recipe-form__point"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="recipe-form__cost">
                        <label className="recipe-form__label">Coût</label>
                        <div className="recipe-form__grid-selection">
                            {[1, 2, 3, 4].map((cost) => (
                                <button
                                    key={cost}
                                    className={`recipe-form__grid-select ${recipeData.cost >= cost ? 'recipe-form__grid-select--selected' : ''}`}
                                    onClick={() => setRecipeData({...recipeData, cost})}
                                >
                                    <img
                                        src={recipeData.difficulty >= cost ? '/price.svg' : '/price.svg'}
                                        alt={`Coût ${cost}`}
                                        className="recipe-form__point"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="recipe-form__photo">
                        <label className="recipe-form__label">Photo</label>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setRecipeData((prevData) => ({
                                ...prevData,
                                photo: e.target.files[0],
                            }))}
                            className="recipe-form__input"
                        />
                    </div>

                    <button
                        onClick={nextStep}
                        disabled={!isStep1Valid()}
                        className="recipe-form__button"
                    >
                        Suivant
                    </button>

                </div>
            )}

            {step === 2 && (
                <div className="recipe-form__step--2">
                    <h2 className="recipe-form__step-title">Étape 2 : Ingrédients et étapes</h2>

                    <div className="recipe-form__ingredients">
                        <label className="recipe-form__label">Ingrédients</label>
                        {recipeData.ingredients.map((ingredient, index) => (
                            <div key={index} className="recipe-form__ingredient">
                                <input
                                    type="text"
                                    name="name"
                                    value={ingredient.name}
                                    onChange={(e) => ingredientChange(e, index)}
                                    placeholder="Nom de l'ingrédient"
                                    className="recipe-form__input"
                                    required
                                />
                                <input
                                    type="number"
                                    name="quantity"
                                    value={ingredient.quantity}
                                    onChange={(e) => ingredientChange(e, index)}
                                    placeholder="Quantité"
                                    className="recipe-form__input"
                                    required
                                />
                                <input
                                    type="text"
                                    name="unit"
                                    value={ingredient.unit}
                                    onChange={(e) => ingredientChange(e, index)}
                                    placeholder="Unité (g, ml, kg, ect.)"
                                    className="recipe-form__input"
                                    required
                                />
                                {recipeData.ingredients.length > 1 && (
                                    <button
                                        onClick={() => removeIngredient(index)}
                                        className="recipe-form__button"
                                    >
                                        Supprimer
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={addIngredient}
                            className="recipe-form__button--add"
                        >
                            Ajouter un ingrédient
                        </button>
                        {ingredientError &&
                            <p className="error-message">Veuillez remplir tous les champs de l&#39;ingrédient avant
                                d&#39;ajouter un autre.</p>}
                    </div>

                    <div className="recipe-form__steps">
                        <label className="recipe-form__label">Étapes</label>
                        {recipeData.steps.map((step, index) => (
                            <div key={index} className="recipe-form__steps--item">
                                <textarea
                                    value={step}
                                    onChange={(e) => stepChange(e, index)}
                                    placeholder={`Décrire l'étape ${index + 1}`}
                                    className="recipe-form__input"
                                    required
                                />
                                {recipeData.steps.length > 1 && (
                                    <button
                                        onClick={() => removeStep(index)}
                                        className="recipe-form__button"
                                    >
                                        <img src="/trash.svg" alt="Logo de filtre"/>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={addStep}
                            className="recipe-form__button--add"
                        >
                            Ajouter une étape
                        </button>
                        {stepError &&
                            <p className="error-message">Veuillez remplir l&#39;étape actuelle avant d&#39;en ajouter une
                                nouvelle.</p>}
                    </div>

                    <div className="recipe-form__preview-buttons">
                        <button
                            onClick={prevStep}
                            className="recipe-form__button"
                        >
                            Retour
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={!isStep2Valid()}
                            className="recipe-form__button"
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="recipe-form__step--3">
                    <h2 className="recipe-form__step-title">Étape 3 : Aperçu de la recette</h2>
                    <div className="recipe-form__preview">
                        <div className="recipe-form__preview-header">
                            <div className="recipe-form__preview-header-left">
                                <img
                                    src={URL.createObjectURL(recipeData.photo)}
                                    alt={recipeData.title}
                                    className="recipe-form__preview-header-left--image"
                                />
                            </div>
                            <div className="recipe-form__preview-header-right">
                                <h3 className="recipe-form__preview-title">{recipeData.title}</h3>
                                <div className="recipe-form__preview-info">
                                <span>
                                    <img src="/portions.svg" alt="Logo de filtre"/>
                                    <p>
                                        <strong>Pour</strong><br/>
                                        {recipeData.portions}
                                    </p>
                                </span>
                                    <span>
                                    <img src="/difficulty.svg" alt="Logo de filtre"/>
                                    <p>
                                        <strong>Difficulté</strong><br/>
                                        {recipeData.difficulty}
                                    </p>
                                </span>
                                    <span>
                                    <img src="/cookPrep.svg" alt="Logo de filtre"/>
                                    <p>
                                        <strong>Préparation</strong><br/>
                                        {recipeData.prepTime.hours}h {recipeData.prepTime.minutes}m
                                    </p>
                                </span>
                                    <span>
                                    <img src="/cookCuisson.svg" alt="Logo de filtre"/>
                                    <p>
                                        <strong>Cuisson</strong><br/>
                                        {recipeData.cookTime.hours}h {recipeData.cookTime.minutes}m
                                    </p>
                                </span>

                                    <span>
                                    <img src="/plate.svg" alt="Logo de filtre"/>
                                    <p>
                                        <strong>Type de plat</strong><br/>
                                        {recipeData.type}
                                    </p>
                                </span>
                                    <span>
                                    <p>
                                        <strong>Coût</strong><br/>
                                        {Array.from({length: recipeData.cost}).map((_, index) => (
                                            <img key={`cost-${index}`} src="/price.svg" alt="Logo de prix"/>
                                        ))}
                                    </p>
                                </span>
                                </div>
                            </div>
                        </div>

                        <div className="recipe-form__preview-body">
                            <div className="recipe-form__preview-ingredients">
                                <h4>Ingrédients</h4>
                                <ul>
                                    {recipeData.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="recipe-form__preview-steps">
                                <h4>Étapes</h4>
                                <ol>
                                    {recipeData.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="recipe-form__preview-buttons">
                        <button
                            onClick={prevStep}
                            className="recipe-form__button"
                        >
                            Retour
                        </button>
                        <button
                            onClick={submitForm}
                            className="recipe-form__button"
                        >
                            Ajouter la recette
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default RecipeForm;
