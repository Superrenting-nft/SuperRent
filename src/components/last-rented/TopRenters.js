import React from 'react'
import Card from 'react-bootstrap/Card'

export default function TopRenters() {
    const trContainer ={ 
        display:'flex',
        flexDirection:'column',
        margin:'2rem',
        
        padding:'1rem'
    };

    const trText ={ 
         margin:'auto',
        padding:'1rem'
    };

    const trRenters ={ 
        display:'flex',
        flexDirection:'row', 
        margin:'1rem',
        
    };

    const renterStyle = {
        width: '20rem', 
        height:'4rem', 
        color:'black', 
        margin:'5px'
    };

    const blockStyle = {
        padding:'1rem', 
        margin:'auto'
    };
    return (
        <div style={trContainer}>
        <div style={trText}>
        <div style={{
            display:'flex',
            flexDirection:'column',
            alignContent:'center',
            justifyContent:'center',
            margin:'1rem',
            padding:'1rem'
        }}>
        <h1 style={{margin:'auto', padding:'1rem'}}>Lorem ipsum dolor</h1>
        <p>Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
        sapiente officiis modi at sunt excepturi expedita sint?</p>
        </div>
        </div>
        <div style={trRenters}>
            <div style={blockStyle}>
                <Card style={renterStyle}>
                    <Card.Body>
                    <Card.Title>Renter 1</Card.Title>
                    </Card.Body>
                </Card>
                <Card style={renterStyle}>
                <Card.Body>
                <Card.Title>Renter 2</Card.Title>
               </Card.Body>
            </Card>
            </div>
            <div style={blockStyle}>
                <Card style={renterStyle}>
                    <Card.Body>
                    <Card.Title>Renter 1</Card.Title>
                    </Card.Body>
                </Card>
                <Card style={renterStyle}>
                <Card.Body>
                <Card.Title>Renter 2</Card.Title>
               </Card.Body>
            </Card>
            </div>
            <div style={blockStyle}>
                <Card style={renterStyle}>
                    <Card.Body>
                    <Card.Title>Renter 1</Card.Title>
                    </Card.Body>
                </Card>
                <Card style={renterStyle}>
                <Card.Body>
                <Card.Title>Renter 2</Card.Title>
               </Card.Body>
            </Card>
            </div>
        </div>
            
        </div>
    )
}
