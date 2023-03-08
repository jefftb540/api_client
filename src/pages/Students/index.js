import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import {
  FaEdit,
  FaExclamation,
  FaUserCircle,
  FaWindowClose,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { NewStudent, ProfilePicture, StudentContainer, Title } from './styled';
import { Container } from '../../styles/globalStyles';
import axios from '../../services/axios';
import Loading from '../../components/loading';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/students');
      setStudents(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    const confirmeDelete = e.currentTarget.nextSibling;
    confirmeDelete.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleConfirmeDelete = async (e, id, index) => {
    try {
      setIsLoading(true);
      await axios.delete(`/students/${id}`);
      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
    } catch (error) {
      const status = get(error, 'response.status', []);
      if (status === 401) toast.error('Você precisa estar logado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Alunos</Title>
      <NewStudent to="/students/">Novo Aluno</NewStudent>
      <StudentContainer>
        {students.map((student, index) => (
          <div key={String(student.id)}>
            <ProfilePicture>
              {get(student, 'Photos[0].url', false) ? (
                <img src={student.Photos[0].url} alt="Foto do aluno" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{student.name}</span>
            <span>{student.email}</span>
            {isLoggedIn && (
              <>
                <Link to={`/students/${student.id}`}>
                  <FaEdit size={18} />
                </Link>

                <Link
                  to={`/students/delete/${student.id}`}
                  onClick={handleDelete}
                >
                  <FaWindowClose size={18} />
                </Link>
                <FaExclamation
                  size={18}
                  display="none"
                  cursor="pointer"
                  onClick={(e) => handleConfirmeDelete(e, student.id, index)}
                />
              </>
            )}
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
