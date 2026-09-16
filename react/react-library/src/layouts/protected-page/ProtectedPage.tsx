import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../services/fetchWithAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProtectedPage = () => {
  const [response, setResponse] = useState("Loading.....");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetchWithAuth(`${BASE_URL}/protected`);
        const data = await response.text();
        setResponse(data);
      } catch (error) {
        setResponse(`Failed to fetch protected data: ${error}`);
      }
    };
    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{response}</p>
    </div>
  );
};
