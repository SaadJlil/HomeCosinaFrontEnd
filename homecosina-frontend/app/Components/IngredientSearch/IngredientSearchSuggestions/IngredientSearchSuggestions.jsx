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
            'http://localhost:3000/api',
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




export default function IngredientSearchSuggestions({handleIngredientSearchSuggestionsNoResults, handleIngredientSearchSuggestionsClose, isIngredientSearchIngredientsOpen, SearchBarPosition, ingredientSearchQuery}){//({handleCloseIngredientSearchSuggestions, isIngredientSearchIngredientsOpen, ingredientSearchQuery,ingredientSearchQuery }) {


    if (isIngredientSearchIngredientsOpen !== "open") return null;

    const handleMouseUpSuggestions = (e) => {
        if (!document.getElementById('suggestionscontainer').contains(e.target)) {
            handleIngredientSearchSuggestionsClose();

            // Remove the event listener after it's executed once
            document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
        }
    };

    useEffect(() => {
        // Add the event listener to the document
        document.addEventListener('mouseup', handleMouseUpSuggestions, true);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
        };
    }, []); // Empty dependency array to run effect only once


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

            return () => {
                document.removeEventListener('mouseup', handleMouseUpSuggestions, true);
            };
        }
      }, [ingredientSearchQuery]);

    return (
        <div id="suggestionscontainer" className={styles.container} style={{minWidth: `${SearchBarPosition.width}px`, top: `${SearchBarPosition.y+3}px`, left: `${SearchBarPosition.x}px`}}>
            {
                Object.entries(ingredientNames).map((value, index) => <IngredientSuggestionsElement key= {value[0]} ingredientName={value[1].ingredient_name} />)
            }
        </div>
    );
}