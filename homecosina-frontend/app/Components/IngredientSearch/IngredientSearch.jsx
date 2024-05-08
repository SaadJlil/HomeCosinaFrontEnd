'use client'

import Image from "next/image";
import styles from "../../../styles/ingredientSearch.module.css";
import IngredientSearchHeader from "./IngredientSearchHeader/IngredientSearchHeader";
import IngredientSearchBar from "./IngredientSearchBar/IngredientSearchBar";
import IngredientSearchSuggestions from "./IngredientSearchSuggestions/IngredientSearchSuggestions";


import { useState, useEffect, useRef } from "react";


export default function IngredientSearch() {

    const handleIngredientSearchSuggestionsOpen_ = () => {
        setIngredientSearchOpen_("open");
    }

    const handleIngredientSearchSuggestionsClose_ = () => {
        setIngredientSearchOpen_("closed");
    }

    const handleIngredientSearchSuggestionsNoResults_ = () => {
        setIngredientSearchOpen_("NA");
    }



    const searchBarRef = useRef(null);

    const [searchBarPosition, setSearchBarPosition] = useState({ x: 0, y: 0 });
    const [IngredientSearchQuery, setIngredientSearchQuery] = useState("");
    const [previousIngredientSearchQuery, setPreviousIngredientSearchQuery] = useState("");


    useEffect(() => {
        if(IngredientSearchQuery.length !== 0){
            if(isIngredientSearchSuggestionsOpen_ === "closed"){
                handleIngredientSearchSuggestionsOpen_();
            }
            else if(isIngredientSearchSuggestionsOpen_ === "NA"){
                if(!IngredientSearchQuery.startsWith(previousIngredientSearchQuery)){
                    handleIngredientSearchSuggestionsOpen_();
                }
            }
            setPreviousIngredientSearchQuery(IngredientSearchQuery);
        }else{
            handleIngredientSearchSuggestionsClose_();
        }
        
    }, [IngredientSearchQuery])

    const [isIngredientSearchSuggestionsOpen_, setIngredientSearchOpen_] = useState("closed");


    useEffect(() => {
        if (searchBarRef.current) {
            const { left, right, bottom } = searchBarRef.current.getBoundingClientRect();
            setSearchBarPosition({ x: left, y: bottom, width: right-left });
        }
    }, []);


    const handlePositionChange = (position) => {
        setSearchBarPosition(position);
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <IngredientSearchHeader/>
                <IngredientSearchBar  
                    setIngredientSearchQuery={setIngredientSearchQuery} 
                    forwardRef={searchBarRef} 
                    onPositionChange={handlePositionChange}
                />
                <IngredientSearchSuggestions 
                    handleIngredientSearchSuggestionsClose={handleIngredientSearchSuggestionsClose_} 
                    isIngredientSearchIngredientsOpen={isIngredientSearchSuggestionsOpen_} 
                    SearchBarPosition={searchBarPosition} ingredientSearchQuery={IngredientSearchQuery}
                    handleIngredientSearchSuggestionsNoResults={handleIngredientSearchSuggestionsNoResults_} 
                />
            </div>
        </div>
    );
}