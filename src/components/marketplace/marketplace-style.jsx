import styled from 'styled-components'


export const Background = styled.div`
  width:80%;
  background-color: #000;
  
`;

export const MarketContent = styled.div`
margin: auto;
width:80%;
background-color: #fff;
color: #000;
height:800px;

&:h1 {
  margin:auto;
  padding:3rem;
}
`;


export const InnerContent = styled.div`
 color: white;
 padding: 1rem;
 background: rgb(229,255,27);
 background: linear-gradient(36deg, rgba(229,255,27,1) 0%, rgba(252,70,107,1) 100%);
 height: 80%;
 padding: 1rem;
 margin: 1rem;
 border-radius:15px;
`;
 
export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:center;
  
`;

export const Cards = styled.div`
  width: 18rem; 
  height:16rem;
  margin: 10px;
  background-color: #000000;
`;

