import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { BUTTON_COLORS, DashboardChildProps } from ".";
import { AD_TERM } from "../../constants/constants";
import useTotalAdStatus from "../../hook/useTotalAdStatus";
import { AdStatus } from "../../interfaces/database";

function TotalAdStatus({
  selectedField,
  setSelectedField,
}: DashboardChildProps) {
  const { getTotalAdStatus, totalAdStatus } = useTotalAdStatus({
    gte: new Date("2022-2-1"),
    lte: new Date("2022-2-7"),
  });

  const makeChartData = () => {
    if (!totalAdStatus) return;

    return totalAdStatus?.map((status) => {
      const data = { date: status.date };
      // @ts-ignore
      selectedField.forEach((field) => (data[field] = status[field]));
      return data;
    });
  };

  const makeTotalValue = (type: keyof AdStatus) =>
    totalAdStatus?.reduce((acc, cur) => acc + cur[type], 0);
  const cardList = ["roas", "cost", "imp", "ctr", "cvr", "convValue"] as const;

  return (
    <StatusContainer>
      <StatusTitle>통합 광고 현황</StatusTitle>
      <StatusBody>
        <SectionBetween>
          {cardList.map((name, idx) => (
            <Card key={idx}>
              <CardTitle>{AD_TERM[name] || name}</CardTitle>
              <CardValue>
                {makeTotalValue(name)?.toLocaleString() || ""}
              </CardValue>
            </Card>
          ))}
        </SectionBetween>
        <Section>
          {selectedField.map((field, idx) => (
            <Button key={idx}>
              <Dot dotColor={BUTTON_COLORS[idx]} />
              {field}
            </Button>
          ))}
        </Section>
        <Section>
          <ResponsiveContainer minWidth={400} width={"100%"} height={200}>
            <LineChart data={makeChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              {selectedField.map((field, idx) => (
                <Line
                  key={idx}
                  type="monotone"
                  dataKey={field}
                  stroke={BUTTON_COLORS[idx]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Section>
      </StatusBody>
    </StatusContainer>
  );
}
export default TotalAdStatus;

const StatusContainer = styled.div``;
const StatusTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 1rem;
`;
const StatusBody = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
const SectionBetween = styled(Section)`
  justify-content: space-between;
`;

const Card = styled.div`
  border: 1px solid gray;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  width: 10rem;
  gap: 1rem;
`;

const CardTitle = styled.h4`
  font-weight: 600;
  font-size: 0.7rem;
  color: gray;
`;
const CardValue = styled.p`
  font-weight: 600;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid lightgray;
  border-radius: 6px;
  padding: 0.3rem 1rem;
  width: 6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const Dot = styled.div<{ dotColor?: string }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 100%;
  background-color: ${(props) => props.dotColor};
`;
