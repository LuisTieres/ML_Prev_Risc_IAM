import styled from "styled-components";

export const HomeContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

export const HeroSection = styled.section`
  background: #e3f2fd;
  padding: 40px 32px;
  border-radius: 24px;
  text-align: center;
  margin-bottom: 32px;

  h2 {
    margin: 0 0 16px;
    font-size: clamp(2rem, 3vw, 3rem);
    color: #102a43;
  }

  p {
    margin: 0;
    font-size: 1.05rem;
    color: #334e68;
    max-width: 720px;
    margin-inline: auto;
    line-height: 1.75;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export const FeatureCard = styled.article`
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);

  h3 {
    margin-top: 0;
    margin-bottom: 12px;
    color: #0f172a;
  }

  p {
    margin: 0;
    color: #475569;
    line-height: 1.75;
  }
`;

export const NavTabs = styled.nav`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  border-bottom: 2px solid #e5e7eb;
`;

export const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ active }) => (active ? "#1E88E5" : "#64748b")};
  border-bottom: 3px solid ${({ active }) => (active ? "#1E88E5" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    color: #1E88E5;
  }
`;

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const StatsGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #1E88E5;

  h4 {
    margin: 0 0 12px;
    font-size: 14px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-value {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: #0f172a;
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #f8fafc;
    border-bottom: 2px solid #e5e7eb;
  }

  th {
    padding: 16px;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
    color: #334e68;
  }

  tbody tr:hover {
    background: #f8fafc;
  }

  .badge-active {
    display: inline-block;
    padding: 4px 12px;
    background: #dcfce7;
    color: #166534;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge-pending {
    display: inline-block;
    padding: 4px 12px;
    background: #fef3c7;
    color: #92400e;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge-shared {
    display: inline-block;
    padding: 4px 12px;
    background: #dcfce7;
    color: #166534;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge-not-shared {
    display: inline-block;
    padding: 4px 12px;
    background: #fee2e2;
    color: #991b1b;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }

  .btn-action {
    padding: 6px 12px;
    background: #1E88E5;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s ease;

    &:hover {
      background: #1565c0;
    }
  }
`;

