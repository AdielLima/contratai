// styles.jsx
import styled from "styled-components";

export const FooterContainer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid #ddd;
`;

export const FooterLinks = styled.div`
  margin-bottom: 1rem;

  a {
    margin: 0 1rem;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
    display: inline;

    &:hover {
      color: #0077ff;
    }
  }

  /* Se desejar que “Fale Conosco” seja um link, use <a> ao invés de <span> */
  span {
    margin: 0 1rem;
    cursor: pointer;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #0077ff;
    }
  }
`;

export const FooterInfo = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;
