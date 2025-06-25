const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const input = document.getElementById("searchInput");
    const icon = document.getElementById("searchIcon");
    const tabela = document.getElementById("tabelaDados");
    const tabela1 = document.getElementById("tabelaDados1");
    const tabela2 = document.getElementById("tabelaDados2");
    const tabela3 = document.getElementById("tabelaDados3");
    const tabela4 = document.getElementById("tabelaDados4");
    const tabela5 = document.getElementById("tabelaDados5");
    const rcs = document.getElementById("rcsEscolha")
    const rc1 = document.getElementById("rc1")
    const rc2 = document.getElementById("rc2")
    const rc3 = document.getElementById("rc3")
    const rc4 = document.getElementById("rc4")
    const rc5 = document.getElementById("rc5")
    const imgCgr = document.querySelector(".imagemcgrdiv")
    let rcsTimeout = null;
    let animacaoConcluida = true;

    function clearAllRCs() {
      rc1.classList.remove("t1");
      rc2.classList.remove("t1");
      rc3.classList.remove("t1");
      rc4.classList.remove("t1");
      rc5.classList.remove("t1");
    }
function imgCgrToggle() {

    const ignorar = [rc1, rc2, rc3, rc4, rc5];
    const elementos = Array.from(document.querySelectorAll('.t1, .clicado'))
    .filter(el => !ignorar.includes(el)); // ignora rc1 ~ rc5
    const imgCgr = document.querySelector(".imagemcgrdiv")

    if (elementos.length > 0) {
      imgCgr.style.display = "none";
    } else {
      imgCgr.style.display = "flex";
    }
}

function rc1s() {
  if (!animacaoConcluida) return;
  clearAllRCs();
  rc1.classList.add("t1");
  rcsEscolha();
}

function rc2s() {
  if (!animacaoConcluida) return;
  clearAllRCs();
  rc2.classList.add("t1");
  rcsEscolha();
}

function rc3s() {
  if (!animacaoConcluida) return;
  clearAllRCs();
  rc3.classList.add("t1");
  rcsEscolha();
}

function rc4s() {
  if (!animacaoConcluida) return;
  clearAllRCs();
  rc4.classList.add("t1");
  rcsEscolha();
}

function rc5s() {
  if (!animacaoConcluida) return;
  clearAllRCs();
  rc5.classList.add("t1");
  rcsEscolha();
}

function rcsEscolha() {
  if (rcsTimeout !== null) clearTimeout(rcsTimeout);

  animacaoConcluida = false; // Bloqueia novos cliques até a animação acabar

  const allTabelas = [tabela1, tabela2, tabela3, tabela4, tabela5];
  let activeTabela = null;

  if (rc1.classList.contains("t1")) activeTabela = tabela1;
  else if (rc2.classList.contains("t1")) activeTabela = tabela2;
  else if (rc3.classList.contains("t1")) activeTabela = tabela3;
  else if (rc4.classList.contains("t1")) activeTabela = tabela4;
  else if (rc5.classList.contains("t1")) activeTabela = tabela5;

  if (activeTabela) {
    allTabelas.forEach(t => {
      if (t !== activeTabela) t.classList.add("t2");
    });
    activeTabela.style.display = "table";

    rcsTimeout = setTimeout(() => {
      allTabelas.forEach(t => {
        if (t !== activeTabela) {
          t.style.display = "none";
          t.classList.remove("t2");
        }
      });
      animacaoConcluida = true; // Libera novos cliques
      rcsTimeout = null;
    }, 800);
  }
}

function esconderTabelas() {
  [tabela1, tabela2, tabela3, tabela4, tabela5].forEach(t => t.style.display = "none");
  rcs.style.display = "none";
}

const conserva = document.querySelector(".conservaEspecial")

function Alternar1() {
  btn1.classList.toggle("t1");
  conserva.classList.toggle("t1");
  btn2.classList.remove("t1");
  btn3.classList.remove("t1");

  if (![rc1, rc2, rc3, rc4, rc5].some(rc => rc.classList.contains("t1"))) {
    rc1.classList.add("t1");
  }

  if (btn1.classList.contains("t1")) {
    rcsEscolha();
    rcs.style.display = "flex";
  } else {
    esconderTabelas();
  }
  imgCgrToggle();
}

function Alternar2() {
  btn2.classList.toggle("t1");
  btn1.classList.remove("t1");
  btn3.classList.remove("t1");
  conserva.classList.remove("t1");
  esconderTabelas();
  input.value = "";
  imgCgrToggle();
}

function Alternar3() {
  btn3.classList.toggle("t1");
  btn1.classList.remove("t1");
  btn2.classList.remove("t1");
  conserva.classList.remove("t1");
  esconderTabelas();
  input.value = "";
  imgCgrToggle();
}

function toggleSearch(forceClose = false) {
  const showInput = input.style.display === "inline-block";

  if (showInput || forceClose) {
    input.style.display = "none";
    [btn1, btn2, btn3].forEach(b => b.style.display = "inline-block");
    icon.classList.remove("clicado");
    tabela.style.display = "none";
    input.value = "";
    input.dispatchEvent(new Event("input"));

    if (btn1.classList.contains("t1")) {
      conserva.classList.add("t1");
    } else {
      conserva.classList.remove("t1");
    }

    if (btn1.classList.contains("t1")) {
      [tabela1, tabela2, tabela3, tabela4, tabela5].forEach(t => t.style.display = "table");
      rcsEscolha();
      rcs.style.display = "flex";
    } else {
      esconderTabelas();
    }
  } else {
    input.style.display = "inline-block";
    input.focus();
    [btn1, btn2, btn3].forEach(b => b.style.display = "none");
    icon.classList.toggle("clicado");
    conserva.classList.remove("t1");
    esconderTabelas();
    tabela.style.display = btn1.classList.contains("t1") ? "table" : "none";
  }
  imgCgrToggle();
}

// Filtra a tabela com base no conteúdo digitado
input.addEventListener("input", function () {
  const filtro = input.value.toLowerCase();
  const linhas = document.querySelectorAll("#tabelaDados tbody tr");

  linhas.forEach((linha) => {
    const textoLinha = linha.textContent.toLowerCase();
    linha.style.display = textoLinha.includes(filtro) ? "" : "none";
  });
});

// Função para pegar as células das colunas 1, 9, 17, etc.
const pegarColunasEspecificas = () => {
  const tabela = document.querySelector('table'); // Seleciona a tabela
  if (!tabela) return []; // Se a tabela não existir, retorna uma lista vazia
  const todasAsTds = tabela.querySelectorAll('td'); // Pega todas as células da tabela
  const resultado = []; // Array para armazenar as células selecionadas

  let i = 0;
  while (true) {
    const td = todasAsTds[i]; // Pega a célula na posição i
    if (!td) break; // Se não encontrar mais células, sai do loop
    resultado.push(td.textContent.trim()); // Adiciona o texto da célula ao resultado
    i += 8; // Avança para a próxima célula (8 posições à frente)
  }

  return resultado;
};

// Função para filtrar as sugestões conforme o que o usuário digita
const filtrarSugestoes = () => {
  const input = document.getElementById('searchInput');
  const inputValue = input.value.toLowerCase();
  const suggestionsList = document.getElementById('suggestionsList');
  
  // Chama a função para pegar as colunas específicas
  const sugestoes = pegarColunasEspecificas();
  
  // Filtra as sugestões
  const sugestoesFiltradas = sugestoes.filter(item => item.toLowerCase().includes(inputValue));
  
  // Limpa a lista de sugestões
  suggestionsList.innerHTML = '';
  
  // Exibe as sugestões filtradas
  if (sugestoesFiltradas.length > 0 && inputValue) {
    suggestionsList.style.display = 'block'; // Mostra a lista
    sugestoesFiltradas.forEach(sugestao => {
      const div = document.createElement('div');
      div.classList.add('suggestion-item');
      div.textContent = sugestao;
      div.onclick = () => {
        input.value = sugestao; // Preenche o input com a sugestão
        suggestionsList.style.display = 'none'; // Esconde a lista
      };
      suggestionsList.appendChild(div);
    });
  } else {
    suggestionsList.style.display = 'none'; // Esconde a lista se não houver sugestões
  }
};

// Adiciona o evento para filtrar sugestões ao digitar
document.getElementById('searchInput').addEventListener('input', filtrarSugestoes);

// Esconde a lista de sugestões ao clicar fora do input
document.addEventListener('click', (event) => {
  const suggestionsList = document.getElementById('suggestionsList');
  const input = document.getElementById('searchInput');
  if (!input.contains(event.target) && !suggestionsList.contains(event.target)) {
    suggestionsList.style.display = 'none'; // Esconde a lista se clicar fora do input ou da lista
  }
});

// Função para gerenciar a navegação com as setas e seleção com ENTER
const navegarSugestoes = () => {
  let sugestaoIndex = -1;
  const suggestionsList = document.getElementById('suggestionsList');
  const suggestionItems = document.querySelectorAll('.suggestion-item');
  const sugestao1 = pegarColunasEspecificas();
  const input = document.getElementById('searchInput');

  // Função para selecionar a sugestão com ENTER
  const selecionarSugestao = () => {
    if (sugestaoIndex !== -1) {
      input.value =  sugestao1[sugestaoIndex].textContent;
      suggestionsList.style.display = 'none'; // Esconde a lista de sugestões
    }
  };

  // Adiciona o evento de navegação com as setas e seleção com ENTER
  document.addEventListener('keydown', (event) => {
    const suggestionItems = document.querySelectorAll('.suggestion-item');

    if (suggestionItems.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (sugestaoIndex < suggestionItems.length - 1) {
        sugestaoIndex++;
      } else {
        sugestaoIndex = 0; // loop para o início
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (sugestaoIndex > 0) {
        sugestaoIndex--;
      } else {
        sugestaoIndex = suggestionItems.length - 1; // loop para o fim
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (sugestaoIndex !== -1) {
        input.value = suggestionItems[sugestaoIndex].textContent;
        suggestionsList.style.display = 'none';
        sugestaoIndex = -1;
        input.dispatchEvent(new Event("input"));
      }
    }

    // Atualiza visualmente a seleção
    suggestionItems.forEach((item, index) => {
      if (index === sugestaoIndex) {
        item.style.backgroundColor = '#555';
        item.style.color = '#fff';
      } else {
        item.style.backgroundColor = '';
        item.style.color = '';
      }
    });
  });
};

// Função para simular o clique em um elemento
const simularClique = (elemento) => {
  if (elemento) {
    elemento.click(); // Simula o clique no elemento
  }
};

// Função para verificar se Control + (ALGO) foi pressionado
const verificarTecla = (event) => {
  if (event.ctrlKey && event.key === 'f') { // Verifica se "Control" e "F" foram pressionados
    event.preventDefault(); // Impede qualquer ação padrão (como abrir atalhos de navegador)
    
    const elemento = document.getElementById('searchIcon'); // Substitua 'elementoAlvo' pelo ID do seu elemento
    simularClique(elemento); // Chama a função para simular o clique
  }
};

    function atualizarEscala() {
      const largura = window.innerWidth;
      const escala = largura / 1920;
      document.documentElement.style.setProperty('--escala', escala);
    }

    // Atualiza ao carregar e redimensionar
    atualizarEscala();
    window.addEventListener('resize', atualizarEscala);

// Adiciona o evento de keydown para a página inteira
document.addEventListener('keydown', verificarTecla);

const toggle = document.getElementById("toggleSwitch");
    let isOn = false;

    toggle.addEventListener("click", () => {
      isOn = !isOn;
      toggle.classList.toggle("on", isOn);
      toggle.classList.toggle("off", !isOn);

      if (isOn) {
        ativarFuncao();
      } else {
        desativarFuncao();
      }
    });

    function ativarFuncao() {

    }

    function desativarFuncao() {

    }

// Chamada da função para ativar o comportamento de navegação com teclado
navegarSugestoes();

document.querySelectorAll("table tr").forEach(tr => {
  const tds = tr.querySelectorAll("td");
  const limite = tds.length - 2;

  tds.forEach((td, index) => {
    if (index < limite) {
      const texto = td.textContent.trim();
      const link = `http://200.144.30.103:8085/SAC/Gerenciamento`;
      td.innerHTML = `<a href="${link}" class="coord" target="_blank">${texto}</a>`;
    }
  });
});
