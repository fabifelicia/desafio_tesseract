import { listMembers } from './githubApi.js'
import { rows, clearTable } from'./table.js'


export async function members() {
  try {
    const { members } = await listMembers();
    members.forEach(member => {
      rows(member);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function filterByLogin(login) {
  try {
    const { members } = await listMembers();
    const foundUser = members.find(member => member.login === login);

    if (foundUser) {
      clearTable();
      rows(foundUser);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuário não encontrado!',
      });
    }
    document.querySelector('input').value = '';
  } catch (error) {
    console.error(error);
  }
}

const btnFilter = document.querySelector('.search');
const btnCancel = document.querySelector('.cancel');

btnFilter.addEventListener('click', () => {
  const login = document.querySelector('input').value;
  filterByLogin(login);
});

btnCancel.addEventListener('click', () => {
  document.querySelector('input').value = '';
  clearTable();
  members();
});

members();
