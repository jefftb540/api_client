import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, ProfilePicture, Title } from './styled';
import { Container } from '../../styles/globalStyles';
import axios from '../../services/axios';
import Loading from '../../components/loading';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

// import store from '../../store';

export default function Student({ match }) {
  const id = get(match, 'params.id', '');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [high, setHigh] = useState('');
  const [weight, setWeight] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/students/${id}`);
        setPhoto(get(data, 'Photos[0.url]', ''));

        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHigh(data.high);
      } catch (error) {
        const status = get(error, 'response.status', 0);
        const errors = get(error, 'response.data.errors', []);

        if (status === 400) errors.map((err) => toast.error(err));
        history.push('/');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;
    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }

    if (lastname.length < 3 || lastname.length > 255) {
      formErrors = true;
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (!isInt(age)) {
      formErrors = true;
      toast.error('Idade precisa ser um número');
    }

    if (!isFloat(weight)) {
      formErrors = true;
      toast.error('Peso precisa ser um número');
    }

    if (!isFloat(high)) {
      formErrors = true;
      toast.error('Altura precisa ser um número');
    }

    if (formErrors) return;
    try {
      if (id) {
        await axios.put(`/students/${id}`, {
          name,
          lastname,
          email,
          age,
          high,
          weight,
        });
        toast.success('Aluno editado');
      } else {
        await axios.post(`/students/`, {
          name,
          lastname,
          email,
          age,
          high,
          weight,
        });
        toast.success('Aluno criado');
      }
    } catch (error) {
      const status = get(error, 'response.status', 0);
      const errors = get(error, 'response.data.errors', []);

      if (errors.length > 0) errors.map((err) => toast.error(err));
      else toast.error('Erro desconhecido');

      if (status === 401) {
        toast.error('Você precisa estar logado');
        dispatch(actions.loginFailure());
      }
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar Alunno' : 'Novo Aluno'}</Title>
      {id && (
        <ProfilePicture>
          {photo ? (
            <img src={photo} alt={`${name} ${lastname}`} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Seu Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Sua idade"
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Seu peso"
        />
        <input
          type="number"
          value={high}
          onChange={(e) => setHigh(e.target.value)}
          placeholder="Sua altura"
        />
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
