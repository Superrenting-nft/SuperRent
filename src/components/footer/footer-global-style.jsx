import styled from 'styled-components'


export const MainFooter = styled.div`
margin-top: 2rem;
`;


export const LinksStyle = styled.div`
display: flex;
flex-direction: row;
align-content: center;
justify-content: center;
width: 60%;
height:150px;
margin: auto;
`;

export const FooterLinks = styled.div`
display:flex;
flex-direction:column;
align-content: center;
justify-content: center;
width: 30%;
padding: auto;
margin: 5rem;
color: #000;

& > a {
    margin: auto;
    color: #000;
}
`;

export const CopyrightStyle = styled.div`
display: flex;
align-content: center;
justify-content:center;
padding: auto;
margin: auto;

& > p{
    margin: 20px;
}
`;

