'use client'

import Image from "next/image";
import styles from "../../../../../styles/IngredientSearchSuggestionsElement.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";


export default function IngredientSuggestionsElement({MyIngredients, DeleteIngredient, IngredientSearchSuggestionsClose_handler, ingName, handleIngredientName, ingredientName}) {
   
  if(!MyIngredients.some(obj => obj.ingredient_name === ingredientName)){
    return (
      <div className={styles.container} onClick={() => {
        const inputString = ingredientName;
        if(inputString.length > 0){
            document.getElementById('ingredientsearchbarinput').value = FirstCharacterUppercase(inputString);
            if(inputString === ingName){
                handleIngredientName((inputString === inputString.toLowerCase()) ? inputString.toUpperCase() : inputString.toLowerCase());
            }else{
                handleIngredientName(inputString);
            }
            IngredientSearchSuggestionsClose_handler();
        }
      }}>
          <p className={styles.ingredient}>{FirstCharacterUppercase(ingredientName)}</p>
          <p className={styles.add} onClick={(e) => {
              e.stopPropagation();
              handleIngredientName("+" + ingredientName);
              IngredientSearchSuggestionsClose_handler();
          }}>Add</p>
      </div>
    );

  }

  return (
    <div className={styles.container} onClick={() => {
      const inputString = ingredientName;
      if(inputString.length > 0){
          if(inputString === ingName){
              handleIngredientName((inputString === inputString.toLowerCase()) ? inputString.toUpperCase() : inputString.toLowerCase());
          }else{
              handleIngredientName(inputString);
          }
          IngredientSearchSuggestionsClose_handler();
      }
    }}>
        <p className={styles.ingredient}>{FirstCharacterUppercase(ingredientName)}</p>
        <p className={styles.add} onClick={(e) => {
            e.stopPropagation();
            DeleteIngredient(ingredientName);
            IngredientSearchSuggestionsClose_handler();
        }}>Remove</p>
    </div>
  );

}


function FirstCharacterUppercase(string){
    return string[0].toUpperCase() + string.slice(1);
}