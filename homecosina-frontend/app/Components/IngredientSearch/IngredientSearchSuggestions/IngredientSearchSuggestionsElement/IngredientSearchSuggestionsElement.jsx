'use client'

import Image from "next/image";
import styles from "../../../../../styles/IngredientSearchSuggestionsElement.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";


export default function IngredientSuggestionsElement({ingredientName}) {
   
  return (
    <div className={styles.container}>
        <p className={styles.ingredient}>{FirstCharacterUppercase(ingredientName)}</p>
        <p className={styles.add}>Add</p>
    </div>
  );
}


function FirstCharacterUppercase(string){
    return string[0].toUpperCase() + string.slice(1);
}