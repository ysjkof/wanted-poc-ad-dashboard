import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { BUTTON_COLORS, DashboardChildProps } from ".";
import { AD_TERM } from "../../constants/constants";
import useMediaStatus from "../../hook/useMediaStatus";

function MediaStatus({ selectedField, setSelectedField }: DashboardChildProps) {
  const { getMediaStatus, mediaStatus } = useMediaStatus({
    gte: new Date("2022-2-1"),
    lte: new Date("2022-2-7"),
  });
  const splitChannel = () => {
    const arrangedData = {};
    mediaStatus?.forEach((dailyReport) => {
      // @ts-ignore
      if (arrangedData[dailyReport.channel]) {
        // @ts-ignore
        arrangedData[dailyReport.channel] = [
          // @ts-ignore
          ...arrangedData[dailyReport.channel],
          dailyReport,
        ];
      } else {
        // @ts-ignore
        arrangedData[dailyReport.channel] = [dailyReport];
      }
    });
    return arrangedData;
  };

  const fieldList = [
    "click",
    "convValue",
    "cost",
    "cpa",
    "cpc",
    "ctr",
    "cvr",
    "imp",
    "roas",
  ] as const;

  const sumChannelValue = (
    mediaStatusByChannel: ReturnType<typeof splitChannel>
  ) => {
    return Object.values(mediaStatusByChannel).map((values) =>
      // @ts-ignore
      values.reduce(
        // @ts-ignore
        (acc, cur) => {
          for (let key in acc[1]) {
            if (acc[1][key]) {
              acc[1][key] = acc[1][key] + cur[key];
            } else {
              acc[1][key] = cur[key];
            }
          }
          if (!acc[0]) acc[0] = cur.channel;
          return acc;
        },
        [
          "",
          {
            click: 0,
            convValue: 0,
            cost: 0,
            cpa: 0,
            cpc: 0,
            ctr: 0,
            cvr: 0,
            imp: 0,
            roas: 0,
          },
        ]
      )
    );
  };

  const eachChannelData = sumChannelValue(splitChannel());
  const sumTotalValue = () =>
    eachChannelData.reduce(
      (acc, [_, values]) => {
        for (let key in acc) {
          if (acc[key]) {
            acc[key] = acc[key] + values[key];
          } else {
            acc[key] = values[key];
          }
        }
        return acc;
      },
      {
        click: 0,
        convValue: 0,
        cost: 0,
        cpa: 0,
        cpc: 0,
        ctr: 0,
        cvr: 0,
        imp: 0,
        roas: 0,
      }
    );

  return (
    <StatusContainer>
      <StatusTitle>매체 현황</StatusTitle>
      <StatusBody>
        <Section direction="column">
          <ResponsiveContainer minWidth={400} width={"100%"} height={200}>
            {/* 할일:그래프 */}
            <BarChart data={[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              {selectedField.map((field, idx) => (
                <Bar
                  key={idx}
                  type="monotone"
                  dataKey={field}
                  stackId="a"
                  fill={BUTTON_COLORS[idx]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Section>{" "}
        <Section direction="row">
          {selectedField.map((field, idx) => (
            <Button key={idx}>
              <Dot dotColor={BUTTON_COLORS[idx]} />
              {field}
            </Button>
          ))}
        </Section>
        <Section direction="column" hasScroll>
          <Table>
            <TRow>
              <TCell></TCell>
              {fieldList.map((key, idx) => (
                <TCell key={idx} color="lightgray" isSmall textAlign="right">
                  {AD_TERM[key]}
                </TCell>
              ))}
            </TRow>
            {eachChannelData.map((channel, idx) => {
              const [name, values] = channel;
              return (
                <TRow key={idx}>
                  <TCell>{name}</TCell>
                  {Object.values(values).map((value, idx) => (
                    <TCell key={idx} textAlign="right">
                      {/* @ts-ignore */}
                      {value.toLocaleString()}
                    </TCell>
                  ))}
                </TRow>
              );
            })}
            <TRow>
              <TCell color="blue">총계</TCell>
              {Object.values(sumTotalValue())?.map((value, idx) => (
                <TCell key={idx} textAlign="right" color="blue">
                  {/* @ts-ignore */}
                  {value}
                </TCell>
              ))}
            </TRow>
          </Table>
        </Section>
      </StatusBody>
    </StatusContainer>
  );
}

export default MediaStatus;

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
const Section = styled.div<{
  direction: "column" | "row";
  hasScroll?: boolean;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  overflow: ${(props) => (props.hasScroll ? "scroll" : "hidden")};
  flex-wrap: wrap;
  gap: 1rem;
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

const Table = styled.div`
  border-top: 1px solid lightgray;
`;
const TRow = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
`;
const TCell = styled.div<{
  textAlign?: "right" | "left" | "center";
  color?: string;
  isSmall?: boolean;
}>`
  width: 6rem;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "")};
  color: ${(props) => (props.color ? props.color : "gray")};
  font-size: ${(props) => (props.isSmall ? "0.7rem" : "0.9rem")};
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  padding-right: 1rem;
  font-weight: 600;
`;
