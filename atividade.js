import { useEffect, useState } from "react";

export default function Atividade() {
  const [tempoRestante, setTempoRestante] = useState(null);
  const [atividade, setAtividade] = useState("");
  const [pausado, setPausado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    const nome = localStorage.getItem("atividade_nome") || "Atividade";
    const tempo = parseInt(localStorage.getItem("atividade_tempo") || "0", 10);
    setAtividade(nome);
    setTempoRestante(tempo * 60);
  }, []);

  useEffect(() => {
    if (tempoRestante === null || pausado || finalizado) return;

    if (tempoRestante === 0) {
      setFinalizado(true);
      new Audio("https://www.soundjay.com/button/beep-07.wav").play();
      return;
    }

    const intervalo = setInterval(() => {
      setTempoRestante((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [tempoRestante, pausado, finalizado]);

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{atividade}</h1>
      <h2 style={{ fontSize: 48 }}>{tempoRestante !== null ? formatarTempo(tempoRestante) : "Carregando..."}</h2>
      {!finalizado && (
        <button onClick={() => setPausado(!pausado)}>
          {pausado ? "Retomar" : "Pausar"}
        </button>
      )}
      {finalizado && (
        <>
          <p>⏰ Tempo finalizado!</p>
          <button onClick={() => window.location.href = "/"}>🏠 Página Principal</button>
        </>
      )}
    </div>
  );
}
