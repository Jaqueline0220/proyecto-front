import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { findUsers } from 'store/userReducer';

import { MBox } from 'components/molecules/MBox';
import { MContainer } from 'components/molecules/MContainer';
import { MTable } from 'components/molecules/MTable';

export default () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(findUsers()).then(() => {
      setIsLoading(false);
    });
  }, []);

  const columns = [
    { key: 'nombre', title: 'Nombre' },
    { key: 'correo', title: 'Correo' },
    { key: 'celular', title: 'Teléfono' },
  ];

  return (
    <>
      <MContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-semibold text-lg">
            Lista de usuarios
          </h3>
        </div>
      </MContainer>
      <MContainer>
        <MBox className="bg-white border-2 border-secondary-100">
          <MTable isLoading={isLoading} columns={columns} data={users} />
        </MBox>
      </MContainer>
    </>
  );
};
