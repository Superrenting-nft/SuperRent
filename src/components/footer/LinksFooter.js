import React from 'react'
import { MainFooter, FooterLinks, LinksStyle } from './footer-global-style'
import { LinkStyle } from '../global-styles/links-style'

export default function LinksFooter() {
    return (
        <MainFooter>
            <div >
            {/* <NewsLetter>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" style={{width:'100%'}}/>
                </Form.Group>
                <Button variant="primary" type="submit" style={{margin:'30px', height:'40px'}}>
                    Submit
                </Button>
            </NewsLetter> */}
            </div>
            <LinksStyle>
                <FooterLinks>
                    <LinkStyle>Telegram</LinkStyle><p></p>
                    <LinkStyle>Careers</LinkStyle><p></p>
                    <LinkStyle>Affiliates</LinkStyle>
                </FooterLinks>
                <FooterLinks>
                    <LinkStyle>Github</LinkStyle><p></p>
                    <LinkStyle>Docs</LinkStyle><p></p>
                    <LinkStyle>Team</LinkStyle>
                </FooterLinks>
                <FooterLinks>
                    <LinkStyle>Protocols</LinkStyle><p></p>
                    <LinkStyle>Partners</LinkStyle><p></p>
                    <LinkStyle>Gradient Paper</LinkStyle>
                </FooterLinks>
            </LinksStyle>
        </MainFooter>
    )
}
