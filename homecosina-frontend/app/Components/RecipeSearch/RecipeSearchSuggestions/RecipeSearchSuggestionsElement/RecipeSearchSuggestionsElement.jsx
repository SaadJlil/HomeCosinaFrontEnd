'use client'

import Image from "next/image";
import styles from "../../../../../styles/RecipeSearchSuggestionsElement.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";


export default function RecipeSuggestionsElement({handleRecipeSearchSuggestionsClose, recName, handleRecipeName, recipeName}) {

  return (
    <div className={styles.container} onClick={() => {
      const inputString = recipeName;
      if(inputString.length > 0){
          document.getElementById('recipesearchbarinput').value = FirstCharacterUppercase(inputString);
          if(inputString === recName){
              handleRecipeName((inputString === inputString.toLowerCase()) ? inputString.toUpperCase() : inputString.toLowerCase());
          }else{
              handleRecipeName(inputString);
          }
          handleRecipeSearchSuggestionsClose();
      }
    }}>
        <p className={styles.ingredient}>{FirstCharacterUppercase(recipeName)}</p>
    </div>
  );

}


function FirstCharacterUppercase(string){
    return string[0].toUpperCase() + string.slice(1);
}