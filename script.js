    const $ = id => document.getElementById(id);
    
    const btn1 = $("btn1"); const btn2 = $("btn2"); const btn3 = $("btn3");
    const input = $("searchInput");
    const icon = $("searchIcon");
    const tabela = $("tabelaDados");
    const tabela1 = $("tabelaDados1");
    const tabela2 = $("tabelaDados2");
    const tabela3 = $("tabelaDados3");
    const tabela4 = $("tabelaDados4");
    const tabela5 = $("tabelaDados5");
    const rcs = $("rcsEscolha");
    const rc1 = $("rc1"); const rc2 = $("rc2"); const rc3 = $("rc3"); const rc4 = $("rc4"); const rc5 = $("rc5");
    const imgCgr = document.querySelector(".imagemcgrdiv");
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
  const input = $('searchInput');
  const inputValue = input.value.toLowerCase();
  const suggestionsList = $('suggestionsList');
  
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
$('searchInput').addEventListener('input', filtrarSugestoes);

// Esconde a lista de sugestões ao clicar fora do input
document.addEventListener('click', (event) => {
  const suggestionsList = $('suggestionsList');
  const input = $('searchInput');
  if (!input.contains(event.target) && !suggestionsList.contains(event.target)) {
    suggestionsList.style.display = 'none'; // Esconde a lista se clicar fora do input ou da lista
  }
});

// Função para gerenciar a navegação com as setas e seleção com ENTER
const navegarSugestoes = () => {
  let sugestaoIndex = -1;
  const suggestionsList = $('suggestionsList');
  const suggestionItems = document.querySelectorAll('.suggestion-item');
  const sugestao1 = pegarColunasEspecificas();
  const input = $('searchInput');

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
        sugestaoIndex = -1;
        input.dispatchEvent(new Event("input"));
            setTimeout(() => {
            suggestionsList.style.display = 'none';
          }, 0);
      }
    }

    // Atualiza visualmente a seleção
    suggestionItems.forEach((item, index) => {
      if (index === sugestaoIndex) {
        item.style.backgroundColor = '#004fc5';
        item.style.color = '#fff';
        item.scrollIntoView({ block: "nearest" });
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
    
    const elemento = $('searchIcon'); // Substitua 'elementoAlvo' pelo ID do seu elemento
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

const toggle = $("toggleSwitch");
    let isOn = false;

    toggle.addEventListener("click", () => {
      isOn = !isOn;
      toggle.classList.toggle("on", isOn);
      toggle.classList.toggle("off", !isOn);

      if (isOn) {
        ConservaOn();
      } else {
        ConservaOff();
      }
    });

    function ConservaOn() {

    }

    function ConservaOff() {

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

const apiKey = 'K86257948988957';

document.getElementById('imageInput').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Exibe o carregando
  const loadingElement = document.createElement('div');
  loadingElement.id = 'loading';
  loadingElement.innerText = 'Carregando...';
  document.body.appendChild(loadingElement);

  // Estilos de carregamento
  loadingElement.style.position = 'fixed';
  loadingElement.style.top = '50%';
  loadingElement.style.left = '50%';
  loadingElement.style.transform = 'translate(-50%, -50%)'; // Para centralizar
  loadingElement.style.width = '400px';
  loadingElement.style.padding = '10px 0'; // Padding de 10px em cima e embaixo
  loadingElement.style.textAlign = 'center';
  loadingElement.style.backgroundColor = '#fff';
  loadingElement.style.border = '1px solid #ccc';
  loadingElement.style.borderRadius = '8px';
  loadingElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  loadingElement.style.fontSize = '16px';
  loadingElement.style.fontWeight = 'bold';
  loadingElement.style.fontFamily = 'Arial';
  loadingElement.style.userSelect = 'none';
  loadingElement.style.color = '#333';

  const reader = new FileReader();
  reader.onload = () => {
    const img = document.createElement('img');
    img.src = reader.result;
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    preview.appendChild(img);
  };
  reader.readAsDataURL(file);

  const formData = new FormData();
  formData.append('apikey', apiKey);
  formData.append('file', file);
  formData.append('OCREngine', 2);

  try {
    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const result = await response.json();
    const text = result?.ParsedResults?.[0]?.ParsedText || '';
    preencherCampos(text);
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
  } finally {
    document.body.removeChild(loadingElement); // Remover a tela de carregamento
  }
});

function preencherCampos(texto) {
  const rodoviaMatch = texto.match(/(SP[A-Z]*)\s*\d{3}([-\/:]\d{3})?/);
  const kmMatch = texto.match(/Km\s*([\d., ]+)/i);
  const sentidoMatch = texto.match(/\b(LD\/LE|LE\/LD|LD|LE)\b/i);
  const dataMatch = texto.match(/(\d{2}[\.\/:\-\s]\d{2}[\.\/:\-\s]\d{4})/);
  const horaMatch = texto.match(/\d{2}[\/\.\-\s]\d{2}[\/\.\-\s]\d{4}\s+(\d{2}[:\.\-\s]\d{2})/);

    // ---------- LOGS PARA KM ----------
  console.log('--- KM ---');
  if (kmMatch) {
    console.log('KM identificado bruto: ', kmMatch[1]);
    const kmTratado = kmMatch[1].replace(',', '.').replace(/\s/g, '');
    console.log('KM tratado para preenchimento: ', kmTratado);
    document.getElementById('km').value = kmTratado;
  } else {
    console.log('KM não identificado.');
    document.getElementById('km').value = '';
  }

  // ---------- LOGS PARA HORA ----------
  console.log('--- HORA ---');
  if (horaMatch) {
    console.log('Hora identificada bruta: ', horaMatch[1]);
    const horaTratada = horaMatch[1].replace(/\./g, ':');
    console.log('Hora tratada para preenchimento: ', horaTratada);
    document.getElementById('hora').value = horaTratada;
  } else {
    console.log('Hora não identificada.');
    document.getElementById('hora').value = '';
  }
  console.log('Texto completo para processar: ', texto);

  // Regex que captura coordenadas com ou sem espaço entre o sinal de menos e o número
 const regexCorrigida = /(-?\s*\d{1,3}(?:[\s.]?\d{4,12}))\s*(?:,|\s)\s*(-?\s*\d{1,3}(?:[\s.]?\d{4,12}))/;

  console.log('Tentando capturar coordenadas com regex:', regexCorrigida);

  const corrigida = texto.match(regexCorrigida);
  console.log('Coordenadas capturadas pela regex: ', corrigida);

  let latitude = '', longitude = '';

  if (corrigida) {
    let rawLat = corrigida[1]; // Latitude
    let rawLon = corrigida[2]; // Longitude

    console.log('Latitude raw: ', rawLat);
    console.log('Longitude raw: ', rawLon);

    // Remove espaços extras
    rawLat = rawLat.replace(/\s/g, '');
    rawLon = rawLon.replace(/\s/g, '');
    
    console.log('Latitude após remoção de espaço: ', rawLat);
    console.log('Longitude após remoção de espaço: ', rawLon);

    // Se a latitude ou longitude não tem sinal negativo, adicionar
    if (rawLat[0] !== '-') {
      console.log('Adicionando sinal negativo à latitude.');
      rawLat = '-' + rawLat;
    }
    if (rawLon[0] !== '-') {
      console.log('Adicionando sinal negativo à longitude.');
      rawLon = '-' + rawLon;
    }

    // Se a latitude não tem ponto, adiciona
    if (!rawLat.includes('.')) {
      console.log('Adicionando ponto na latitude.');
      latitude = rawLat.slice(0, 3) + '.' + rawLat.slice(3);
    } else {
      console.log('Latitude já tem ponto, mantendo: ', rawLat);
      latitude = rawLat;
    }

    // Se a longitude não tem ponto, adiciona
    if (!rawLon.includes('.')) {
      console.log('Adicionando ponto na longitude.');
      longitude = rawLon.slice(0, 3) + '.' + rawLon.slice(3);
    } else {
      console.log('Longitude já tem ponto, mantendo: ', rawLon);
      longitude = rawLon;
    }

    console.log('Latitude corrigida: ', latitude);
    console.log('Longitude corrigida: ', longitude);

  } else {
    console.log('Coordenadas não encontradas.');
  }

  document.getElementById('latitude').value = latitude;
  document.getElementById('longitude').value = longitude;

  document.getElementById('rodovia').value = rodoviaMatch?.[0].replace(/[\/:.-]/g, '/') || '';
  document.getElementById('km').value = kmMatch?.[1]?.replace(',', '.').replace(/\s/g, '') || '';
  document.getElementById('sentido').value =
    sentidoMatch?.[1] === 'LD' ? 'Crescente' :
    sentidoMatch?.[1] === 'LE' ? 'Decrescente' :
    'Ambos';
  document.getElementById('data').value = dataMatch?.[1]?.replace(/[:\-.\s]/g, '/') || '';
  document.getElementById('hora').value = horaMatch?.[1]?.replace(/\./g, ':') || '';
  document.getElementById('latitude').value = latitude;
  document.getElementById('longitude').value = longitude;
}

    const Icons = document.querySelectorAll(".fa-regular.fa-copy");

    Icons.forEach(Ics => {
      Ics.addEventListener('click', () => {
        let par;
        let input;
        input = Ics.previousElementSibling.querySelector("input");
        input = input.value;
        par = Ics.nextElementSibling;
        spawn(par, Ics);
        navigator.clipboard.writeText(input);
      });
    });

    function spawn(...elements) {
        document.querySelectorAll('.spawn').forEach(spawns => {
            spawns.classList.remove('spawn');
        });
        elements.forEach(el => {
          if (el) el.classList.add("spawn");
        });
    }

      const selectImage = document.getElementById("select-image");
      const Icones = document.querySelectorAll(".fa-regular.fa-copy, .fa-solid.fa-circle-check");

      selectImage.addEventListener('click', () => {
        Icones.forEach(icone => {
          if (icone.classList.contains("spawn")) {
            icone.classList.remove("spawn");
          }
        });
      });
      let larguraAtual = window.innerWidth;

      window.addEventListener('resize', () => {
        larguraAtual = window.innerWidth;
        let novaLargura = larguraAtual / 1900 * 1.5;
        let antigaLargura = larguraAtual / 1900;
        antigaLargura = Math.min(antigaLargura, 1);
        novaLargura = Math.min(Math.max(novaLargura, 0.5), 1);
        const allElements = document.querySelector(".PainelOcr");
        const allAutoScript = document.querySelector(".AutoScripts");
        if (allAutoScript) {
          allAutoScript.style.zoom = `${antigaLargura}`;
        }
        if (allElements) {
          allElements.style.zoom = `${novaLargura}`;
        }
      });

      function AlternateTo() {
        const pasta = document.querySelector('.AutoScriptsPasta');
        const painel = document.querySelector('.PainelOcr');
        const Arrow = document.querySelectorAll('.EngineOcr .fa-solid');
        const spans = document.querySelectorAll('.EngineOcr span');
        spans.forEach(span => {
          if (span !== this) span.classList.remove('active');
        });
          if (this.querySelector('.fa-solid').classList.contains('fa-angles-down')) {
            pasta.classList.remove('on');
            pasta.classList.add('off');
            this.classList.remove('active');
            this.querySelector('.fa-solid').classList.remove('fa-angles-down');
            this.querySelector('.fa-solid').classList.add('fa-angles-up');
          } else if (this.querySelector('.fa-solid').classList.contains('fa-angles-up')) {
            pasta.classList.add('on');
            pasta.classList.remove('off');
            this.classList.add('active');
            this.querySelector('.fa-solid').classList.add('fa-angles-down');
            this.querySelector('.fa-solid').classList.remove('fa-angles-up');
            painel.classList.remove('on');
            painel.classList.add('off');
          } else if (this.querySelector('.fa-solid').classList.contains('fa-wrench')) {
            Arrow.forEach(a => {
              if (a.classList.contains('fa-angles-down')) {
                a.classList.remove('fa-angles-down');
                a.classList.add('fa-angles-up');
              }
            });
            if (this.classList.contains('active')) {
              painel.classList.remove('on');
              painel.classList.add('off');
              this.classList.remove('active');
            } else {
              painel.classList.add('on');
              painel.classList.remove('off');
              this.classList.add('active');
              pasta.classList.remove('on');
              pasta.classList.add('off');
            }
          }
        }

        function AutoScriptsToggle() {
          const scripts = document.querySelector('.AutoScripts');
          if (btn3.classList.contains('t1')) {
            scripts.style.transition = 'clip-path 1s ease';
            scripts.classList.add('on');
          } else {
            scripts.style.transition = 'none';
            scripts.classList.remove('on');
          }
        }

