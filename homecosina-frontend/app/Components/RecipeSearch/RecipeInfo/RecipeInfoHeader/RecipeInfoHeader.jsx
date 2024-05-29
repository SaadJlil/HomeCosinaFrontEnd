import styles from "../../../../../styles/recipeInfoHeader.module.css";
import RecipeUrlButton from "./RecipeUrlButton/RecipeUrlButton";

export default function RecipeInfoHeader({recipeImageUrl, recipeTitle, recipeCookingTime, recipeUrl}) {

    return (
        <div className={styles.container}>
                <div className={styles.rec_img} style={{backgroundImage: (recipeImageUrl === null) ? 'url("defaultRecipeImage.png")' : `url(${recipeImageUrl})`}}></div>
                <div className={styles.rec_hinfo}>
                    <div className={styles.recinfoh}>
                        <h1>{recipeTitle}</h1>
                        <h2>{`Cooking time: ${recipeCookingTime} Mins`}</h2>
                    </div>
                    <RecipeUrlButton recipeUrl={recipeUrl}/>
                </div>
        </div>
    );
}

