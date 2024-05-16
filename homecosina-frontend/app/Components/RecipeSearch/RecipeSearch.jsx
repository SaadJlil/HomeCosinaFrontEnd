'use client'

import Image from "next/image";
import styles from "../../../styles/recipeSearch.module.css";
import RecipeSearchHeader from "./RecipeSearchHeader/RecipeSearchHeader";
import RecipeSearchBar from "./RecipeSearchBar/RecipeSearchBar";
import RecipeSearchSuggestions from "./RecipeSearchSuggestions/RecipeSearchSuggestions";
import RecipeList from "./RecipeList/RecipeList";
//import IngredientList from "./IngredientList/IngredientList";


import { useState, useEffect, useRef } from "react";


export default function RecipeSearch({}) {

    const [isRecipeSearchSuggestionsOpen_, setRecipeSearchOpen_] = useState("closed");
    const [recQuery, setRecQuery] = useState("");
    const [recList, setRecList] = useState([]);

    const handleRecipeSearchSuggestionsOpen_ = () => {
        setRecipeSearchOpen_("open");
    }

    const handleRecipeSearchSuggestionsClose_ = () => {
        setRecipeSearchOpen_("closed");
    }

    const handleRecipeSearchSuggestionsNoResults_ = () => {
        setRecipeSearchOpen_("NA");
    }


    const searchBarRef = useRef(null);
    const searchRef = useRef(null);

    const [searchBarPosition, setSearchBarPosition] = useState({ x: 0, y: 0 });
    const [searchPosition, setSearchPosition] = useState({ x: 0, y: 0 });

    const [RecipeSearchQuery, setRecipeSearchQuery] = useState("");
    const [previousRecipeSearchQuery, setPreviousRecipeSearchQuery] = useState("");



    useEffect(() => {
        if(RecipeSearchQuery.length !== 0){
            if(isRecipeSearchSuggestionsOpen_ === "closed"){
                handleRecipeSearchSuggestionsOpen_();
            }
            else if(isRecipeSearchSuggestionsOpen_ === "NA"){
                if(!RecipeSearchQuery.startsWith(previousRecipeSearchQuery)){
                    handleRecipeSearchSuggestionsOpen_();
                }
            }
            setPreviousRecipeSearchQuery(RecipeSearchQuery);
        }else{
            handleRecipeSearchSuggestionsClose_();
        }
        
    }, [RecipeSearchQuery])



    useEffect(() => {
        if (searchBarRef.current && searchRef.current) {

            const { left, right, bottom } = searchBarRef.current.getBoundingClientRect();
            const { left: Sleft } = searchRef.current.getBoundingClientRect();
            setSearchBarPosition({ x: left - Sleft, y: bottom, width: right-left });
        }
    }, []);

    useEffect(() => {

        async function asyncFetch() {

            console.log(await searchRecipes(recQuery));

            const recList = (await searchRecipes(recQuery)).SearchRecipesByQuery;

            console.log(recList);

            if(typeof(recList) !== "undefined") {
                setRecList(Object.keys(recList).map((key) => recList[key]));
            }

        }


        if(recQuery.length > 0){
            asyncFetch();
        }

    }, [recQuery]);


    const handlePositionChange = (position) => {
        setSearchBarPosition(position);
    };

    return (
        <div className={styles.background} >
            <div className={styles.container} ref={searchRef}>
                <RecipeSearchHeader/>
                <RecipeSearchBar  
                    recName={recQuery}
                    setRecipeSearchQuery={setRecipeSearchQuery} 
                    forwardRef={searchBarRef} 
                    searchRef={searchRef} 
                    onPositionChange={handlePositionChange}
                    handleRecipeName={setRecQuery}
                />
                <RecipeSearchSuggestions
                    recName={recQuery}
                    handleRecipeName={setRecQuery}
                    handleRecipeSearchSuggestionsNoResults={handleRecipeSearchSuggestionsNoResults_}
                    handleRecipeSearchSuggestionsClose={handleRecipeSearchSuggestionsClose_}
                    isRecipeSearchIngredientsOpen={isRecipeSearchSuggestionsOpen_}
                    SearchBarPosition={searchBarPosition}
                    RecipeSearchQuery={RecipeSearchQuery}
                />
                <RecipeList RecipeInfoList={recList} />

            </div>
        </div>
    );



/*
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <IngredientSearchHeader/>
                <IngredientSearchBar  
                    ingName={ingName}
                    setIngredientSearchQuery={setIngredientSearchQuery} 
                    forwardRef={searchBarRef} 
                    onPositionChange={handlePositionChange}
                    handleIngredientName={handleIngredientName}
                />
                <IngredientSearchSuggestions 
                    IngredientInfoClose_handler={handleIngredientSearchSuggestionsClose_}
                    AddIngredient={AddIngredient}
                    ingName={ingName}
                    handleIngredientName={handleIngredientName}
                    handleIngredientSearchSuggestionsClose={handleIngredientSearchSuggestionsClose_} 
                    isIngredientSearchIngredientsOpen={isIngredientSearchSuggestionsOpen_} 
                    SearchBarPosition={searchBarPosition} ingredientSearchQuery={IngredientSearchQuery}
                    handleIngredientSearchSuggestionsNoResults={handleIngredientSearchSuggestionsNoResults_} 
                    DeleteIngredient={DeleteIngredient}
                    MyIngredients={MyIngredients}
                />
                <IngredientList 
                    IngredientInfoList={IngList} 
                    DeleteIngredient={DeleteIngredient}
                />
            </div>
        </div>
    );
*/
}


async function searchRecipes(recQuery)
{
    try{
        const res = await fetch(
            'http://localhost:3000/api/recipesearch',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({RecipeSearchQuery: recQuery})
            }
        )

        return await res.json();
        
    }
    catch(error){
        console.error('Failed to fetch:', error);
    }
 
}
