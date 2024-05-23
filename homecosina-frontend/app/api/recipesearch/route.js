import { NextRequest, NextResponse } from "next/server";


export async function POST(request) {
    try{

        const req = await request.json();

        console.log(req);

        const query = req.RecipeSearchQuery;
        const ingredients = req.MyIngredients.map((obj => obj.ingredient_name));


        if(ingredients.length + query.length === 0) {
            throw new Error("Wrong Request (absence of both ingredients and query)");
        }

        const pageN = 1;
        const rowN = 20;
        var data;
        var responseKey;

        const fetchAsync = async (Fquery, Variables) => {

            const data = await fetch('https://homecosina.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: Fquery,
                    variables: Variables 
                })
            });

            return data;
        }


        if(ingredients.length > 0 && query.length > 0){

            data = await fetchAsync(
                `
                query recipeQuery($Query: String!, $Ingredients: [String!]!, $page_nb: Int!, $row_nb: Int!){
                    SearchRecipesByQueryIng(Query: $Query, Ingredients: $Ingredients, page_nb: $page_nb, row_nb: $row_nb){
                            recipe_id,
                            title,
                            ingredient_name,
                            votes,
                            recipe_imgurl
                        }
                    } 
                `,
                {
                    Query: query,
                    Ingredients: ingredients,
                    page_nb: pageN,
                    row_nb: rowN
                }
            );


            responseKey = "SearchRecipesByQueryIng";


        }

        else if(ingredients.length > 0){

            data = await fetchAsync(
                `

                    query recipeQuery($Ingredients: [String!]!, $page_nb: Int!, $row_nb: Int!){
                        SearchRecipesByIng(Ingredients: $Ingredients, page_nb: $page_nb, row_nb: $row_nb){
                            recipe_id,
                            title,
                            ingredient_name,
                            votes,
                            recipe_imgurl
                        }
                    } 
                `,
                {
                    Ingredients: ingredients,
                    page_nb: pageN,
                    row_nb: rowN
                }
            );


            responseKey = "SearchRecipesByIng";

        }
        else if(query.length > 0) {

            data = await fetchAsync(
                `
                    query recipeQuery($Query: String!, $page_nb: Int!, $row_nb: Int!){
                        SearchRecipesByQuery(Query: $Query, page_nb: $page_nb, row_nb: $row_nb){
                            recipe_id,
                            title,
                            ingredient_name,
                            votes,
                            recipe_imgurl
                        }
                    } 
                `,
                {
                    Query: query,
                    page_nb: pageN,
                    row_nb: rowN
                }
            );

            responseKey = "SearchRecipesByQuery";

        }

        return NextResponse.json({ SearchRecipes: {...(await data.json()).data[responseKey]} }, { status: data.status});

    }
    catch(error){
        //console.log((error.errors)[0].errorStructure);
        return NextResponse.json({status: 'error', error: 'An error has occured'}, {status: 500});
    }
}