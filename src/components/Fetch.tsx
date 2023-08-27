import React, { useState } from 'react';
import axios from 'axios';

interface FetchProps {
  url: string;
}

export default function Fetch({ url }: FetchProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<string | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchGreeting = async (url: string) => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      console.log(data);
      const { greeting } = data;
      setGreeting(greeting);
      setButtonClicked(true);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setGreeting(null);
    }
  };

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting';

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role='alert'>Oops, failed to fetch!</p>}
    </div>
  );
}
