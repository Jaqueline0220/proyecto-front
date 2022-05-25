import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MContainer } from 'components/molecules/MContainer';
import { MBox } from 'components/molecules/MBox';
import { getServicesByUser } from 'store/servicioReducer';
import { Abutton } from 'components/atoms/AButton';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import { updateService } from 'store/servicioReducer';
import { useNavigate } from 'react-router-dom';
const FinalizarPage = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const servicios = useSelector((state) => state.servicio.currentService);
  console.log(servicios);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getServicesByUser(currentUser._id, null)).then(() => {
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
  console.log(params);
  const onSubmit = (
    numeroPracticas,
    descripcion,
    detalle,
    numeroRepeticiones,
  ) => {
    const payload = {
      numeroRepeticiones: numeroRepeticiones,
      idVocabulary: params.id,
      descripcion: descripcion,
      detalle: detalle,
      numeroPracticas: numeroPracticas + 1,
      idCorePersona: currentUser._id,
      aprendido: numeroPracticas + 1 === numeroRepeticiones ? true : false,
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

  function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), ''),
    );
  }

  return (
    <>
      <MContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-semibold text-lg">Practicar</h3>
        </div>
      </MContainer>
      <MContainer>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            servicios
              .filter((servicio) => servicio.servicio._id === params.id)
              .map((servicio) => (
                <MBox
                  key={servicio.servicio._id}
                  className="p-4 rounded-lg bg-white">
                  <h3 className="font-semibold text-lg">Fecha</h3>
                  <div className="text-sm">
                    {new Intl.DateTimeFormat('en-US').format(
                      new Date(servicio.servicio.createdAt),
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Palabra</h3>
                      <span className="">{servicio.servicio.descripcion}</span>
                      <h3 className="font-semibold">Oracion:</h3>
                      <span className="">{`${servicio.servicio.detalle}`}</span>
                      <h3 className="font-semibold">Meta Practicas:</h3>
                      <span className="">{`${servicio.servicio.numeroRepeticiones}`}</span>
                      <h3 className="font-semibold">Repeticiones:</h3>
                      <span className="">{`${servicio.servicio.numeroPracticas}`}</span>
                    </div>
                    <div>
                      <img
                        width="60%"
                        alt="imagen"
                        src={
                          servicio.detalle !== undefined
                            ? `data:image/png;base64,${toBase64(
                                servicio.detalle.rutaImg.data,
                              )}`
                            : ''
                        }></img>
                    </div>
                    <div>
                      <Abutton
                        onClick={() =>
                          onSubmit(
                            servicio.servicio.numeroPracticas,
                            servicio.servicio.descripcion,
                            servicio.servicio.detalle,
                            servicio.servicio.numeroRepeticiones,
                          )
                        }
                        className="!justify-start bg-red text-red-800 btnPracticar">
                        <span className="flex-1 whitespace-nowrap">
                          Practicar
                        </span>
                      </Abutton>
                    </div>
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
