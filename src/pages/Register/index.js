import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Title } from './styled';
import { Container } from '../../styles/globalStyles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/loading';

export default function Register() {
  const id = useSelector((state) => state.auth.user.id);
  const storedName = useSelector((state) => state.auth.user.name);
  const storedEmail = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!id) return;

    setName(storedName);
    setEmail(storedEmail);
  }, [id, storedEmail, storedName]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
    let formErrors = false;

    if (name.length < 3 || name.length > 250) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 250 caracteres');
    }

    if (!id && (password.length < 6 || password.length > 250)) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 250 caracteres');
    }

    if (!validator.isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (formErrors) return;
    dispatch(actions.registerRequest({ id, name, email, password }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar dados' : 'Crie sua conta'}</Title>
      <Form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          {id ? 'Salvar' : 'Criar minha conta'}
        </button>
      </Form>
    </Container>
  );
}
