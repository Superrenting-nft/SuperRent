import React from 'react'
import {Card, Button }from 'react-bootstrap'

export default function LastRented() {
    const lastRentedStyle= {
        margin:'40px',
        padding:'20px',
    };

    const gradientButton = {
        color:'white',
        background: 'rgb(255,167,66)',
        background: 'linear-gradient(45deg, rgba(255,167,66,1) 0%, rgba(255,45,45,1) 37%, rgba(186,48,255,1) 62%, rgba(0,232,212,1) 80%)',
        border:'none',
        borderRadius:'30px',
        fontWeight:'500',
    };

    const personStyle = {
        width: '15rem', 
        margin:'20px',
        height: '20rem',
    };

    return (
        <div style={lastRentedStyle}>
            <h1>Last Rented</h1>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div style={{
                display:'flex',
                flexDirection:'row',
                width:'95%', 
                margin:'auto', 
                padding:'30px',
                height:'350px',
                color:'black',
                
            }}>
            <div style={{
                display:'flex',
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'center', 
                width:'65%',
                height:'95%',
                margin:'auto',
                padding:'auto',
                
            }}>
            <Card style={personStyle}>
                <Card.Body>
                    <Card.Title>Person 1</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    
                </Card.Body>
                </Card>
                <Card style={personStyle}>
                    <Card.Body>
                        <Card.Title>Person 2</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
                <Card style={personStyle}>
                    <Card.Body>
                        <Card.Title>Person 3</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
                </div>
            </div>
            <div style= {{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',  
                padding:'20px'
            }}>
            <Button variant="warning" style={gradientButton}>See The Offers</Button>
            </div>
        </div>
    )
}

