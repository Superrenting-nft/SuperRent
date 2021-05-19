import React from 'react';
import {MainStyle, SmStyle, RoundedDiv, RoundedStyle } from './social-global-style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

const SocialLinks = styled.a`
  margin: 0 1rem;
  transition: transform 250ms;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
  }
`;



export default function SocialMedia() {
    return (
        <MainStyle>
            <h1 style={{margin:'auto'}}>Social Media</h1>
                <SmStyle>
                    <RoundedDiv>
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                        <SocialLinks href=""></SocialLinks>
                    </RoundedDiv>
                    <RoundedDiv>
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                     <SocialLinks></SocialLinks>
                    </RoundedDiv>
                    <RoundedDiv>
                    <FontAwesomeIcon icon={faTwitter} size="2x" />

                        <SocialLinks></SocialLinks>
                    </RoundedDiv>
                    <RoundedDiv>
                    <FontAwesomeIcon icon={faInstagram} size="2x" />

                        <SocialLinks></SocialLinks>
                                            </RoundedDiv> 
                 </SmStyle>   
        </MainStyle>
    )
}
