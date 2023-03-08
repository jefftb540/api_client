/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/modules/example/actions';
import { Container } from '../../styles/globalStyles';
import { Form } from './styled';

export default function CreateClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(actions.createClientRequest({ name, email }));
  }
  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Container>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
