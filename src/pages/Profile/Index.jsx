import { useSelector } from 'react-redux';

import { ARouterLink } from 'components/atoms/ARouterLink';
import { MBox } from 'components/molecules/MBox';
import { MContainer } from 'components/molecules/MContainer';
import { MTable } from 'components/molecules/MTable';
import { useEffect, useState } from 'react';

export default () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const columns = [
    { key: 'label', title: '' },
    { key: 'value', title: '' },
  ];

  const dataAccount = [
    { label: 'Correo electrónico', value: currentUser.correo },
  ];

  const dataProfile = [
    {
      label: 'Nombre y apellidos',
      value: `${currentUser.nombre} ${currentUser.apellidoPaterno} ${currentUser.apellidoMaterno}`,
    },
    { label: 'Documento', value: currentUser.nroDocumento },
    { label: 'Teléfono', value: currentUser.celular },
  ];

  const columnsAddress = [
    { key: 'item', title: 'Nro' },
    { key: 'place', title: 'Lugar' },
    { key: 'address', title: 'Direccion' },
    { key: 'reference', title: 'Referencia' },
  ];
  const [dataAddress, setDataAddress] = useState([]);
  useEffect(() => {
    if (currentUser.direcciones) {
      for (let index = 0; index < currentUser.direcciones.length; index++) {
        const direccion = currentUser.direcciones[index];
        setDataAddress((prev) =>
          prev.concat({
            item: index + 1,
            place: `${direccion.distrito}-${direccion.provincia}-${direccion.departamento}`,
            address: `${direccion.tipoCalle} ${direccion.nombreCalle}`,
            reference: `${direccion.referencias}`,
          }),
        );
      }
    }
  }, []);

  return (
    <>
      <MContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-semibold text-lg">Mi Perfil</h3>
          <ARouterLink
            to="/profile/edit"
            className="bg-primary rounded-md  px-2">
            <span className="text-white">EDITAR</span>
          </ARouterLink>
        </div>
      </MContainer>
      <MContainer>
        <div className="flex justify-between mb-1 items-end">
          <h4 className=" text-black font-medium">Datos de la cuenta</h4>
        </div>
        <MBox className="bg-white border-2 border-secondary-100">
          <MTable columns={columns} isShowHeader={false} data={dataAccount} />
        </MBox>
      </MContainer>
      <MContainer>
        <div className="flex justify-between mb-1 items-end">
          <h4 className=" text-black font-medium">Datos personales</h4>
        </div>
        <MBox className="bg-white border-2 border-secondary-100">
          <MTable columns={columns} isShowHeader={false} data={dataProfile} />
        </MBox>
      </MContainer>
      <MContainer>
        <div className="flex justify-between items-end">
          <h4 className="text-black font-medium">Direcciones</h4>
          <ARouterLink
            to="/profile/addresses"
            className="bg-secondary rounded-md text-blue-800 px-2">
            Añadir nueva direccion
          </ARouterLink>
        </div>
        <MBox className="bg-white border-2 border-secondary-100 mt-2">
          <MTable
            columns={columnsAddress}
            isShowHeader={true}
            data={dataAddress}
          />
        </MBox>
      </MContainer>
    </>
  );
};
