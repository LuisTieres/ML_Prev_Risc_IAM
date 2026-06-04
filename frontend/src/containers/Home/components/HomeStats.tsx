import { StatCard, StatsGrid } from "../home.styles";

type StatItem = {
  label: string;
  value: string | number;
};

type Props = {
  items: StatItem[];
};

export default function HomeStats({ items }: Props) {
  return (
    <StatsGrid>
      {items.map(item => (
        <StatCard key={item.label}>
          <h4>{item.label}</h4>
          <p className="stat-value">{item.value}</p>
        </StatCard>
      ))}
    </StatsGrid>
  );
}
