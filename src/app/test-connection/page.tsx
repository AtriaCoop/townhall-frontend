import { useEffect, useState } from 'react';
import { fetcher } from '../../utils/apiClient';
import React from 'react';

export default function TestConnection() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetcher('/test-connection').then(data => setMessage(data.message));
  }, []);

  return <div>{message ? message : 'Loading...'}</div>;
}