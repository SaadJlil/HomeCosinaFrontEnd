'use client'

import Image from "next/image";
import styles from "../../../styles/ingredientSearch.module.css";
import IngredientSearchHeader from "./IngredientSearchHeader/IngredientSearchHeader";
import IngredientSearchBar from "./IngredientSearchBar/IngredientSearchBar";
import IngredientSearchSuggestions from "./IngredientSearchSuggestions/IngredientSearchSuggestions";


import { useState, useEffect, useRef } from "react";


export default function IngredientSearch() {



    const searchBarRef = useRef(null);

    const [searchBarPosition, setSearchBarPosition] = useState({ x: 0, y: 0 });
    const [IngredientSearchQuery, setIngredientSearchQuery] = useState("");

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
                <IngredientSearchBar setIngredientSearchQuery ={setIngredientSearchQuery} forwardRef={searchBarRef} onPositionChange={handlePositionChange}/>
                <IngredientSearchSuggestions SearchBarPosition={searchBarPosition} ingredientSearchQuery={IngredientSearchQuery}/>
            </div>
        </div>
    );
}