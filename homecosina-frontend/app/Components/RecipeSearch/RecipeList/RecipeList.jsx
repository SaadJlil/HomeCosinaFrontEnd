'use client'

import Image from "next/image";
import styles from "../../../../styles/recipeList.module.css"
import RecipeElement from "./RecipeElement/RecipeElement";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import { useState, useEffect } from "react";
import { ring } from 'ldrs'

ring.register('my-precious');



export default function RecipeList({isLoading, recipeIdHandler, recipeInfoOpenHandler, RecipeInfoList}) {

    if(isLoading) {
        return (
            <div className={styles.containerLoading} >
                
                <my-precious size="70" color="orange"></my-precious>

            </div>
        );

    }


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
