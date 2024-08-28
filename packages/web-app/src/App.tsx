import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./lib";

function App() {
  const [clients, setClients] = useState<any[]>([]);
  useEffect(() => {
    api.clients
      .$get()
      .then((response) => response.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <div>
      {clients.map((client) => (
        <div key={client.id}>{client.firstName}</div>
      ))}
    </div>
  );
}

export default App;
