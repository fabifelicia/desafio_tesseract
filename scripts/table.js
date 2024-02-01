import { modal } from'./modal.js'
import { getUserDetails } from './githubApi.js'
import { convertDate } from'./utils.js'

const table = document.querySelector('#data-table tbody');

export function rows(member) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <img class="logo" src="${member.avatar_url}" alt="User Image" />
    </td>
    <td class="login">${member.login}</td>
    <td>
      <button class="details" onclick="openDetails('${member.login}')">
        <i class="fa-solid fa-circle-info"></i>
        Info
      </button>
    </td>        
  `;
  table.appendChild(tr);
}

 export function clearTable() {
  table.innerHTML = '';
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
          <button class="details return" onclick="modal.click()">
            <i class="fa-solid fa-arrow-left"></i>
          <button/> 
        </div>         
      `;
      
      modal.click();
    })
    .catch(error => {
      console.error('Erro ao buscar detalhes do usuário:', error);
    });
}