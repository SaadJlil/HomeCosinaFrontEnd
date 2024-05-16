'use client'

import Image from "next/image";
import styles from "../../../../../styles/ingredientElement.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";


export default function IngredientElement({DeleteIngredient, IngredientInfo}) {
    if(typeof(IngredientInfo) !== "undefined"){
        return (
            <div className={styles.container}> 
                <div className={styles.element}>
                    <div className={styles.ing_img} style={{backgroundImage: `url(${IngredientInfo.ing_imageurl})`}} />
                    <div className={styles.inginfo_container}>
                        <h1>{FirstCharacterUppercase(IngredientInfo.ingredient_name)}</h1>
                        <h2>{IngredientInfo.category}</h2>
                    </div>
                    <div className={styles.deleteWrapper}>
                        <img src="deleteButton.png" onClick={() => DeleteIngredient(IngredientInfo)}/>
                    </div>
                </div>
            </div>
        );
    }

}


function FirstCharacterUppercase(string){
    return string[0].toUpperCase() + string.slice(1);
}