'use client'

import Image from "next/image";
import styles from "../../../../styles/recipeSearchSuggestions.module.css";
import RecipeSuggestionsElement from "./RecipeSearchSuggestionsElement/RecipeSearchSuggestionsElement";
//import IngredientSuggestionsElement from "./IngredientSearchSuggestionsElement/IngredientSearchSuggestionsElement";


import { useState, useEffect } from "react";



async function getRecipeSuggestions(recipeSearchQuery)
{
    try{

        const res = await fetch(
            'http://localhost:3000/api/recipesuggestions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({RecipeSearchQuery: recipeSearchQuery})
            }
        )
        

        return {
            recipeSuggestions: (await res.json()).recipesuggestions,
            status: res.status
        };
        
    }
    catch(error){
        console.error('Failed to fetch:', error);
    }
 
}




export default function RecipeSearchSuggestions({recName, handleRecipeName, handleRecipeSearchSuggestionsNoResults, handleRecipeSearchSuggestionsClose, isRecipeSearchIngredientsOpen, SearchBarPosition, RecipeSearchQuery}){

    if (isRecipeSearchIngredientsOpen !== "open") return null;

    const handleMouseUpSuggestions = (e) => {
        const suggestionsContainer = document.getElementById('recipesuggestionscontainer');
        
        // Check if suggestionscontainer exists and contains the event target
        if (!suggestionsContainer || !suggestionsContainer.contains(e.target)) {
            document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
            handleRecipeSearchSuggestionsClose();
        }
    };



    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUpSuggestions, true);

        return () => {
            document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
        };
    }, []);


    const [RecipeNames, setRecipeNames] = useState({});

    useEffect(() => {
        if(RecipeSearchQuery.length !== 0){

            async function asyncFetch() {

                const recNames = (await getRecipeSuggestions(RecipeSearchQuery)).recipeSuggestions;
                
                if (!recNames || Object.keys(recNames).length === 0){
                    document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
                    handleRecipeSearchSuggestionsNoResults();
                }else{
                    setRecipeNames(recNames);
                }

            }
        
            asyncFetch();

        }

      }, [RecipeSearchQuery]);

    if(Object.entries(RecipeNames).length === 0) {
        return null;
    }

    return (
        <div id="recipesuggestionscontainer" className={styles.container} style={{minWidth: `${SearchBarPosition.width}px`, top: `${SearchBarPosition.y+3}px`, left: `${SearchBarPosition.x}px`}}>
            {
                Object.entries(RecipeNames).map((value, index) => 
                    <RecipeSuggestionsElement 
                        handleRecipeName={handleRecipeName} 
                        key = {value[0]} 
                        recipeName={value[1]} 
                        handleRecipeSearchSuggestionsClose={handleRecipeSearchSuggestionsClose}
                        recName={recName} 
                    />
                )
            }
        </div>
    );
}