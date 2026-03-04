# PixelForge Studios 

Site de um estúdio indie fictício de jogos, criado para fins educacionais.

## O que tem no site

| Seção | Descrição |
|-------|-----------|
| **Home** | Hero animado com texto digitado e estatísticas |
| **Clima** | Previsão do tempo em tempo real via API |
| **Jogos** | 6 cards com efeito tilt 3D |
| **Trailer** | Player YouTube com 6 jogos selecionáveis |
| **Comunidade** | Depoimentos de jogadores |
| **Contato** | Formulário com busca automática de endereço por CEP |

---

## Tecnologias

- HTML5, CSS3 e JavaScript puro (sem frameworks)
- Google Fonts — Press Start 2P + Montserrat
- Font Awesome 6 — ícones

 ### APIs integradas

 ## ViaCEP
Preenche automaticamente o endereço quando o usuário digita o CEP no formulário de contato. Não precisa de chave.

```
https://viacep.com.br/ws/{cep}/json/
```

### OpenWeatherMap
Mostra temperatura, umidade, vento e condição climática em tempo real. Requer chave gratuita.

```
https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={chave}&lang=pt_br&units=metric
```

Para trocar a chave, localize no JavaScript:
```js
var OWM_KEY = 'sua_chave_aqui';
```

Chave gratuita em: openweathermap.org/api

---

## Como usar

Abra o `index.html` no navegador. Não precisa de servidor ou instalação.

Para desenvolvimento, use a extensão **Live Server** no VS Code.

---

## Funcionalidades

- Tema claro / escuro com persistência
- Cursor customizado (desktop)
- Animações de scroll
- Navbar que muda ao rolar
- Menu hamburger no mobile
- Contador de estatísticas animado
- Tilt 3D nos cards de jogos
- Validação de formulário em tempo real
- Busca de clima por geolocalização automática
- Ícone do clima muda conforme a condição (☀️ 🌧️ ⛈️ ❄️ 🌫️...)

---

## Estrutura

```
pixelforge-landing/
├── index.html   ← tudo em um único arquivo
└── README.md
```

---

> PixelForge Studios — *Craft. Forge. Conquer.*
