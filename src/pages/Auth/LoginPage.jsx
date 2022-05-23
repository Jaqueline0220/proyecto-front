import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AuthLayout } from 'layouts/AuthLayout';
import { CardLogin } from 'pages/Auth/components/CardLogin';
import { CardRegister } from 'pages/Auth/components/CardRegister';

const LoginPage = () => {
  const navigate = useNavigate();

  const [toggleAuth, setToggleAuth] = useState(true);
  const token = useSelector((state) => state.auth.token);
  console.log(useSelector((state) => state.auth));
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      navigate('/main');
    }
  }, [token]);

  return (
    <AuthLayout>
      <div className="w-[60rem] p-2 rounded-2xl">
        <div className="grid-cols-[3fr_2fr]">
          {toggleAuth ? (
            <CardLogin setToggleAuth={setToggleAuth} />
          ) : (
            <CardRegister setToggleAuth={setToggleAuth} />
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
