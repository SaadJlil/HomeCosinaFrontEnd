'use client'


import styles from "../../../../styles/addIngredientButton.module.css"




export default function DeleteIngredientButton({DeleteIngredient}){
    return (
        <div onClick={() => DeleteIngredient()} className={styles.container}>
            <p>Remove Ingredient</p>
        </div>
    );

}