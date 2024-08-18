import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
  console.log('Authorization code:', code);

  const sendAuthCode = async () => {
    try {
      const response = await fetch(`/api/callback?code=${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/main');
      } else {
        throw new Error(`Failed to authenticate: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending authorization code:', error);
      setError('Failed to process the authorization code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  sendAuthCode();
} else {
  setLoading(false);
  setError('Authorization code is missing.');
}
  }, [location, navigate]);

  if (loading) {
    return <p>Processing authorization code...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Auth Page</h1>
    </div>
  );
};

export default Auth;
