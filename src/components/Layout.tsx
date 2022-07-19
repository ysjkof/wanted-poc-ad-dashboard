import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./Navigation";

function Layout() {
  return (
    <Container>
      <Navigation />
      layout
      <Outlet />
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  background-color: tomato;
  height: 100vh;
  width: 100vw;
  display: flex;
`;
