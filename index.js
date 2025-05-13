import { useState } from "react";

export default function Home() {
  const [activityName, setActivityName] = useState("");
  const [duration, setDuration] = useState("");

  const salvarEIrParaAtividade = () => {
    localStorage.setItem("atividade_nome", activityName);
    localStorage.setItem("atividade_tempo", duration);
    window.location.href = "/atividade";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎓 Bem-vindo ao Programa de Concentração</h1>
      <p>"Você é capaz de conquistar tudo o que visualiza com clareza." — O Segredo</p>

      <h2>🔔 Criar nova atividade</h2>
      <input
        type="text"
        placeholder="Nome da atividade"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duração (minutos)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ marginLeft: 10 }}
      />
      <button onClick={salvarEIrParaAtividade} style={{ marginLeft: 10 }}>
        Seguir
      </button>

      <h2>🌠 Quadro dos Sonhos</h2>
      <a href="/quadro"><button>Ver / Criar Quadro</button></a>

      <h2>🔮 Visualização</h2>
      <a href="/visualizacao"><button>Iniciar Visualização</button></a>

      <h2>💬 Afirmações</h2>
      <a href="/afirmacoes"><button>Escrever Afirmações</button></a>
    </div>
  );
}
