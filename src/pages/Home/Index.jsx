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
  console.log(servicios);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), ''),
    );
  }
  useEffect(() => {
    dispatch(getServicesByUser(currentUser._id)).then(() => {
      setIsLoading(false);
    });
  }, []);

  const estados = {
    '62425882b46db72a3afdb9f9': 'Pendiente',
    '6260d2ec5af517fd619899d8': 'Aprendida',
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
              <MBox key={servicio.servicio._id} className="bg-white p-4">
                <div className="text-xs">
                  {new Intl.DateTimeFormat('en-US').format(
                    new Date(servicio.servicio.createdAt),
                  )}{' '}
                  <span className="bg-secondary py-1 rounded-full text-sm px-2 font-bold">
                    {servicio.servicio.aprendido
                      ? estados['6260d2ec5af517fd619899d8']
                      : estados['62425882b46db72a3afdb9f9']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {servicio.servicio.descripcion}
                    </h3>
                    <h3 className="font-semibold">Oracion:</h3>
                    <span className="text-lg">
                      {servicio.servicio !== undefined
                        ? servicio.servicio.detalle
                        : ''}
                    </span>
                    <h3 className="font-semibold">Meta Practicas:</h3>
                    <span className="">{`${servicio.servicio.numeroRepeticiones}`}</span>
                    <h3 className="font-semibold">Repeticiones:</h3>
                    <span className="">{`${servicio.servicio.numeroPracticas}`}</span>
                  </div>
                  <div>
                    <img
                      width="50%"
                      alt="imagen"
                      src={
                        servicio.detalle !== undefined
                          ? `data:image/png;base64,${toBase64(
                              servicio.detalle.rutaImg.data,
                            )}`
                          : ''
                      }></img>
                  </div>
                  <div className="flex items-center">
                    {!servicio.servicio.aprendido && (
                      <Abutton
                        onClick={() => {
                          navigate(
                            '/servicio/finalizar/' + servicio.servicio._id,
                          );
                        }}
                        className="btnPracticar">
                        <span className="flex-1 whitespace-nowrap">
                          Practicar
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
