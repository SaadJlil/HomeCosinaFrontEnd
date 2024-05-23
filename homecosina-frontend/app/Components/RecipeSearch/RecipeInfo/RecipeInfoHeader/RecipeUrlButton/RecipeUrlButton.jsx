'use client'


import styles from "../../../../../../styles/recipeUrlButton.module.css"




export default function RecipeUrlButton({recipeUrl}){
    return (
        <div onClick={(e) => {
                    e.preventDefault()
                    window.location.href = `location.href='${recipeUrl}'` ;
                }
            }
            className={styles.container}>
            <p>View Full Recipe</p>
        </div>
    );

}