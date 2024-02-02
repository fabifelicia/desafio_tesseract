import { rows, clearTable } from'./table.js'
import { listMembers } from './githubApi.js'

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
    } else if (login === ''){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Enter a username',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User not found!',
      });
    }
    document.querySelector('input').value = '';
  } catch (error) {
    console.error(error);
  }
}

export async function qtdMembers() {
  const { count } = await listMembers()
  document.getElementsByClassName('table-row-count')[0].innerHTML = `${count} Members`
  return count
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

members()
qtdMembers()
