import styled from "styled-components"

const NotFound = () => {
    return(
        <Div>
            <p style={{color: 'white', fontSize: '20px'}}>404 | Not Found</p>
        </Div>
    )
}

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #173e5b;
    height: 100%;
    width: 100%;
`

export default NotFound