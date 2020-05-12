'use strict';

{
  const REPOS_UL_CLASS_NAME = 'repos-ul';
  const LI_CLASS_NAME = 'li-class'
  const UL_TABLE_CLASS_NAME = 'ul-table';
  const ALERT_ERROR = 'alert-error';
  const HEAD_CLASS_NAME = 'head';
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function createTable(repo,tableClassName) {
    const table = document.createElement('table');
    table.setAttribute('class' , tableClassName);
    const tableInfo = `<tbody>
    <tr>
        <td>Repository:</td>
        <td><a href = "">${repo.name}</a></td>
    </tr>
    <tr>
        <td>Description:</td>
        <td>${repo.description}</td>
    </tr>
    <tr>
        <td>Forks:</td>
        <td>${repo.forks}</td>
    </tr>
    <tr>
        <td>Updated:</td>
        <td>${repo.updated_at}</td>
    </tr>
  </tbody>`
  table.innerHTML = tableInfo;
  return table;
  }
  function renderRepoDetails(repo, ul) {
    createAndAppend('li', ul , { class : LI_CLASS_NAME});
    const liItem = document.querySelector('li:last-child');
    liItem.appendChild(createTable(repo , UL_TABLE_CLASS_NAME ) );
  }

  function main(url,numberOfRepos) {
    fetchJSON(`${url}?per_page=${numberOfRepos}`, (err, repos) => {
      const root = document.getElementById('root');
      const head = createAndAppend('div', root, { class : HEAD_CLASS_NAME })
      head.innerText = 'HYF Repositories';
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: ALERT_ERROR,
        });
        return;
      }
      const ul = createAndAppend('ul', root, { class : REPOS_UL_CLASS_NAME});
      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos';
  window.onload = () => main(HYF_REPOS_URL,10);
}
