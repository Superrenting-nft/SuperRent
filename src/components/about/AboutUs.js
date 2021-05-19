import React from 'react'

export default function AboutUs() {
    const aboutContainer = {
        display:'flex',
        flexDirection:'column',
        color: 'white',
        margin: '50px',
        padding:'20px',
    };

    return (
        <div style={aboutContainer}>
            <h1 style={{margin:'auto'}}>About Us</h1>
            <p style={{margin: '10px'}}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </p>
            <p style={{margin: '10px'}}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
            </p>
            <p style={{margin: '10px'}}>
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
            </p>
        </div>
    )
}
