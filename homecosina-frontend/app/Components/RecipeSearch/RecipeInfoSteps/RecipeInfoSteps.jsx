import styles from "../../../../styles/recipeInfoSteps.module.css"

export default function RecipeInfoSteps({Steps}) {

    //if(Steps.length === 0) return null;

    return (
        <div className={styles.container}>
            <h1>Steps:</h1>
            {
                Steps.map((Step, index) => (
                    <div key={index} className={styles.item}>
                        <p className={styles.step}>{`${index+1}. ${Step}`}</p>
                    </div>
                ))
            }
        </div>
    );

    
}
