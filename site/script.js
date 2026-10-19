
const courses = [
  ['Administração', 'Negócios'],
  ['Arquitetura', 'Engenharias'],
  ['Biomedicina', 'Saúde'],
  ['Ciências Contábeis', 'Negócios'],
  ['Direito', 'Humanas'],
  ['Educação Física', 'Saúde'],
  ['Enfermagem', 'Saúde'],
  ['Engenharia da Computação', 'Tecnologia'],
  ['Engenharia Civil', 'Engenharias'],
  ['Engenharia Elétrica', 'Engenharias'],
  ['Engenharia Mecânica', 'Engenharias'],
  ['Engenharia Mecatrônica', 'Engenharias'],
  ['Farmácia', 'Saúde'],
  ['Fisioterapia', 'Saúde'],
  ['Medicina', 'Saúde'],
  ['Medicina Veterinária', 'Saúde'],
  ['Publicidade e Propaganda', 'Humanas'],
  ['Psicologia', 'Humanas'],
  ['Nutrição', 'Saúde'],
  ['Tecnologia em Análise e Desenvolvimento de Sistemas', 'Tecnologia'],
  ['Tecnologia em Jogos Digitais', 'Tecnologia']
];

// =============================================
// IMAGENS DOS CURSOS
// Cole a URL de cada imagem entre as aspas.
// =============================================

const images = {

  // NEGÓCIOS
  'Administração': 'imagens/cursos/ADMpessoasnoComputador.jpg',
  'Ciências Contábeis': 'imagens/cursos/ADMpessoasnoComputador.jpg',

  // ENGENHARIAS
  'Arquitetura': 'imagens/cursos/arquitetura.jpg',
  'Engenharia Civil': 'imagens/cursos/engCivil.jpg',
  'Engenharia Elétrica': 'imagens/cursos/engEletrica.jpg',
  'Engenharia Mecânica': 'imagens/cursos/engMec.jpg',
  'Engenharia Mecatrônica': 'imagens/cursos/engMeca.jpg',

  // SAÚDE
  'Biomedicina': 'imagens/cursos/biomed.jpg',
  'Educação Física': 'imagens/cursos/edFisica.jpg',
  'Enfermagem': 'imagens/cursos/enfermagem.jpg',
  'Farmácia': 'imagens/cursos/farmacia.jpg',
  'Fisioterapia': 'imagens/cursos/fisio.jpg',
  'Medicina': 'imagens/cursos/medicina.jpg',
  'Medicina Veterinária': 'imagens/cursos/medvet.png',
  'Nutrição': 'imagens/cursos/nutri.png',

  // HUMANAS
  'Direito': 'imagens/cursos/direito.jpeg',
  'Publicidade e Propaganda': 'imagens/cursos/pubprog.jpg',
  'Psicologia': 'imagens/cursos/psicologia.jpg',

  // TECNOLOGIA
  'Engenharia da Computação': 'imagens/cursos/engCompt.jpg',
  'Tecnologia em Análise e Desenvolvimento de Sistemas': 'imagens/cursos/ADS.jpg',
  'Tecnologia em Jogos Digitais': 'imagens/cursos/tecJogos.jpg'

};

// =============================================
// ELEMENTOS DO SITE
// =============================================

const grid = document.querySelector('#courseGrid');
const search = document.querySelector('.search input');
const modal = document.querySelector('#modal');

let category = 'Todos';
let expanded = false;

// =============================================
// RENDERIZAÇÃO DOS CURSOS
// =============================================

function renderCourses() {
  const term = search.value.toLowerCase();

  const found = courses.filter(([name, area]) =>
    (category === 'Todos' || area === category) &&
    name.toLowerCase().includes(term)
  );

  const displayed = expanded ? found : found.slice(0, 8);

  grid.innerHTML = displayed.map(([name, area]) => {

    // Agora busca a imagem pelo NOME DO CURSO
    const image = images[name];

    const photoUrl = image ? new URL(image, document.baseURI).href : '';

    const photoStyle = photoUrl
      ? `style="--photo:url('${photoUrl}')"`
      : '';

    return `
      <article
        class="course"
        tabindex="0"
        data-name="${name}"
        data-area="${area}"
        ${photoStyle}
      >
        <small>${area}</small>
        <h3>${name}</h3>
        <span>↗</span>
      </article>
    `;

  }).join('');

  document.querySelector('#showAll').textContent =
    `${expanded ? 'Mostrar menos' : 'Ver todos os cursos'} ↓`;
}

// =============================================
// FILTROS DOS CURSOS
// =============================================

document.querySelectorAll('[data-filter]').forEach(button => {

  button.addEventListener('click', () => {

    document.querySelector('[data-filter].active')
      .classList.remove('active');

    button.classList.add('active');

    category = button.dataset.filter;

    renderCourses();
  });

});

// =============================================
// PESQUISA DE CURSOS
// =============================================

search.addEventListener('input', renderCourses);

// =============================================
// MOSTRAR TODOS OS CURSOS
// =============================================

document.querySelector('#showAll').addEventListener('click', () => {

  expanded = !expanded;

  renderCourses();

});

// =============================================
// MODAL DE INFORMAÇÕES
// =============================================

grid.addEventListener('click', event => {

  const card = event.target.closest('.course');

  if (!card) return;

  modal.querySelector('h2').textContent = card.dataset.name;

  modal.querySelector('p').textContent =
    `Conheça mais sobre a graduação em ${card.dataset.name}. Para informações oficiais sobre esta formação, entre em contato diretamente com o UniSALESIANO.`;

  modal.showModal();

});

grid.addEventListener('keydown', event => {

  if (event.key === 'Enter') {
    event.target.click();
  }

});

document.querySelector('.close').addEventListener('click', () => {
  modal.close();
});


 // =============================================
 // BOTÃO QUERO SABER MAIS - MODAL DOS CURSOS
 // =============================================

const botaoSaibaMais = modal.querySelector('a[href="#inscricoes"]');

if (botaoSaibaMais) {
  botaoSaibaMais.addEventListener('click', (event) => {
    event.preventDefault();

    // Fecha o pop-up
    modal.close();

    // Localiza a seção de inscrições
    const inscricoes = document.querySelector('#inscricoes');

    if (inscricoes) {
      // Aguarda o fechamento do modal
      requestAnimationFrame(() => {
        inscricoes.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  });
}


// =============================================
// HEADER E BARRA DE PROGRESSO
// =============================================

const header = document.querySelector('header');
const progress = document.querySelector('.progress i');

addEventListener('scroll', () => {

  header.classList.toggle('scrolled', scrollY > 30);

  progress.style.width =
    `${scrollY / (document.documentElement.scrollHeight - innerHeight) * 100}%`;

});

// =============================================
// MENU MOBILE
// =============================================

document.querySelector('.menu').addEventListener('click', event => {

  header.classList.toggle('open');

  event.currentTarget.setAttribute(
    'aria-expanded',
    header.classList.contains('open')
  );

});

document.querySelectorAll('nav a').forEach(link => {

  link.addEventListener('click', () => {
    header.classList.remove('open');
  });

});

// =============================================
// INICIALIZAÇÃO
// =============================================

renderCourses();
