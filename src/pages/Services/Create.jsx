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
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const schema = object({
    descripcion: string().required('Descripcion es requerido'),
    detalle: string().required('Detalle es requerido'),
    numeroRepeticiones: number().required('Numero Repeticiones es requerido'),
  });

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
      numeroPracticas: 0,
      rutaImg: fileDataURL,
      aprendido: data.aprendido,
      fechaCreacion: '2022-05-23T02:43:31.551Z',
      fechaModificacion: '2022-05-23T02:43:31.551Z',
      idUsuarioCreacion: 1,
      idUsuarioModificacion: 1,
    };
    dispatch(createService(payload)).then(() => {
      navigate('/main');
    });

    reset();
  });

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert('Imagen no valida.');
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <>
      <MContainer>
        <h2 className="text-2xl font-semibold">Desea Solicitar Servicio</h2>
      </MContainer>
      <MContainer>
        <MBox className="p-4 rounded-lg bg-white">
          <form onSubmit={onSubmit}>
            <MInput
              label="Descripcion"
              name="descripcion"
              mostrarlabel={true}
              className="txtFormulario"
              register={register}
              error={errors.descripcion?.message}
            />
            <MInput
              label="Detalle"
              name="detalle"
              className="txtFormulario"
              mostrarlabel={true}
              register={register}
              error={errors.detalle?.message}
            />
            <MInput
              label="Meta Practicas"
              name="numeroRepeticiones"
              className="txtFormulario"
              mostrarlabel={true}
              type="number"
              register={register}
              error={errors.numeroRepeticiones?.message}
            />
            <p>
              <label htmlFor="image"> Cargar imagen</label>
              <input
                type="file"
                id="image"
                accept=".png, .jpg, .jpeg"
                onChange={changeHandler}
              />
            </p>
            {fileDataURL ? (
              <div className="img-preview-wrapper">
                {<img width="50%" src={fileDataURL} alt="preview" />}
              </div>
            ) : null}
            <MSelect
              label="Aprendido"
              name="aprendido"
              options={[
                {
                  value: false,
                  label: 'No',
                },
                {
                  value: true,
                  label: 'Si',
                },
              ]}
              labelKey="label"
              register={register}
            />
            <Abutton type="submit" className="px-3 py-1 rounded">
              Crear Palabra
            </Abutton>
          </form>
        </MBox>
      </MContainer>
    </>
  );
};

export default CreateServicio;
