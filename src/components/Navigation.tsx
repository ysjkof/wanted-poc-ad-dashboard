import styled from "styled-components";
import monitor from "../assets/monitor.svg";
import graph from "../assets/graph.svg";

function Navigation() {
  return (
    <Container>
      <Buttons>
        <Button isSelect={true}>
          <img src={monitor} />
          대시보드
        </Button>
        <Button>
          <img src={graph} />
          광고관리
        </Button>
      </Buttons>
    </Container>
  );
}

export default Navigation;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  width: 10rem;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button<{ isSelect?: boolean }>`
  padding: 1rem 0.5rem;
  background-color: ${(props) => (props.isSelect ? "#dcdcdc" : "transparent")};
  color: ${(props) => (props.isSelect ? "blue" : "inherit")};
  font-weight: 600;
  border: none;
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  img {
    width: 1rem;
    height: 1rem;
  }
`;
