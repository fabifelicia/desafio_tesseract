const URL = 'https://api.github.com/orgs/grupotesseract/public_members'
const table = document.querySelector('#data-table tbody')
let countMembers = qtdMembers()

async function listMembers() {
  try {
    const response = await fetch(URL)
    const members = await response.json()
    return { count: members.length, members }
  } catch (error) {
    console.log(error)
    return { count: 0, members: [] }
  }
}

const modal = {
  click() {
    const modalOverlay = document.querySelector('.modal-overlay')
    if (modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
      clearTable()
      members()
    } else {
      modalOverlay.classList.add('active')
    }
  },
}

function rows(member) {
  const tr = document.createElement('tr')
  tr.innerHTML =
    `
    <td>
      <img class="logo" src=${member.avatar_url}" alt="User Image" />
    </td>
    <td class="login">${member.login}</td>
    <td>
      <button class="details" onclick="openDetails('${member.login}')">
        <i class="fa-solid fa-circle-info"></i>
        Info
      </button>
    </td>        
  `
  table.appendChild(tr)
}

function clearTable() {
  table.innerHTML = ''
}

async function members() {
  try {
    const { members } = await listMembers()
    members.forEach(member => {
      rows(member)
    })
  } catch (error) {
    console.error(error)
  }
}

async function qtdMembers() {
  const { count } = await listMembers()
  document.getElementsByClassName('table-row-count')[0].innerHTML = `${count} Members`

  return count
}

async function filterByLogin(login) {
  const { members } = await listMembers()
  const foundUser = members.find(member => member.login === login)

  if (foundUser) {
    clearTable()
    rows(foundUser)
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuário não encontrado!",
    });
  }
  document.querySelector('input').value = ''
}

const btnFilter = document.querySelector('.search')
const btnCancel = document.querySelector('.cancel')

btnFilter.addEventListener('click', () => {
  const login = document.querySelector('input').value
  filterByLogin(login)
})

btnCancel.addEventListener('click', () => {
  document.querySelector('input').value = ''
  clearTable()
  members()
})

function convertDate(date) {

  const dateObj = new Date(date)
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
}


function openDetails(user) {
  const div = document.querySelector('.profile-card');
  fetch(`https://api.github.com/users/${user}`)
    .then((response) => response.json())
    .then((user) => {
      const formatDate = convertDate(user.created_at)
      div.innerHTML =
        ` 
        <div class="image">
          <img src="${user.avatar_url}" alt="User Image" class="profile-img"> 
        </div>  
        <div class="text-data">
          <span class='name'>${user.name}</span>
          <span class='created'>Created at ${formatDate}</span>
        </div>     
        <div class="analytics">
          <div class="data">
            <i class="fa-solid fa-users"></i>
            <span class="number">${user.followers}</span>
          </div>
          <div class="data">
            <i class="fa-solid fa-file-code"></i>
            <span class="number">${user.public_repos}</span>
          </div>
        </div> 
        <div class="close">
          <button class="details return" onclick="modal.click()">
            <i class="fa-solid fa-arrow-left"></i>
          <button/> 
        </div>         
      `
      modal.click();
    })
    .catch((error) => {
      console.error('Erro ao buscar detalhes do usuário:', error);
    });
}

members()