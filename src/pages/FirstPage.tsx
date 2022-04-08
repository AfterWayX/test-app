import { useEffect, useState } from "react";
import styled from '@emotion/styled'

import { SearchTitle } from "../styled_components/searchTitle";

interface namesInterface {
    names: string[]
}
interface filterDataInterface {
    query: string
}

function FirstPage({names}: namesInterface) {
    const [filterDates, setFilterDates] = useState<string[]>(names)
    const [query, setQuery] = useState<string>('')
    function filterData({query}: filterDataInterface){
        if(query){
            var queryParams = new URLSearchParams(window.location.search);
            queryParams.set('query', query)
            window.history.pushState(null, 'query', queryParams.toString())
            const filteredData = names.filter(element => element.toLocaleLowerCase().includes(query.toLocaleLowerCase())? element : null)
            return setFilterDates(filteredData)
        } else {
            window.history.replaceState(null, 'query', '/')
            return setFilterDates(names)
        }
    }
    useEffect(() => {
        setFilterDates(names)
        var queryParams = new URLSearchParams(window.location.pathname);
        if(queryParams.toString()){
            const parameters = queryParams.toString().split('=')
            const index = parameters.length - 1
            const queryParameter = parameters[index]
            setQuery(queryParameter)
            filterData({query: queryParameter})
        }
        return;
    }, [])
    
    useEffect(() => {
        filterData({query})
    }, [query])
    
    return (
        <MainContainer>
            <DivAlignedCenter>
                <SearchTitle>Search here a name from this list</SearchTitle>
                <InputStylized 
                    type="search" 
                    value={query} onChange={(ev) => setQuery(ev.currentTarget.value)} 
                />
            </DivAlignedCenter>
            <GridData>
                {
                filterDates.length >= 1 
                ? filterDates.map((el) => (<GridItem key={el}>{el}</GridItem>)) 
                : <p>No data to view on this request</p>
                }
            </GridData>
        </MainContainer>
    );
}

const DivAlignedCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 16px;
`
const InputStylized = styled.input`
    width: 30%;
    margin: auto;
    padding: 4px;
    border: 1px solid #707070;
    border-radius: 5px;
    outline:none;
`

const GridData = styled.div`
    display: flex;
    margin: 30px;
    border-radius: 30px;
    padding: 30px 30px;
    max-width: 100%;
    flex-wrap: wrap;
    outline: none;
    background: rgba(0, 0, 0, 0.1);
    justify-content: center;
`

const GridItem = styled.div`
    width: 10%;
    font-size: 13px;
`
const MainContainer = styled.section`
    height: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to bottom right, #fff5d6, #cccccc);
`

export default FirstPage;
