import { NextRequest, NextResponse } from "next/server";


export async function POST(request) {
    try{

        const req = await request.json();

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
                Query: req.IngredientSearchQuery,
                page_nb: 1,
                row_nb: 10
            },
            })
        });

        return NextResponse.json({ ingredientnames: {...(await data.json()).data.SearchIngredientsByQuery} }, { status: data.status});

    }
    catch(error){
        return NextResponse.json({status: 'error', error: 'An error has occured'}, {status: 500});
    }
}
