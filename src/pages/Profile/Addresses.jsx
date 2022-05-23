import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import { ubigeo } from 'peruuse';

import { useGeolocation } from 'hooks/useGeolocation';

import MMap from 'components/molecules/MMap';
import { MContainer } from 'components/molecules/MContainer';
import { MBox } from 'components/molecules/MBox';
import { MSelect } from 'components/molecules/forms/MSelect';
import { MTextarea } from 'components/molecules/forms/MTextarea';
import { MInput } from 'components/molecules/forms/MInput';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAddressUser } from 'store/authReducer';

function AddAddress() {
  const { position } = useGeolocation();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPosition, setNewPosition] = useState({
    lng: -75.1151377973355,
    lat: -11.429155004201874,
  });

  useEffect(() => {
    if (position) {
      setNewPosition(position);
    }
  }, [position]);

  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [type, setType] = useState('Jiron');

  const schema = object({
    departmento: string().required('Departamento es requerido'),
    provincia: string().required('Provincia es requerida'),
    distrito: string().required('Distrito es requerido'),
    tipo: string().required('Tipo es requerido'),
    numberType: string().required('Número es requerido'),
    nameType: string().required('Nombre es requerido'),
    piso: string(),
    referencia: string(),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(
      addAddressUser(
        {
          ...data,
          coordenadas: {
            latitude: newPosition.lat,
            longitude: newPosition.lng,
          },
          idCorePersona: currentUser._id,
          departamento: JSON.parse(data.departmento).name,
          provincia: JSON.parse(data.provincia).name,
          distrito: JSON.parse(data.distrito).name,
          tipoCalle: data.tipo,
          numeroCalle: data.numberType,
          nombreCalle: data.nameType,
          pisoDepartamento: data.piso,
          referencias: data.referencia,
          observacion: 'visto',
          descripcion: 'vistito',
          estado: 'A',
          fechaCreacion: '2022-04-08T02:43:31.551Z',
          fechaModificacion: '2022-04-08T02:43:31.551Z',
          idUsuarioCreacion: 1,
          idUsuarioModificacion: 1,
        },
        currentUser._id,
      ),
    ).then(() => {
      navigate('/profile');
    });
  });

  useEffect(() => {
    const _departments = ubigeo.getDepartments();
    const _provinces = ubigeo.getProvince(_departments[0].code);
    const _districts = ubigeo.getDistrict(_provinces[0].code);
    setDepartments(_departments);
    setProvinces(_provinces);
    setDistricts(_districts);
  }, []);

  const onChangeDepartment = (e) => {
    const departmentCode = JSON.parse(e.target.value).code;
    const _provinces = ubigeo.getProvince(departmentCode);
    const _districts = ubigeo.getDistrict(_provinces[0].code);
    setProvinces(_provinces);
    setDistricts(_districts);
  };

  const onChangeProvince = (e) => {
    const provinceCode = JSON.parse(e.target.value).code;
    setDistricts(ubigeo.getDistrict(provinceCode));
  };

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
          <MBox className="grid grid-cols-2 rounded-lg bg-white">
            <div className="p-4">
              <MSelect
                label="Departamento"
                name="departmento"
                options={departments}
                labelKey="name"
                register={register}
                error={errors.departmento?.message}
                onChange={onChangeDepartment}
              />
              <div className="flex gap-4">
                <MSelect
                  label="Provincia"
                  className="w-1/2"
                  name="provincia"
                  options={provinces}
                  labelKey="name"
                  register={register}
                  error={errors.province?.message}
                  onChange={onChangeProvince}
                />
                <MSelect
                  label="Distrito"
                  className="w-1/2"
                  name="distrito"
                  options={districts}
                  labelKey="name"
                  register={register}
                  error={errors.distrito?.message}
                />
              </div>
              <div className="flex gap-4">
                <MSelect
                  label="Tipo de calle"
                  className="w-1/3"
                  name="tipo"
                  options={['Jiron', 'Calle', 'Avenida']}
                  register={register}
                  onChange={(e) => setType(e.target.value)}
                  error={errors.tipo?.message}
                />
                <MInput
                  label={`Nombre del ${type}`}
                  name="nameType"
                  className="w-2/3"
                  register={register}
                  error={errors.nameType?.message}
                />
              </div>
              <div className="flex gap-4">
                <MInput
                  label={`Número del ${type}`}
                  name="numberType"
                  className="w-2/3"
                  register={register}
                  error={errors.numberType?.message}
                />
                <MInput
                  label="Piso / Departamento"
                  name="piso"
                  className="w-2/3"
                  register={register}
                  error={errors.piso?.message}
                />
              </div>
              <MTextarea
                label="Referencias"
                name="referencia"
                register={register}
                error={errors.referencia?.message}
              />
            </div>
            <div>
              <MMap position={newPosition} onSetPosition={setNewPosition} />
            </div>
          </MBox>
        </form>
      </MContainer>
    </>
  );
}

export default AddAddress;
