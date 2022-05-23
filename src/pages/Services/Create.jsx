import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';

import { MContainer } from 'components/molecules/MContainer';
import { MBox } from 'components/molecules/MBox';
import { MInput } from 'components/molecules/forms/MInput';
import { MSelect } from 'components/molecules/forms/MSelect';
import { Abutton } from 'components/atoms/AButton';
import { number } from 'yup';
import { createService } from 'store/servicioReducer';
import { useEffect } from 'react';

const CreateServicio = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = object({
    detalle: string().required('Detalle es requerido'),
    observacion: string().required('Observación es requerido'),
    monto: number().required('Monto es requerido'),
    idDireccion: string().required('Dirección es requerida'),
  });

  const [direcciones, setDirecciones] = useState([]);

  useEffect(() => {
    if (currentUser.direcciones) {
      const direcciones = currentUser.direcciones.map((d) => {
        return {
          value: d._id,
          label: `${d.tipoCalle} ${d.nombreCalle} ${d.numeroCalle} - ${d.distrito} - ${d.provincia} - ${d.departamento}`,
        };
      });
      setDirecciones(direcciones);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    const payload = {
      ...data,
      idCorePersona: currentUser._id,
      idEstadoServicio: '6260d2ec5af517fd619899d8',
      idDireccion: JSON.parse(data.idDireccion).value,
      estado: 'A',
      fechaCreacion: '2022-03-28T02:43:31.551Z',
      fechaModificacion: '2022-03-28T02:43:31.551Z',
      idUsuarioCreacion: 1,
      descripcion: '',
      idUsuarioModificacion: 1,
    };
    dispatch(createService(payload)).then(() => {
      navigate('/main');
    });

    reset();
  });

  console.log(currentUser.direcciones);

  return (
    <>
      <MContainer>
        <h2 className="text-2xl font-semibold">Desea Solicitar Servicio</h2>
      </MContainer>
      <MContainer>
        <MBox className="p-4 rounded-lg bg-white">
          {currentUser.direcciones.length > 0 ? (
            <form onSubmit={onSubmit}>
              <MInput
                label="Detalle"
                name="detalle"
                register={register}
                error={errors.detalle?.message}
              />
              <MInput
                label="Observación"
                name="observacion"
                register={register}
                error={errors.observacion?.message}
              />
              <MInput
                label="Monto"
                name="monto"
                type="number"
                register={register}
                error={errors.monto?.message}
              />
              <MSelect
                label="Dirección"
                name="idDireccion"
                options={direcciones}
                labelKey="label"
                register={register}
                error={errors.idDireccion?.message}
              />
              <Abutton type="submit">Crear solicitud</Abutton>
            </form>
          ) : (
            <div>
              <p className="mb-4">
                Por favor agregue una dirección para poder solicitar un servicio{' '}
                <span className="text-2xl">😢</span>
              </p>
              <div className="flex justify-center">
                <Abutton
                  onClick={() => navigate('/profile/addresses')}
                  className="w-48">
                  Agregar Dirección
                </Abutton>
              </div>
            </div>
          )}
        </MBox>
      </MContainer>
    </>
  );
};

export default CreateServicio;
