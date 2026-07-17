/**
 * Configuração central do convite — espelha o objeto CONFIG do HTML de
 * referência. Tudo que é editável (datas, locais, textos, chaves) mora aqui.
 *
 * ⚠️ Os valores marcados com "EDITE" são placeholders — troque pelos dados
 * reais do evento antes de publicar.
 */

export interface DataEvento {
  /** Dia do mês, ex.: "15" */
  dia: string
  /** Mês por extenso, ex.: "Agosto" */
  mes: string
  /** Ano, ex.: "2026" */
  ano: string
  /** Data/hora ISO 8601 com fuso — usada na contagem regressiva */
  iso: string
}

export interface LocalEvento {
  /** Rótulo da etapa, ex.: "01 · compile" (o prefixo "//" é adicionado na tela) */
  etapa: string
  titulo: string
  lugar: string
  endereco: string
  horario: string
  /** URLs de fotos 16:9 do local; com 2+ vira galeria deslizável, vazio ([]) exibe placeholder */
  fotos: string[]
  /** Texto de busca usado nos links/embeds do Google Maps e Waze */
  mapaBusca: string
  /** URL de embed específica do Google Maps (Compartilhar → Incorporar um mapa); se ausente, usa a busca */
  mapaEmbed?: string
  /** Link de compartilhamento do Google Maps para o botão; se ausente, usa a busca */
  mapaLink?: string
  /** Aviso em destaque exibido no cartão do local (ex.: regra do menu do jantar) */
  aviso?: string
}

export interface LinkFaq {
  rotulo: string
  url: string
  /** Caminho da logo exibida no botão (ex.: /icones/waze.png) */
  icone: string
  /** Estilo visual do botão, igual aos do Roteiro */
  estilo: 'ouro' | 'azul'
}

export interface PerguntaFaq {
  /** Pergunta completa */
  q: string
  /** Texto curto exibido no chip do chat */
  chip: string
  /** Resposta local (sem chamar a API) */
  a: string
  /** Links opcionais exibidos abaixo da resposta (ex.: Google Maps e Waze do local) */
  links?: LinkFaq[]
}

export interface Config {
  nome: string
  data: DataEvento
  /** Fotos do carrossel de momentos (seção some se a lista ficar vazia) */
  fotos: string[]
  locais: LocalEvento[]
  pixChave: string
  /** Perfis exibidos como ícones no rodapé do convite */
  redes: {
    instagram: string
    facebook: string
    linkedin: string
  }
  faq: PerguntaFaq[]
  /** Linhas da animação de boot (terminal) */
  bootLines: string[]
}

export const CONFIG: Config = {
  nome: 'Augusto Favaretto',

  // Data e hora da colação (usada no destaque e no cronômetro)
  data: {
    dia: '15',
    mes: 'Agosto',
    ano: '2026',
    iso: '2026-08-15T18:00:00-03:00',
  },

  // 📸 Fotos do carrossel de momentos (arquivos em public/fotos/carrossel/,
  // nomeados conforme o arquivo original do ensaio)
  fotos: [
    '/fotos/carrossel/mbf-039.jpg',
    '/fotos/carrossel/mbf-062.jpg',
    '/fotos/carrossel/mbf-088.jpg',
    '/fotos/carrossel/mbf-143.jpg',
    '/fotos/carrossel/mbf-159.jpg',
    '/fotos/carrossel/mbf-168.jpg',
    '/fotos/carrossel/mbf-170.jpg',
    '/fotos/carrossel/mbf-185.jpg',
    '/fotos/carrossel/mbf-192.jpg',
    '/fotos/carrossel/mbf-199.jpg',
    '/fotos/carrossel/mbf-206.jpg',
  ],

  // 📍 EDITE: nome, endereço, horário, foto e termo de busca do mapa de cada local
  locais: [
    {
      etapa: '01 · compile',
      titulo: 'Colação de Grau',
      lugar: 'Palazzo - Centro de Eventos',
      endereco: 'R. Dr. Gelson Ribeiro, 440 - Vila Vera Cruz, Passo Fundo - RS, 99010-370',
      horario: '18h',
      fotos: ['/fotos/Palazzo.webp'],
      mapaBusca: 'Palazzo - Centro de Eventos, Passo Fundo',
      mapaEmbed:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.9461202397865!2d-52.42752449999999!3d-28.239314999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e2c0c256ecac0b%3A0xe804ec6c72dd63c1!2sPalazzo%20-%20Centro%20de%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1783990250153!5m2!1spt-BR!2sbr',
      mapaLink: 'https://maps.app.goo.gl/vzyGrcMzL5eksBg2A',
    },
    {
      etapa: '02 · deploy',
      titulo: 'Jantar de Formatura',
      lugar: 'Nonna Brasa Italian Steakhouse',
      endereco: 'Av. Dr. Álvaro Severo de Miranda, 506 - Cidade Nova, Passo Fundo - RS, 99022-032',
      horario: '20h',
      fotos: [
        '/fotos/nonna-brasa-externo.jpg',
        '/fotos/nonna-brasa-externo-2.jpg',
        '/fotos/nonna-brasa-interno.jpg',
      ],
      mapaBusca: 'Nonna Brasa, Passo Fundo',
      mapaEmbed:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.8856795482475!2d-52.420660324559485!3d-28.241149350015156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e2c18f7dccef01%3A0x74046de42747023f!2sNonna%20Brasa!5e0!3m2!1spt-BR!2sbr!4v1783990611102!5m2!1spt-BR!2sbr',
      aviso:
        'O menu personalizado servido na mesa — incluindo as bebidas do menu de drinks — é por conta do formando. Apenas pedidos fora do menu ficam por conta de quem consumir.',
    },
    {
      etapa: '03 · celebrate',
      titulo: 'Baile de Formatura',
      lugar: 'Palazzo - Centro de Eventos',
      endereco: 'R. Dr. Gelson Ribeiro, 440 - Vila Vera Cruz, Passo Fundo - RS, 99010-370',
      horario: '23h30',
      fotos: ['/fotos/Palazzo.webp'],
      mapaBusca: 'Palazzo - Centro de Eventos, Passo Fundo',
      mapaEmbed:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.9461202397865!2d-52.42752449999999!3d-28.239314999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e2c0c256ecac0b%3A0xe804ec6c72dd63c1!2sPalazzo%20-%20Centro%20de%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1783990250153!5m2!1spt-BR!2sbr',
      mapaLink: 'https://maps.app.goo.gl/vzyGrcMzL5eksBg2A',
    },
  ],

  // 💚 Chave Pix (celular)
  pixChave: '54996320916',

  // 🌐 Links dos perfis
  redes: {
    instagram: 'https://www.instagram.com/augusto.favaretto',
    facebook: 'https://www.facebook.com/augusto.favaretto.3/',
    linkedin: 'https://br.linkedin.com/in/augusto-favaretto-7245b81b9',
  },

  // 🤖 Perguntas rápidas do chat + respostas locais
  faq: [
    {
      q: 'Qual o traje?',
      chip: '👔 Traje',
      a: 'O traje é social de livre escolha. Capriche no look! ✨',
    },
    {
      q: 'Posso levar acompanhante?',
      chip: '👥 Acompanhante',
      a: 'Sim! Basta marcar a opção de acompanhante no formulário de confirmação de presença aqui no site e informar o nome. Lembre-se de marcar somente se você recebeu o seu nome e acompanhante no convite pelo WhatsApp!',
    },
    {
      q: 'Qual o horário de cada evento?',
      chip: '🕐 Horários',
      a: 'Colação de grau às 18h, jantar às 20h e baile a partir das 23h30. Chegue com uns 20 minutos de antecedência à Colação de Grau se você foi convidado no convite pelo WhatsApp. 😉',
    },
    {
      q: 'Tem estacionamento?',
      chip: '🚗 Estacionamento',
      a: 'Todos os locais possuem estacionamento próprio ou conveniado nas proximidades. Se preferir, use aplicativo de transporte — os endereços estão nos mapas do convite.',
    },
    {
      q: 'Como posso contribuir?',
      chip: '🎁 Presente',
      a: 'Sua presença já é o maior presente! Quem quiser apoiar o início da minha carreira pode contribuir com qualquer valor pela chave Pix da seção Contribuição do convite. E se preferir algo físico, pode levar ao jantar para me entregar! 💛',
    },
    {
      q: 'Até quando posso confirmar presença?',
      chip: '📅 Prazo de Confirmação',
      a: 'Confirme sua presença até 07/08/2026, pelo formulário no final do convite, para garantirmos seu lugar no jantar e baile. Se você foi convidado para a Colação de Grau será informado no convite pelo WhatsApp.',
    },
    {
      q: 'Qual a localização da Colação de Grau?',
      chip: '📍 Colação de Grau',
      a: 'A Colação de Grau será no Palazzo - Centro de Eventos: R. Dr. Gelson Ribeiro, 440 - Vila Vera Cruz, Passo Fundo/RS. O mapa com rotas pelo Google Maps e Waze está na seção Roteiro do convite! 🎓',
      links: [
        {
          rotulo: 'Google Maps',
          url: 'https://maps.app.goo.gl/vzyGrcMzL5eksBg2A',
          icone: '/icones/google-maps.webp',
          estilo: 'ouro',
        },
        {
          rotulo: 'Waze',
          url: 'https://waze.com/ul?q=Palazzo%20-%20Centro%20de%20Eventos%2C%20Passo%20Fundo&navigate=yes',
          icone: '/icones/waze.png',
          estilo: 'azul',
        },
      ],
    },
    {
      q: 'Qual a localização do Jantar?',
      chip: '📍 Jantar',
      a: 'O Jantar de Formatura será na Nonna Brasa Italian Steakhouse: Av. Dr. Álvaro Severo de Miranda, 506 - Cidade Nova, Passo Fundo/RS. O mapa com rotas pelo Google Maps e Waze está na seção Roteiro do convite! 🍽️',
      links: [
        {
          rotulo: 'Google Maps',
          url: 'https://www.google.com/maps/search/?api=1&query=Nonna%20Brasa%2C%20Passo%20Fundo',
          icone: '/icones/google-maps.webp',
          estilo: 'ouro',
        },
        {
          rotulo: 'Waze',
          url: 'https://waze.com/ul?q=Nonna%20Brasa%2C%20Passo%20Fundo&navigate=yes',
          icone: '/icones/waze.png',
          estilo: 'azul',
        },
      ],
    },
    {
      q: 'Qual a localização do Baile?',
      chip: '📍 Baile',
      a: 'O Baile de Formatura será no Palazzo - Centro de Eventos, o mesmo local da Colação de Grau: R. Dr. Gelson Ribeiro, 440 - Vila Vera Cruz, Passo Fundo/RS. O mapa com rotas está na seção Roteiro do convite! 🎉',
      links: [
        {
          rotulo: 'Google Maps',
          url: 'https://maps.app.goo.gl/vzyGrcMzL5eksBg2A',
          icone: '/icones/google-maps.webp',
          estilo: 'ouro',
        },
        {
          rotulo: 'Waze',
          url: 'https://waze.com/ul?q=Palazzo%20-%20Centro%20de%20Eventos%2C%20Passo%20Fundo&navigate=yes',
          icone: '/icones/waze.png',
          estilo: 'azul',
        },
      ],
    },
    {
      q: 'O que seria o menu do jantar e o que estaria liberado?',
      chip: '🍽️ Menu do Jantar',
      a: 'No jantar haverá um menu personalizado, informado na mesa — incluindo um menu de drinks. Tudo o que estiver nos menus é por conta do formando! 🍽️ Apenas pedidos fora do menu ficam por conta de quem consumir.',
    },
  ],

  bootLines: [
    '$ ./formatura Augusto Favaretto.sh --iniciar',
    '> carregando anos de estudos ......... ok',
    '> compilando muitos códigos ..... ok',
    '> instalando diploma.pkg ............... ok',
    '🎓 Chegou o dia de celebrar!',
    '🎓 Bem-vindo(a) ao convite de formatura do Augusto Favaretto!',
  ],
}
