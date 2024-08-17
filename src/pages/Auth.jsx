import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    console.log("test");
    if (code) {
      console.log('Authorization code:', code);
      // 여기에 카카오 인가 코드 벡엔드에게 보내면 됩니다. 
      navigate("/main");
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Auth Page</h1>
      <p>Processing authorization code...</p>
    </div>
  );
};

export default Auth;