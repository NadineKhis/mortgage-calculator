import React from "react";
import styled from "styled-components";
import backgroundImg from "./assets/bg.jpg"
// import FormContainer from "./components/FormContainer";
import Fields from "./components/FormContainer";

const Container = styled.div`
  background: url(${backgroundImg}) center;
  background-size: cover;
  padding: 2rem 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const App = () => {
  return (
    <Container>
      {/*<FormContainer />*/}
      <Fields />
    </Container>
  )
}

export default App;