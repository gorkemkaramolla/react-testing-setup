import Fetch from '@/components/Fetch';
import React from 'react';

interface Props {}

const TestFetch: React.FC<Props> = () => {
  return <Fetch url='/greeting' />;
};

export default TestFetch;
