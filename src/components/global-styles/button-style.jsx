import styled, {css} from 'styled-components'


export const GradientButton = styled.button`
color: white;
background: rgb(255,167,66);
background: linear-gradient(45deg, rgba(255,167,66,1) 0%, rgba(255,45,45,1) 37%, 
rgba(186,48,255,1) 62%, rgba(0,232,212,1) 80%);
border: none;
border-radius: 20px;
font-weight: 500;
margin-top:2rem;
padding: .7rem;

&:hover {
color: purple;
}
`;