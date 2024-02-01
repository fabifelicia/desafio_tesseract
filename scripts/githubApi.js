export async function listMembers() {
  try {
    const response = await fetch('https://api.github.com/orgs/grupotesseract/public_members');
    const members = await response.json();
    return { count: members.length, members };
  } catch (error) {
    console.error(error);
    return { count: 0, members: [] };
  }
}

export async function getUserDetails(user) {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar detalhes do usuário:', error);
    throw error;
  }
}
