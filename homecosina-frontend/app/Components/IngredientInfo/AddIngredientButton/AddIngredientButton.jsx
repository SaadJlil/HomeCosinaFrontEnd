'use client'


import styles from "../../../../styles/addIngredientButton.module.css"




export default function AddIngredientButton({AddIngredient}){
    return (
        <div onClick={() => AddIngredient()} className={styles.container}>
            <p>Add Ingredient</p>
        </div>
    );

}