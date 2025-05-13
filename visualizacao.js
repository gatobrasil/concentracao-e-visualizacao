import { useEffect, useState } from "react";

export default function Visualizacao() {
  const [tempoRestante, setTempoRestante] = useState(240);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    if (tempoRestante === 0) {
      setFinalizado(true);
      new Audio("https://www.soundjay.com/button/beep-07.wav").play();
      return;
    }

    const intervalo = setInterval(() => {
      setTempoRestante((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tempoRestante]);

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{
      height: "100vh",
      background: "radial-gradient(circle at center, #222 10%, #000 80%)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {!finalizado ? (
        <>
          <img
            src="https://media.tenor.com/lkkwOKIrB5QAAAAC/portal-hypnotic.gif"
            alt="Portal"
            style={{ width: 200, height: 200, borderRadius: "50%", marginBottom: 20 }}
          />
          <h1>🌌 Visualize seus sonhos...</h1>
          <h2 style={{ fontSize: 48 }}>{formatarTempo(tempoRestante)}</h2>
        </>
      ) : (
        <>
          <h1>⏰ Tempo finalizado!</h1>
          <button onClick={() => {
            setTempoRestante(240);
            setFinalizado(false);
          }}>🔁 Visualizar novamente</button>
          <button onClick={() => window.location.href = "/"}>🏠 Página Principal</button>
        </>
      )}
    </div>
  );
}
