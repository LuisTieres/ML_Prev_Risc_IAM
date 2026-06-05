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

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 2000;
`;

export const ModalContent = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  z-index: 2001;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: white;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #0f172a;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #64748b;

    &:hover {
      color: #0f172a;
    }
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FormSection = styled.div`
  h3 {
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #334e68;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #1e88e5;
      box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
  background: white;

  button {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &.btn-cancel {
      background: #f1f5f9;
      color: #334e68;

      &:hover {
        background: #e2e8f0;
      }
    }

    &.btn-submit {
      background: #1e88e5;
      color: white;

      &:hover {
        background: #1565c0;
      }
    }
  }
`;

