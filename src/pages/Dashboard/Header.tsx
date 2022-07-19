import styled from "styled-components";

function Header() {
  return (
    <Container>
      <Title>대시보드</Title>
      <MultiSelector>
        {[1, 2, 3, 4, 5].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </MultiSelector>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem 0;
`;
const MultiSelector = styled.select`
  height: fit-content;
`;
