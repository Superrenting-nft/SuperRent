import React from 'react'

export default function LorenIpsun() {
    const lorenStyle ={
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        margin:'3rem',
        
    };

    const contentDivStyle ={ 
        margin:'3rem',
        width: '15rem'
    };
    return (
        <div style={lorenStyle}>
            <h1 style={{padding:'3rem', width:'20%'}}>Hello Guys This is An Important Part</h1>
            <div style={contentDivStyle}>
            <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
            </div>
            
            <div style={contentDivStyle}>
            <p> Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. </p>
            </div>
            <div style={contentDivStyle}>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
            </div>
        </div>
    )
}
