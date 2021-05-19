import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { GradientButton } from './games-global-style'

export default function Games() {
    const gradientButton = {
        color:'white',
        background: 'rgb(255,167,66)',
        background: 'linear-gradient(45deg, rgba(255,167,66,1) 0%, rgba(255,45,45,1) 37%, rgba(186,48,255,1) 62%, rgba(0,232,212,1) 80%)',
        border:'none',
        borderRadius:'30px',
        fontWeight:'500',
    };

    const cardStyle = {
        backgroundColor:'white',
        width:'20%',
        alignContent:'center',
        margin:'10px'
    };
    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            width:'85%', 
            margin:'auto', 
            padding:'20px',
            
        }}>
            <h1 style={{margin:'auto'}}>Rent Items For This Games</h1>
            
            <div style={{
                display:'flex',
                flexDirection:'row',
                width:'85%', 
                margin:'auto', 
                padding:'30px',
                height:'350px',
                color:'black'
            }}>
            <div style={{
                display:'flex',
                flexDirection:'row',
                width:'85%',
                height:'80%',
                margin:'auto',
            }}>
            <Card style={{ width: '18rem', margin:'10px' }}>
                <Card.Body>
                    <Card.Title>Game 1</Card.Title>
                </Card.Body>
                </Card>
                <Card style={{ width: '18rem', margin:'10px' }}>
                <Card.Body>
                    <Card.Title>Game 2</Card.Title>
                </Card.Body>
                </Card>
                <Card style={{ width: '18rem', margin:'10px' }}>
                <Card.Body>
                    <Card.Title>Game 3</Card.Title>
                </Card.Body>
                </Card>
                <Card style={{ width: '18rem', margin:'10px' }}>
                <Card.Body>
                    <Card.Title>Game 4</Card.Title>
                </Card.Body>
                </Card>
                
                </div>
            </div>
            <div style= {{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',  
                padding:'20px',
            }}>
            <GradientButton>See The Games</GradientButton>
            </div>
        </div>
    )
}