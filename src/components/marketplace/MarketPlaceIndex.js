import React from 'react'
import styled from 'styled-components'
import { GlobalStyleComponent } from '../global-styles/global-fe-style.jsx'
import {Background, 
        MarketContent, 
        InnerContent, 
        CardContainer, 
        Cards,
        css} from './marketplace-style.jsx'


export default function MarketPlaceIndex(){
  
    return (
        <GlobalStyleComponent>
            <MarketContent>
                <h1>Market Place</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipis.</p>   

                <InnerContent>
                        <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the    industry's                     standard        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                            <CardContainer>
                                    <Cards>Hello</Cards>
                                    <Cards>Hello</Cards>
                                    <Cards>Hello</Cards>
                            </CardContainer>
                            <CardContainer>
                                    <Cards>Hello</Cards>
                                    <Cards>Hello</Cards>
                                    <Cards>Hello</Cards>
                            </CardContainer>
                    </InnerContent>
            </MarketContent>
        </GlobalStyleComponent>
    )
}
