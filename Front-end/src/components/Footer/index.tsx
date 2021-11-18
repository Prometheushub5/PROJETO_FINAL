import React from 'react';
import { FooterStyle } from './style';
import linkedin from '../../assets/img/linkedin.png'
import GitHubButton from 'react-github-btn'
const Footer: React.FC = () => {
  return (
      <FooterStyle>
        <p>Prometheus</p>
        <br/>
        <a href= "https://www.linkedin.com/in/fabio-tozoni/">
        <img src={linkedin} alt="my image" />
        </a>
        <GitHubButton href="https://github.com/Prometheushub5/DesafioGama/fork" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-repo-forked" aria-label="Fork Prometheushub5/DesafioGama on GitHub">Fork</GitHubButton>
      </FooterStyle>
  );
}

export default Footer;