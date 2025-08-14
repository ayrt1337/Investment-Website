import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

const ShowCards = props => {
  const for430Width = useMediaQuery({query: '(max-width: 724px)'})

  var { page } = useParams()

  const [imgs, setImgs] = useState([])
  const [indicators, setIndicators] = useState([])
  const [title, setTitle] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:3000/post-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({page: page})
      })
      const output = await response.json()

      if(output.imgs.length == 0 || output.indicators.length == 0 || output.title.length == 0){
        props.setNotFound(true)
        props.setFlag(false)
        document.getElementById('root').style.minHeight = '100vh'
        document.getElementById('root').style.overflow = 'hidden'
      }

      else{
        setImgs(output.imgs)
        setIndicators(output.indicators)
        setTitle(output.title)
      }
    }
    getData()
  }, [])

  const handleLoad = () => {
    if(document.getElementsByClassName('img')[0].src !== ''){
      props.setFlag(false)
      document.getElementById('root').style.minHeight = '100%'
      document.getElementById('root').style.overflow = 'visible'
    }
  }

  return (
    <>
      {imgs.map((img, index) => {
            return(
              <Link key={index} to={`/acao/${title[index].substring(title[index].lastIndexOf('-') + 2)}`} style={{textDecoration: 'none', display: 'flex', justifyContent: 'center'}}>
                <DivCard style={{
                  width: for430Width ? '100%' : '250px',
                  height: for430Width ? '100%' : '330px'
                }}>
                  <DivImg>
                    <Img className='img' onLoad={handleLoad} src={img} alt=''></Img>
                  </DivImg>
                
                  <div style={{padding: '25px 20px 0px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <H3>{title[index]}</H3>

                    <div style={{display: 'flex'}}>
                      <div style={{marginRight: '20px'}}>
                        <P style={{marginBottom: '5px'}}>P/L: {indicators[index].pl}</P>
                        <P>DY: {indicators[index].dy}</P>
                      </div>

                      <div>
                        <P style={{marginBottom: '5px'}}>P/VP: {indicators[index].pvp}</P>
                        <P>ROE: {indicators[index].roe}</P>
                      </div>
                    </div>
                  </div>
                </DivCard>
              </Link>
            ) 
          })
        }
    </>   
  )
}

const DivCard = styled.div`
  border-radius: 10px;
  background-color: #32384d;
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 330px;
  cursor: pointer;
  transition: ease-in-out 0.1s;

  &:hover{
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  }
`

const DivImg = styled.div`
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 150px;
`

const Img = styled.img`
  padding: 20px;
  width: 100%;
`

const H3 = styled.h3`
  text-align: center;
  font-size: 16px;
  color: #6faddc;
  font-weight: 600;
  margin-bottom: 15px;
`

const P = styled.p`
  color: white;
  font-size: 15px;
`

export default ShowCards