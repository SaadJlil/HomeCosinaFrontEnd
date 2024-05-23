'use client'

import Image from "next/image";
import styles from "../../../../styles/recipeList.module.css"
import RecipeElement from "./RecipeElement/RecipeElement";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";


export default function RecipeList({recipeIdHandler, recipeInfoOpenHandler, RecipeInfoList}) {

    return (
        <div className={styles.container}> 
            {
                RecipeInfoList.map((value, index) => 
                    <RecipeElement 
                        recipeIdHandler={recipeIdHandler}
                        recipeInfoOpenHandler={recipeInfoOpenHandler}
                        RecipeInfo={value} 
                    />
                )
            }
        </div>
    );
}
