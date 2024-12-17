import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./Hero.scss";

const Hero = () => {

    const [imageIndex, setImageIndex] = useState(0);
    const [randomRecipes, setRandomRecipes] = useState([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    useEffect(() => {
        fetch('/recipes.json')
            .then((response) => response.json())
            .then((data) => {
                const shuffledRecipes = [...data.recipes];
                shuffleArray(shuffledRecipes);
                setRandomRecipes(shuffledRecipes.slice(0, 4));
            })
            .catch((error) => console.error('Erreur de chargement des recettes:', error));
    }, []);

    const prevImage = () => {
        setImageIndex((prevIndex) => (prevIndex === 0 ? randomRecipes.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setImageIndex((prevIndex) => (prevIndex === randomRecipes.length - 1 ? 0 : prevIndex + 1));
    };

    const vignetteClick = (index) => {
        setImageIndex(index);
    };

    if (randomRecipes.length === 0) {
        return <div>Chargement...</div>;
    }

    return (
        <section className="hero">
            <div className="intro">
                <div className="intro__slogan">
                    <span>Votre partenaire secret pour des plats exceptionnels à la maison</span>
                </div>
                <div className="intro__statistics">
                    <div className="intro__statistics--recipe">
                        <img src="/stats_recipe.svg" alt="Profil"/>
                        <div className="intro__statistics--text">
                            <h3>100 000+</h3>
                            <p>Recettes certifiés</p>
                        </div>
                    </div>
                    <div className="intro__statistics--home">
                        <img src="/stats_home.svg" alt="Profil"/>
                        <div className="intro__statistics--text">
                            <h3>1 Million</h3>
                            <p>Utilisateurs satisfaits</p>
                        </div>
                    </div>
                    <div className="intro__statistics--social">
                        <img src="/stats_social.svg" alt="Profil"/>
                        <div className="intro__statistics--text">
                            <h3>50 000+</h3>
                            <p>Recettes partagés</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="carrousel">
                <div className="carrousel__images">
                    <button className="carrousel__images--prev" onClick={prevImage}>
                        <img src="/prev.svg" alt="Précédent"/>
                    </button>
                    {randomRecipes.length > 0 && (
                        <img
                            src={randomRecipes[imageIndex].photo}
                            alt={randomRecipes[imageIndex].title}
                            className="carrousel__image"
                        />
                    )}
                    <p className="carrousel__image--text">
                        {randomRecipes[imageIndex].title}
                        <Link to={`/recipe/${randomRecipes[imageIndex].id}`} className="btn">
                            Voir plus
                        </Link>
                    </p>
                    <button className="carrousel__images--next" onClick={nextImage}>
                        <img src="/next.svg" alt="Suivant"/>
                    </button>
                </div>

                <div className="carrousel__vignette">
                    <button className="carrousel__images--up" onClick={prevImage}>
                        <img src="/up.svg" alt="Haut"/>
                    </button>
                    {randomRecipes.map((recipe, index) => (
                        <img
                            key={index}
                            src={recipe.photo}
                            alt={recipe.title}
                            className={`vignette ${index === imageIndex ? 'active' : ''}`}
                            onClick={() => vignetteClick(index)}
                        />
                    ))}
                    <button className="carrousel__images--down" onClick={nextImage}>
                        <img src="/down.svg" alt="Bas"/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;