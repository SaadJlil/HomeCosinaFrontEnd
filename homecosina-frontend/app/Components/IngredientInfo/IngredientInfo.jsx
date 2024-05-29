'use client'

import Image from "next/image";
import styles from "../../../styles/ingredientInfo.module.css";
import IngredientInfoTable from "./IngredientInfoTable/IngredientInfoTable";
import AddIngredientButton from "./AddIngredientButton/AddIngredientButton";
import DeleteIngredientButton from "./DeleteIngredientButton/DeleteIngredientButton";



import { useState, useEffect, useRef } from "react";
import { Elsie_Swash_Caps, Indie_Flower } from "next/font/google";







export default function IngredientInfo({DeleteIngredient, MyIngredients, AddIngredient, ingredientInfoOpen, IngInfo, IngredientInfoClose_handler}) {

    if(!ingredientInfoOpen) return null;

    if(MyIngredients.some(obj => obj.ingredient_name === IngInfo.ingredient_name)){
        return (
            <div className={styles.container}>
                <img onClick={IngredientInfoClose_handler} src="back_button.png"/>
                <div className={styles.ing_img} style={{backgroundImage: (IngInfo.ing_imageurl === null) ? 'url("defaultIngredientImage.jpg")' : `url(${IngInfo.ing_imageurl})`}}></div>
                <div className={styles.inginfo_container}>
                    <h1>{FirstCharacterUppercase(IngInfo.ingredient_name)}</h1>
                    <h2 className={styles.h2}>{IngInfo.category}</h2>
                    <DeleteIngredientButton DeleteIngredient={() => DeleteIngredient(IngInfo)} />
                    <h3>Nutritional Value (per 100g):</h3>
                    <IngredientInfoTable IngredientInfo={IngInfo}/>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.container}>
            <img onClick={IngredientInfoClose_handler} src="back_button.png"/>
            <div className={styles.ing_img} style={{backgroundImage: (IngInfo.ing_imageurl === null) ? 'url("defaultIngredientImage.jpg")' : `url(${IngInfo.ing_imageurl})`}}></div>
            <div className={styles.inginfo_container}>
                <h1>{FirstCharacterUppercase(IngInfo.ingredient_name)}</h1>
                <h2 className={styles.h2}>{IngInfo.category}</h2>
                <AddIngredientButton AddIngredient={() => AddIngredient(IngInfo)} />
                <h3>Nutritional Value (per 100g):</h3>
                <IngredientInfoTable IngredientInfo={IngInfo}/>
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


