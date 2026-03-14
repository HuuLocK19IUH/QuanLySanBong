import React from 'react';

const Footer = () => {
  return (
    <footer 
      style={{
        backgroundColor: '#90B77D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80px',
        marginTop: '40px',
        width: '100%'
      }}
    >
      <p 
        style={{
          color: '#F0F8A4',
          fontFamily: "'Kanit', sans-serif", 
          fontSize: '16px',
          margin: 0,
          fontWeight: 500
        }}
      >
        Copyright © 2026 My Court. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;