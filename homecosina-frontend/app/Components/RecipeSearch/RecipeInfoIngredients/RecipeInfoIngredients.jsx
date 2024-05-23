import styles from "../../../../styles/recipeInfoIngredients.module.css"

export default function RecipeInfoIngredients({Ingredients, Measurements}) {

    if(Ingredients.length !== Measurements.length || Ingredients.length === 0) return null;

    return (
        <div className={styles.container}>
            <h1>Ingredients:</h1>
            {
                Ingredients.map((ingredient, index) => (
                    <div key={index} className={styles.item}>
                        <p className={styles.measurement}>{Measurements[index]}</p>
                    </div>
                ))
            }
        </div>
    );

    
}
