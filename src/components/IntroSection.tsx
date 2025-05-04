import React from 'react';
import { Container, Title, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const StarWarsIntro: React.FC<{ pageType: 'list' | 'detail' }> = ({ pageType }) => {
  const navigate = useNavigate();

  return (
    <Container
      size="md"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:'1rem',
        height: '90px',
        background: 'linear-gradient(90deg, #0d47a1, #1e88e5)',
        color: '#ffee58', 
        borderRadius: '8px',
        padding: '0 3rem',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url('https://source.unsplash.com/1920x1080/?stars,galaxy') center / cover`,
          opacity: 0.15,
          animation: 'starMove 10s linear infinite',
          zIndex: -1,
        }}
      ></div>

      {pageType === 'detail' && (
        <Anchor
          onClick={() => navigate(-1)}
          style={{
            fontSize: '1rem',
            color: '#ffee58',
            textDecoration: 'none',
            fontWeight: 500,
            textShadow: '0 0 5px #ffee58',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          &larr; Back
        </Anchor>
      )}

      <Title
        order={2}
        style={{
          margin: 0,
          fontSize: '1.5rem',
          textAlign: 'center',
          textShadow: '0 0 10px #ffee58, 0 0 20px #ffee58',
          animation: 'fadeIn 1.5s ease-out',
        }}
      >
        {pageType === 'list' ? 'Star Wars Resources' : 'Character Details'}
      </Title>
    </Container>
  );
};

export default StarWarsIntro;
