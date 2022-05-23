import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import { MContainer } from 'components/molecules/MContainer';
import { MBox } from 'components/molecules/MBox';
import { MSelect } from 'components/molecules/forms/MSelect';
import { MInput } from 'components/molecules/forms/MInput';

import { updateUser } from 'store/authReducer';

export default function EditProfile() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = object({
    nombre: string().required('El nombre es requerido'),
    apellidoPaterno: string().required('El apellido paterno es requerido'),
    apellidoMaterno: string().required('El apellido materno es requerido'),
    correo: string().email().required('El correo es requerido'),
    celular: string().required('El celular es requerido'),
    nroDocumento: string().required('El nro de documento es requerido'),
    idRol: string().required('El rol es requerido'),
  });

  const roles = [
    { id: '6260d2165af517fd619899d1', name: 'GENERAL' },
    { id: '6260d2395af517fd619899d5', name: 'PROVEEDOR' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: currentUser.nombre,
      apellidoPaterno: currentUser.apellidoPaterno,
      apellidoMaterno: currentUser.apellidoMaterno,
      correo: currentUser.correo,
      celular: currentUser.celular,
      nroDocumento: currentUser.nroDocumento,
      idRol: JSON.stringify(
        roles.find((role) => role.id === currentUser.idRol),
      ),
    },
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(
      updateUser(
        {
          ...data,
          idRol: JSON.parse(data.idRol).id,
        },
        currentUser._id,
      ),
    ).then(() => {
      navigate('/profile');
    });
  });

  return (
    <>
      <MContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-semibold text-lg">
            Mi Perfil / Añadir dirección
          </h3>
          <button
            className=" bg-primary text-white px-3 py-1 rounded"
            onClick={onSubmit}>
            Guardar dirección
          </button>
        </div>
      </MContainer>
      <MContainer>
        <form onSubmit={onSubmit}>
          <MBox className="grid bg-white p-4">
            <MInput
              label="Nombre"
              name="nombre"
              register={register}
              error={errors.nombre?.message}
            />
            <MInput
              label="Apellido paterno"
              name="apellidoPaterno"
              register={register}
              error={errors.apellidoPaterno?.message}
            />
            <MInput
              label="Apellido materno"
              name="apellidoMaterno"
              register={register}
              error={errors.apellidoMaterno?.message}
            />
            <MInput
              label="Correo"
              name="correo"
              register={register}
              error={errors.correo?.message}
            />
            <MInput
              label="Celular"
              name="celular"
              type="number"
              register={register}
              error={errors.celular?.message}
            />
            <MInput
              label="Nro de documento"
              name="nroDocumento"
              type="number"
              register={register}
              error={errors.nroDocumento?.message}
            />
            <MSelect
              label="Roles"
              name="idRol"
              options={roles}
              labelKey="name"
              register={register}
              error={errors.idRol?.message}
            />
          </MBox>
        </form>
      </MContainer>
    </>
  );
}
