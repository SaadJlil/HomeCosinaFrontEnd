'use client'

import Image from "next/image";
import styles from "../../../../styles/ingredientSearchSuggestions.module.css";
import IngredientSearchBar from "../IngredientSearchBar/IngredientSearchBar";
import HeaderH1 from "../../UI/HeaderH1";
import IngredientSuggestionsElement from "./IngredientSearchSuggestionsElement/IngredientSearchSuggestionsElement";


import { useState, useEffect } from "react";





async function getIngredients(IngredientSearchQuery)
{
    try{
       
        const data = await fetch('https://homecosina.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            query: `query ingredientQuery($Query: String!, $page_nb: Int!, $row_nb: Int!) {
                SearchIngredientsByQuery(Query: $Query, page_nb: $page_nb, row_nb: $row_nb){
                ingredient_name
                }
            }`,
            variables: {
                Query: IngredientSearchQuery,
                page_nb: 1,
                row_nb: 10
            },
            })
        });


        return (await data.json()).data.SearchIngredientsByQuery;
    }
    catch(error){
        console.error('Failed to fetch:', error);
    }
 
}

export default function IngredientSearchSuggestions({SearchBarPosition, ingredientSearchQuery}){//({handleCloseIngredientSearchSuggestions, isIngredientSearchIngredientsOpen, ingredientSearchQuery,ingredientSearchQuery }) {

    //if(!isIngredientSearchIngredientsOpen) return null;


    const [ingredientNames, setIngredientNames] = useState({});

    useEffect(() => {
        async function asyncFetch() {
          setIngredientNames(await getIngredients(ingredientSearchQuery));
        };
    
        asyncFetch();
      }, [ingredientSearchQuery]);

    if (!ingredientNames || Object.keys(ingredientNames).length === 0) return null;

    return (
        <div className={styles.container} style={{minWidth: `${SearchBarPosition.width}px`, top: `${SearchBarPosition.y+3}px`, left: `${SearchBarPosition.x}px`}}>
            {
                Object.entries(ingredientNames).map((value, index) => <IngredientSuggestionsElement key= {value[0]} ingredientName={value[1].ingredient_name} />)
            }
        </div>
    );
}

/*
export default function AboutMeModal({handleCloseModal, isModalOpen}) {
    return (
        <modalform className={styles.modalform}>        
            <AboutMe isOpen={isModalOpen} onClose={() => handleCloseModal()}/>
        </modalform>
   )
}
*/