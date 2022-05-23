import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, number, object, ref } from 'yup';

import { authRegister } from 'store/authReducer';

import { MInput } from 'components/molecules/forms/MInput';
import { Abutton } from 'components/atoms/AButton';
import { ChevronLeftIcon } from '@heroicons/react/solid';

export const CardRegister = ({ setToggleAuth }) => {
  const dispatch = useDispatch();

  const [stepNext, setStepNext] = useState(true);

  const schemaOne = object({
    usuario: string().required('Usuario es requerido'),
    nombre: string().required('Nombre es requerido'),
    apellidoPaterno: string().required('Apellido Paterno es requerido'),
    apellidoMaterno: string().required('Apellido Materno es requerido'),
    correo: string()
      .email('Ingresar un correo valido')
      .required('Correo es requerido'),
  });

  const schemaTwo = object({
    nroDocumento: number().required('Nro. Documento es requerido'),
    celular: number().required('Celular es requerido'),
    contrasenia: string().required('Contraseña es requerida'),
    contraseniaConfirm: string()
      .oneOf([ref('contrasenia')], 'Las contraseñas no coinciden')
      .required('Confirmar contraseña es requerida'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stepNext ? schemaOne : schemaTwo),
  });

  const onSubmit = handleSubmit((data) => {
    if (stepNext) {
      reset(data);
      setStepNext(false);
    } else {
      const sample = {
        idTipoDocumento: '6226b89b7d601c360e01481d',
        idRol: '6260d2165af517fd619899d1',
        estado: 'A',
        fechaCreacion: '2022-03-07T06:30:27.128Z',
        fechaModificacion: '2022-03-07T06:30:27.128Z',
        idUsuarioCreacion: 1,
        idUsuarioModificacion: 1,
      };
      dispatch(authRegister(Object.assign(data, sample)));
      reset();
    }
  });

  return (
    <div className="p-4">
      <span
        className="text-sm flex hover:text-primary cursor-pointer"
        onClick={() => setToggleAuth(true)}>
        <ChevronLeftIcon className="w-4" /> Ir al login
      </span>
      <h3 className="text-black font-bold text-2xl mb-2">Registro</h3>
      <form onSubmit={onSubmit}>
        <div className={stepNext ? '' : 'hidden'}>
          <MInput
            label="Usuario"
            name="usuario"
            autoComplete="off"
            register={register}
            error={errors.usuario?.message}
          />
          <MInput
            label="Nombres"
            name="nombre"
            register={register}
            error={errors.nombre?.message}
          />
          <div className="grid grid-cols-2 gap-3">
            <MInput
              label="Apellido Paterno"
              name="apellidoPaterno"
              register={register}
              error={errors.apellidoPaterno?.message}
            />
            <MInput
              label="Apellido Materno"
              name="apellidoMaterno"
              register={register}
              error={errors.apellidoMaterno?.message}
            />
          </div>
          <MInput
            label="Correo Electronico"
            name="correo"
            type="email"
            register={register}
            error={errors.correo?.message}
          />
        </div>
        <div className={stepNext ? 'hidden' : ''}>
          <MInput
            label="Celular"
            name="celular"
            register={register}
            error={errors.celular?.message}
          />
          <MInput
            label="N° de Documento"
            name="nroDocumento"
            autoComplete="off"
            register={register}
            error={errors.nroDocumento?.message}
          />
          <MInput
            label="Contraseña"
            name="contrasenia"
            type="password"
            autoComplete="off"
            register={register}
            error={errors.contrasenia?.message}
          />
          <MInput
            label="Verificar Contraseña"
            name="contraseniaConfirm"
            type="password"
            autoComplete="off"
            register={register}
            error={errors.contraseniaConfirm?.message}
          />
        </div>
        <Abutton type="submit">
          {stepNext ? 'Siguiente' : 'Registrarse'}
        </Abutton>
      </form>
    </div>
  );
};
