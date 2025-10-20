// Este código roda no servidor da Vercel
// Não precisa de 'exports.handler'

// Você pode precisar instalar o node-fetch: npm install node-fetch
import fetch from 'node-fetch'; 

export default async function handler(request, response) {
  // 1. Sua query GraphQL (igual à anterior)
  const query = `
    query {
      user(login: "MaJu-2440") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              openGraphImageUrl
              languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
              }
            }
            }
          }
        }
      }
    }
  `;

  // 2. O Token Secreto (Vindo das "Environment Variables" da Vercel)
  // Você configura isso no painel do seu projeto na Vercel.
  const token = process.env.GITHUB_PAT; // O nome da variável é o que você definir

  try {
    // 3. A requisição FETCH (Back-end Vercel -> GitHub)
    const githubResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`, // <-- Token secreto usado aqui
      },
      body: JSON.stringify({ query: query }),
    });

    if (!githubResponse.ok) {
      // Se o GitHub retornar um erro
      throw new Error(`Erro na API do GitHub: ${githubResponse.statusText}`);
    }

    const data = await githubResponse.json();

    // 4. Retorna os dados para o seu front-end
    // A Vercel usa 'response.status().json()'
    response.status(200).json(data);

  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Erro ao buscar dados do GitHub" });
  }
}