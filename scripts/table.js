import { modal } from'./modal.js'
import { convertDate } from'./utils.js'
import { getUserDetails } from './githubApi.js'

const table = document.querySelector('#data-table tbody');

export function rows(member) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <img class="logo" src="${member.avatar_url}" alt="User Image" />
    </td>
    <td class="login">${member.login}</td>
    <td>
      <button class="details">
        <i class="fa-solid fa-circle-info"></i>
        Info
      </button>
    </td>        
  `;
  const btnInfo = tr.querySelector('.details');
  btnInfo.addEventListener('click', () => openDetails(member.login));
  table.appendChild(tr);
}

export function openDetails(user) {
  const div = document.querySelector('.profile-card');
  getUserDetails(user)
    .then(user => {
      const formatDate = convertDate(user.created_at);
      div.innerHTML = `
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
          <button class="details return">
            <i class="fa-solid fa-arrow-left"></i>
          <button/> 
        </div>         
      `
      const closeButton = div.querySelector('.details.return');
      closeButton.addEventListener('click', () => {
        modal.click();
      });
      
      modal.click();
    })
    .catch(error => {
      console.error('Erro ao buscar detalhes do usuário:', error);
    });
}

export function clearTable() {
  table.innerHTML = '';
}
