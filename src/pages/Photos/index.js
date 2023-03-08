import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Form, Title } from './styled';
import { Container } from '../../styles/globalStyles';
import Loading from '../../components/loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Photos({ match }) {
  const id = get(match, 'params.id', '');
  const dispatch = useDispatch;

  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');

  const handleChange = async (e) => {
    setIsLoading(true);
    const newPhoto = e.target.files[0];
    const photoURL = URL.createObjectURL(newPhoto);
    setPhoto(photoURL);

    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('photo', newPhoto);
    try {
      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
    } catch (error) {
      const { status } = get(error, 'response', 0);
      setIsLoading(false);
      toast.error('Erro ao enviar foto');
      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/students/${id}`);
        setPhoto(get(data, 'Photos[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        history.push('/');
      }
    };

    getData();
  }, [id]);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
