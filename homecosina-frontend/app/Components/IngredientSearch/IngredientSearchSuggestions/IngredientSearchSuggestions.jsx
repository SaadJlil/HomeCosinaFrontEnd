'use client'

import Image from "next/image";
import styles from "../../../../styles/ingredientSearchSuggestions.module.css";
import IngredientSearchBar from "../IngredientSearchBar/IngredientSearchBar";
import HeaderH1 from "../../UI/HeaderH1";
import IngredientSuggestionsElement from "./IngredientSearchSuggestionsElement/IngredientSearchSuggestionsElement";


import { useState, useEffect } from "react";



async function getIngredients(ingredientSearchQuery)
{
    try{

        const res = await fetch(
            'http://localhost:3000/api/ingsuggestions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({IngredientSearchQuery: ingredientSearchQuery})
            }
        )
        

        return {
            ingredientN: (await res.json()).ingredientnames,
            status: res.status
        };
        
    }
    catch(error){
        console.error('Failed to fetch:', error);
    }
 
}




export default function IngredientSearchSuggestions({DeleteIngredient, MyIngredients, IngredientSearchSuggestionsClose_handler, ingName, handleIngredientName, handleIngredientSearchSuggestionsNoResults, handleIngredientSearchSuggestionsClose, isIngredientSearchIngredientsOpen, SearchBarPosition, ingredientSearchQuery}){//({handleCloseIngredientSearchSuggestions, isIngredientSearchIngredientsOpen, ingredientSearchQuery,ingredientSearchQuery }) {

    if (isIngredientSearchIngredientsOpen !== "open") return null;

    const handleMouseUpSuggestions = (e) => {
        const suggestionsContainer = document.getElementById('suggestionscontainer');
        
        // Check if suggestionscontainer exists and contains the event target
        if (!suggestionsContainer || !suggestionsContainer.contains(e.target)) {
            document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
            handleIngredientSearchSuggestionsClose();
        }
    };



    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUpSuggestions, true);

        return () => {
            document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
        };
    }, []);


    const [ingredientNames, setIngredientNames] = useState({});

    useEffect(() => {
        if(ingredientSearchQuery.length !== 0){

            async function asyncFetch() {

                const ingNames = (await getIngredients(ingredientSearchQuery)).ingredientN;

                if (!ingNames || Object.keys(ingNames).length === 0){
                    document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
                    handleIngredientSearchSuggestionsNoResults();
                }else{
                    setIngredientNames(ingNames);
                }

            }
        
            asyncFetch();

        }

      }, [ingredientSearchQuery]);


    if(Object.entries(ingredientNames).length === 0) {
        return null;
    }

    return (
        <div id="suggestionscontainer" className={styles.container} style={{minWidth: `${SearchBarPosition.width}px`, top: `${SearchBarPosition.y+3}px`, left: `${SearchBarPosition.x}px`}}>
            {
                Object.entries(ingredientNames).map((value, index) => 
                    <IngredientSuggestionsElement 
                        handleIngredientName={handleIngredientName} 
                        key= {value[0]} 
                        ingredientName={value[1].ingredient_name} 
                        IngredientSearchSuggestionsClose_handler={IngredientSearchSuggestionsClose_handler}
                        ingName={ingName} 
                        DeleteIngredient={DeleteIngredient}
                        MyIngredients={MyIngredients}
                    />
                )
            }
        </div>
    );
}