import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';
import load from './loading.gif';

export default function Loading({ isLoading }) {
  if (!isLoading) return <> </>;

  return (
    <Container>
      <div />
      <span>
        <img src={load} alt="Carregando" />
      </span>
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
