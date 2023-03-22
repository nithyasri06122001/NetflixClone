import React from 'react';
import background from '../assests/Background.png';
import styled  from 'styled-components';

function BackgroundImage() {
  return (
    <Container>
        <img src={background} alt="background" />
    </Container>
  )
}
const Container=styled.div`
  height:auto;
  width:100vw;
  img{
    height:100vh;
    width:100vw;
  }
`;
export default BackgroundImage