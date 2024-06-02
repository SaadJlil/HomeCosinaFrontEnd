import { useEffect, useState, useRef, useCallback } from "react";
import styles from "../../../../styles/recipeSearchBar.module.css";

export default function RecipeSearchBar({
  handleCloseSuggestions,
  recName,
  onPositionChange,
  searchRef,
  forwardRef,
  setRecipeSearchQuery,
  handleRecipeName
}) {

  const resizeObserverRef = useRef(null);
  const debounceTimeoutRef = useRef(null);



  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        if (forwardRef.current) {
          const { left, right, bottom } = forwardRef.current.getBoundingClientRect();
          const { left: Sleft } = searchRef.current.getBoundingClientRect();
          onPositionChange({ x: left - Sleft, y: bottom, width: right - left });
        }
      }
    };

    resizeObserverRef.current = new ResizeObserver(handleResize);
    if (forwardRef.current) {
      resizeObserverRef.current.observe(forwardRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [forwardRef, searchRef, onPositionChange]);

  // Debounce function to delay setting the search query
  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSetRecipeSearchQuery = useCallback(
    debounce((value) => {
      setRecipeSearchQuery(value);
    }, 750),
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.bar} ref={forwardRef}>
        <input
          id="recipesearchbarinput"
          onChange={(evt) => {
            if (evt.currentTarget.value !== "") {
              debouncedSetRecipeSearchQuery(evt.currentTarget.value);
            } else {
              setRecipeSearchQuery("");
            }
          }}
          type="text"
          placeholder="Search for Recipe..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
              const inputString = event.currentTarget.value;
              if (inputString === recName) {
                handleRecipeName(
                  inputString === inputString.toLowerCase()
                    ? inputString.toUpperCase()
                    : inputString.toLowerCase()
                );
              } else {
                handleRecipeName(inputString);
              }
              handleCloseSuggestions();
            }
          }}
        />
      </div>
      <button
        onClick={() => {
          const inputString = document.getElementById('recipesearchbarinput').value;
          if (inputString === '') {
            handleRecipeName(recName === '' ? '*' : '');
          } else if (inputString === recName) {
            handleRecipeName(
              inputString === inputString.toLowerCase()
                ? inputString.toUpperCase()
                : inputString.toLowerCase()
            );
          } else {
            handleRecipeName(inputString);
          }
          handleCloseSuggestions();
        }}
        className={styles.searchButton}
      >
        <img src="searchIcon.png" alt="Search" />
      </button>
    </div>
  );
}


/*
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "../../../../styles/recipeSearchBar.module.css";

export default function RecipeSearchBar({
  handleCloseSuggestions,
  recName,
  onPositionChange,
  searchRef,
  forwardRef,
  setRecipeSearchQuery,
  handleRecipeName
}) {
  const resizeObserverRef = useRef(null);
  const [cancelSuggestionBool, setCancelSuggestionBool] = useState(false);

  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        if (forwardRef.current) {
          const { left, right, bottom } = forwardRef.current.getBoundingClientRect();
          const { left: Sleft } = searchRef.current.getBoundingClientRect();
          onPositionChange({ x: left - Sleft, y: bottom, width: right - left });
        }
      }
    };

    resizeObserverRef.current = new ResizeObserver(handleResize);
    if (forwardRef.current) {
      resizeObserverRef.current.observe(forwardRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [forwardRef, searchRef, onPositionChange]);

  // Debounce function to delay setting the search query
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSetRecipeSearchQuery = useCallback(
    debounce((value) => {
            if(!cancelSuggestionBool){
                setRecipeSearchQuery(value);
            }
            else{
                setCancelSuggestionBool(true);
            }
        }, 750),
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.bar} ref={forwardRef}>
        <input
          id="recipesearchbarinput"
          onChange={(evt) => {
            if(evt.currentTarget.value !== "") {
                debouncedSetRecipeSearchQuery(evt.currentTarget.value);
            }
            else {
                setRecipeSearchQuery("");
            }
          }}
          type="text"
          placeholder="Search for Recipe..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setCancelSuggestionBool(true);
              console.log(cancelSuggestionBool);
              const inputString = event.currentTarget.value;
              if (inputString === recName) {
                handleRecipeName(
                  inputString === inputString.toLowerCase()
                    ? inputString.toUpperCase()
                    : inputString.toLowerCase()
                );
              } else {
                handleRecipeName(inputString);
              }
              handleCloseSuggestions();
            }
          }}
        />
      </div>
      <button
        onClick={() => {
          const inputString = document.getElementById('recipesearchbarinput').value;
          if (inputString === '') {
            handleRecipeName(recName === '' ? '*' : '');
          } else if (inputString === recName) {
            handleRecipeName(
              inputString === inputString.toLowerCase()
                ? inputString.toUpperCase()
                : inputString.toLowerCase()
            );
          } else {
            handleRecipeName(inputString);
          }
          handleCloseSuggestions();
        }}
        className={styles.searchButton}
      >
        <img src="searchIcon.png" alt="Search" />
      </button>
    </div>
  );
}

*/

/*
import { useEffect, useRef } from "react";
import styles from "../../../../styles/recipeSearchBar.module.css";

export default function RecipeSearchBar({
  handleCloseSuggestions,
  recName,
  onPositionChange,
  searchRef,
  forwardRef,
  setRecipeSearchQuery,
  handleRecipeName
}) {
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        if (forwardRef.current) {
          const { left, right, bottom } = forwardRef.current.getBoundingClientRect();
          const { left: Sleft } = searchRef.current.getBoundingClientRect();
          onPositionChange({ x: left - Sleft, y: bottom, width: right - left });
        }
      }
    };

    resizeObserverRef.current = new ResizeObserver(handleResize);
    if (forwardRef.current) {
      resizeObserverRef.current.observe(forwardRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [forwardRef, searchRef, onPositionChange]);

  return (
    <div className={styles.container}>
      <div className={styles.bar} ref={forwardRef}>
        <input
          id="recipesearchbarinput"
          onChange={(evt) => setRecipeSearchQuery(evt.currentTarget.value)}
          type="text"
          placeholder="Search for Recipe..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const inputString = event.currentTarget.value;
              if (inputString === recName) {
                handleRecipeName(
                  inputString === inputString.toLowerCase()
                    ? inputString.toUpperCase()
                    : inputString.toLowerCase()
                );
              } else {
                handleRecipeName(inputString);
              }
              handleCloseSuggestions();
            }
          }}
        />
      </div>
      <button
        onClick={() => {
          const inputString = document.getElementById('recipesearchbarinput').value;
          if (inputString === '') {
            handleRecipeName(recName === '' ? '*' : '');
          } else if (inputString === recName) {
            handleRecipeName(
              inputString === inputString.toLowerCase()
                ? inputString.toUpperCase()
                : inputString.toLowerCase()
            );
          } else {
            handleRecipeName(inputString);
          }
          handleCloseSuggestions();
        }}
        className={styles.searchButton}
      >
        <img src="searchIcon.png" alt="Search" />
      </button>
    </div>
  );
}

*/


/*


'use client'

import Image from "next/image";
import styles from "../../../../styles/recipeSearchBar.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";



export default function RecipeSearchBar({handleCloseSuggestions, recName, onPositionChange, searchRef, forwardRef, setRecipeSearchQuery, handleRecipeName}) {
        
    if (typeof window !== 'undefined'){
        window.addEventListener('resize', () => {
            if (forwardRef.current) {
                const { left, right, bottom } = forwardRef.current.getBoundingClientRect();
                const { left: Sleft } = searchRef.current.getBoundingClientRect();

                onPositionChange({ x: left-Sleft, y: bottom, width: right-left });
            }
        });
    }
    
  return (
    <div className={styles.container} >
        <div className={styles.bar} ref={forwardRef}>
            <input 
                id="recipesearchbarinput"
                onChange={(evt) => setRecipeSearchQuery(evt.currentTarget.value)} 
                type="text" 
                placeholder="Search for Recipe..." 
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        const inputString = event.currentTarget.value;
                        if(inputString === recName){
                            handleRecipeName((inputString === inputString.toLowerCase()) ? inputString.toUpperCase() : inputString.toLowerCase());
                        }else{
                            handleRecipeName(inputString);
                        }
                        handleCloseSuggestions();
                    }
                }}
            />
        </div>
        <button onClick={() => 
                {

                    const inputString = document.getElementById("recipesearchbarinput").value;

                    
                    if(inputString === ""){
                        handleRecipeName((recName === "") ? "*" : "");
                    }
                    else if(inputString === recName){
                        handleRecipeName((inputString === inputString.toLowerCase()) ? inputString.toUpperCase() : inputString.toLowerCase());
                    }else{
                        handleRecipeName(inputString);
                    }
                    handleCloseSuggestions();
                }
            }

            className={styles.searchButton}>
            <img src="searchIcon.png" />
        </button>
    </div>
  );
}

*/