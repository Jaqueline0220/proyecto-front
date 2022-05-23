import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MContainer } from 'components/molecules/MContainer';
import { MBox } from 'components/molecules/MBox';
import { useNavigate } from 'react-router-dom';
import { Abutton } from 'components/atoms/AButton';
import { getServicesByUser } from 'store/servicioReducer';

const HomePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const servicios = useSelector((state) => state.servicio.currentService);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getServicesByUser(currentUser._id)).then(() => {
      setIsLoading(false);
    });
  }, []);

  const estados = {
    '62425882b46db72a3afdb9f9': 'Pendiente',
    '6260d2ec5af517fd619899d8': 'Practicado',
    '6260d2fd5af517fd619899da': 'Proceso',
  };
  return (
    <>
      <MContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-semibold text-lg">Vocabulary</h3>
          <button
            className=" bg-primary text-white px-3 py-1 rounded"
            onClick={() => {
              navigate('/servicio/create');
            }}>
            Nueva Palabra
          </button>
        </div>
      </MContainer>
      <MContainer>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : servicios.length === 0 ? (
            <div className="text-center text-2xl">
              Aún tienes palabras registradas{' '}
              <span className="text-3xl">😢</span>
            </div>
          ) : (
            servicios.map((servicio) => (
              <MBox key={servicio._id} className="bg-white p-4">
                <div className="text-xs">
                  {new Intl.DateTimeFormat('en-US').format(
                    new Date(servicio.createdAt),
                  )}{' '}
                  <span className="bg-secondary py-1 rounded-full text-sm px-2 font-bold">
                    {servicio.Aprendido
                      ? estados['6260d2ec5af517fd619899d8']
                      : estados['62425882b46db72a3afdb9f9']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {servicio.detalle}
                    </h3>
                    <span className="text-lg">{servicio.observacion}</span>
                    <h3 className="font-semibold text-lg">Palabra:</h3>
                    <span className="text-lg">
                      {servicio !== undefined
                        ? servicio.descripcion +
                          ' ' +
                          servicio.detalle +
                          ' ' +
                          servicio.observacion
                        : ''}
                    </span>
                    <h3 className="font-semibold text-lg">Practicas:</h3>
                    <span className="text-lg">{`${servicio.numeroRepeticiones}`}</span>
                  </div>
                  <div className="flex items-center">
                    {servicio.idEstadoServicio !==
                      '62425882b46db72a3afdb9f9' && (
                      <Abutton
                        onClick={() => {
                          navigate('/servicio/finalizar/' + servicio._id);
                        }}
                        className="!justify-start bg-red text-red-800">
                        <span className="flex-1 whitespace-nowrap">
                          Finalizar Solicitud
                        </span>
                      </Abutton>
                    )}
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

export default HomePage;
