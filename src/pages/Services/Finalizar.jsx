import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MContainer } from 'components/molecules/MContainer';
import { MBox } from 'components/molecules/MBox';
import { getServicesByUser } from 'store/servicioReducer';
import { Abutton } from 'components/atoms/AButton';
import { useParams } from 'react-router-dom';
import { MInput } from 'components/molecules/forms/MInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import { updateService } from 'store/servicioReducer';
import { useNavigate } from 'react-router-dom';
const FinalizarPage = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const servicios = useSelector((state) => state.servicio.currentService);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getServicesByUser(null, '6260d2ec5af517fd619899d8')).then(() => {
      setIsLoading(false);
    });
  }, []);

  const schema = object({
    detalle: string().required('Detalle es requerido'),
    observacion: string().required('Observación es requerido'),
    idDireccion: string().required('Dirección es requerida'),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function getCurrentDate(separator = '-') {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }

  const onSubmit = (detalle, obsevacion) => {
    const payload = {
      idServicio: params.id,
      detalle: detalle,
      observacion: obsevacion,
      idCorePersona: currentUser._id,
      idEstadoServicio: '62425882b46db72a3afdb9f9',
      estado: 'A',
      fechaCreacion: getCurrentDate(),
      fechaModificacion: getCurrentDate(),
      idUsuarioCreacion: 1,
      idUsuarioModificacion: 1,
    };
    dispatch(updateService(payload)).then(() => {
      navigate('/main');
    });
  };

  return (
    <>
      <MContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-semibold text-lg">
            Finalizar Solicitud
          </h3>
        </div>
      </MContainer>
      <MContainer>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            servicios
              .filter((servicio) => servicio._id === params.id)
              .map((servicio) => (
                <MBox className="p-4 rounded-lg bg-white">
                  <h3 className="font-semibold text-lg">Fecha</h3>
                  <div className="text-sm">
                    {new Intl.DateTimeFormat('en-US').format(
                      new Date(servicio.createdAt),
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">Cliente</h3>
                  <span className="text-lg">
                    {currentUser.nombre +
                      ' ' +
                      currentUser.apellidoPaterno +
                      ' ' +
                      currentUser.apellidoMaterno}
                  </span>
                  <div>
                    <MInput
                      label="Detalle"
                      name="detalle"
                      register={register}
                      value={servicio.detalle}
                      error={errors.detalle?.message}
                    />
                    <MInput
                      label="Observación"
                      name="observacion"
                      register={register}
                      value={servicio.observacion}
                      error={errors.observacion?.message}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
                        Proveedor de Servicio:
                      </h3>
                      <span className="text-lg">
                        {servicio.proveedor !== undefined
                          ? servicio.proveedor.nombre +
                            ' ' +
                            servicio.proveedor.apellidoPaterno +
                            ' ' +
                            servicio.proveedor.apellidoMaterno
                          : ''}
                      </span>
                      <h3 className="font-semibold text-lg">Dirección:</h3>
                      <span className="text-lg">
                        {`${servicio.direccion.tipoCalle} ${servicio.direccion.nombreCalle} ${servicio.direccion.numeroCalle} - ${servicio.direccion.distrito} - ${servicio.direccion.provincia} - ${servicio.direccion.departamento}`}
                      </span>
                    </div>
                    <Abutton
                      onClick={() =>
                        onSubmit(servicio.detalle, servicio.observacion)
                      }
                      className="!justify-start bg-red text-red-800">
                      <span className="flex-1 whitespace-nowrap">
                        Finalizar Solicitud
                      </span>
                    </Abutton>
                  </div>
                </MBox>
              ))
          )}
        </div>
      </MContainer>
    </>
  );
};

export default FinalizarPage;
