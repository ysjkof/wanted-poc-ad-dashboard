import styled from "styled-components";
import { useState } from "react";
import { DailyAdStatus } from "../../interfaces/database";
import Header from "./Header";
import TotalAdStatus from "./TotalAdStatus";
import MediaStatus from "./MediaStatus";

export const BUTTON_COLORS = ["#8884d8", "#82ca9d"];

type SelectedField = [keyof DailyAdStatus, keyof DailyAdStatus];
export interface DashboardChildProps {
  selectedField: SelectedField;
  setSelectedField: React.Dispatch<React.SetStateAction<SelectedField>>;
}

function Dashboard() {
  const [selectedField, setSelectedField] = useState<SelectedField>([
    "roas",
    "click",
  ]);

  return (
    <Container>
      <Header />
      <TotalAdStatus
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <MediaStatus
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
    </Container>
  );
}

export default Dashboard;

const Container = styled.div`
  background-color: #efefef;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  gap: 2rem;
  overflow-y: scroll;
`;
