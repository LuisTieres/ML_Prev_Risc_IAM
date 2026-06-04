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

