const navContainer = document.querySelector(".nav_links");
const navToggle = document.querySelector(".nav_toggle");

navToggle.addEventListener("click", () => {
    navContainer.style.display = navContainer.style.display === "flex" ? "none" : "flex";
})

const placeholderImg =  "https://placehold.co/300x200/png";

// Este código roda no navegador do visitante

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o lugar onde você quer mostrar os projetos
  const projectsContainer = document.querySelector('.project-list');
  projectsContainer.innerHTML = '<p>Carregando projetos...</p>';
  
  // Esta chamada NÃO usa seu token.
  fetch('/api/get-github-pins')
    .then(response => response.json())
    .then(data => {
      // Limpa a mensagem de "Carregando"
      projectsContainer.innerHTML = '';
      
      // 2. Pega os dados que vieram do seu back-end
      const repos = data.data.user.pinnedItems.nodes;

      // 3. Cria o HTML para cada projeto (JavaScript Puro)
      repos.forEach(repo => {
        const languagesArray = repo.languages.nodes;
        
        const languagesHtml = languagesArray.map(lang => {
          return `
              <li>${lang.name}</li>
          `;
        }).join('');
          
        const projectCard = document.createElement('div');
        projectCard.className = 'project-item';
        
        projectCard.innerHTML = `
            <img src="${repo.openGraphImageUrl} || ${placeholderImg}" alt="${repo.name}"/>
            <h3>${repo.name}</h3>
            <ul class="tags">
                ${languagesHtml}
            </ul>
            <button class="btn" type="button" aria-roledescription="abrir modal do projeto">Ver Estudo de Caso</button>
        `;
        
        projectsContainer.appendChild(projectCard);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar projetos:', error);
      projectsContainer.innerHTML = '<p>Não foi possível carregar os projetos.</p>';
    });
});