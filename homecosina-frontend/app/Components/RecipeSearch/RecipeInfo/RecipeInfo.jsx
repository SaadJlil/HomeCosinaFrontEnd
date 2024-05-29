'use client'

import Image from "next/image";
import styles from "../../../../styles/recipeInfo.module.css";
import RecipeInfoTable from "./RecipeInfoTable/RecipeInfoTable";
import RecipeInfoHeader from "./RecipeInfoHeader/RecipeInfoHeader";
import RecipeInfoIngredients from "../RecipeInfoIngredients/RecipeInfoIngredients";
import RecipeInfoSteps from "../RecipeInfoSteps/RecipeInfoSteps";
import { useState, useEffect, useRef } from "react";
import { Elsie_Swash_Caps, Indie_Flower } from "next/font/google";
import { ring } from 'ldrs'

ring.register('my-precious');





export default function RecipeInfo({isLoading, recipeInfoOpen, recInfo, RecipeInfoClose_handler}) {

    if(!recipeInfoOpen || Object.keys(recInfo).length === 0) return null;

    if(isLoading) {
        return (
            <div className={styles.containerLoading} >
                <img onClick={RecipeInfoClose_handler} src="back_button.png"/>
                
                <my-precious size="80" color="orange"></my-precious>

            </div>
        );

    }



    return (
        <div className={styles.container} >
            <img onClick={RecipeInfoClose_handler} src="back_button.png"/>
            <RecipeInfoHeader 
                recipeImageUrl={recInfo.recipe_imgurl}
                recipeTitle={FirstCharacterUppercase(recInfo.title)}
                recipeCookingTime={recInfo.cookingtime_min}
                recipeUrl={recInfo.link[0]}
            />

            <div className={styles.recinfo_wrapper}>
                <div className={styles.rectable_container}>
                    <h2>Nutritional Value (per 100g):</h2>
                    <RecipeInfoTable recipeInfo={recInfo}/>
                </div>
                <RecipeInfoIngredients 
                    Ingredients={recInfo.ingredient_name}
                    Measurements={recInfo.presentedstring}
                />
                <RecipeInfoSteps 
                    Steps={recInfo.steps} 
                />

            </div>
            

        </div>
    );

}

function FirstCharacterUppercase(string){
    try{
        return string[0].toUpperCase() + string.slice(1);
    }
    catch(error){
        return ""
    }
}


