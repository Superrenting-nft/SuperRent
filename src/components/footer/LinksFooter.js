import React from 'react'
import { MainFooter, FooterLinks, LinksStyle } from './footer-global-style'
import { LinkStyle } from '../global-styles/link-style.jsx'

export default function LinksFooter() {
    return (
        <MainFooter>
            <div >
            
            </div>
            <LinksStyle>
                <FooterLinks>
                    <LinkStyle>Telegram</LinkStyle><p></p>
                    <LinkStyle>Open Source</LinkStyle><p></p>
                </FooterLinks>
                <FooterLinks>
                    <LinkStyle>Github</LinkStyle><p></p>
                    <LinkStyle>Docs</LinkStyle><p></p>
                </FooterLinks>
                <FooterLinks>
                    <LinkStyle>Protocols</LinkStyle><p></p>
                    <LinkStyle>Team</LinkStyle>
                
                </FooterLinks>
            </LinksStyle>
        </MainFooter>
    )
}
