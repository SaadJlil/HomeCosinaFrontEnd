'use client'

import Image from "next/image";
import styles from "../../../../styles/ingredientList.module.css"
import IngredientElement from "./IngredientElement/IngredientElement";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";


export default function IngredientList({DeleteIngredient, IngredientInfoList}) {
    return (
        <div className={styles.container}> 
            {
                IngredientInfoList.map((value, index) => 
                    <IngredientElement 
                        IngredientInfo={value} 
                        DeleteIngredient={DeleteIngredient}
                    />
                )
            }
        </div>
    );
}
