'use client'

import Image from "next/image";
import styles from "../../../../../styles/recipeElement.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";


export default function RecipeElement({recipeIdHandler, recipeInfoOpenHandler, RecipeInfo}) {
    if(typeof(RecipeInfo) !== "undefined"){
        return (
            <div className={styles.container}> 
                <div onClick={() => {
                    recipeIdHandler(RecipeInfo.recipe_id);
                    recipeInfoOpenHandler();
                }} className={styles.element}>
                    <div className={styles.rec_img} style={{backgroundImage: `url(${RecipeInfo.recipe_imgurl})`}} />
                    <div className={styles.recinfo_container}>
                        <h1>{FirstCharacterUppercase(RecipeInfo.title)}</h1>
                    </div>
                </div>
            </div>
        );
    }

}


function FirstCharacterUppercase(string){
    return string[0].toUpperCase() + string.slice(1);
}