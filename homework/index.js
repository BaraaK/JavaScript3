'use strict';

{
  const ALERT_ERROR = 'alert-error';

  function fetchJSON(url, cb) {
    const root = document.getElementById('root');
    const loadingDiv = createAndAppend('div', root, { text: 'Loading', class: 'loading' })
    fetch(url)
      .then(resopnse => {
        if (!resopnse.ok)
          cb(new Error(`HTTP error status : ${resopnse.status}`));
        else
          return resopnse.json();
      })
      .then(data => {
        loadingDiv.innerText = '';
        if (data)
          cb(null, data);
      })
      .catch(error => {
        cb(new Error('There has been a problem with your fetch operation:', error));
      })
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

  function createTable(repo, tableClassName) {
    const table = document.createElement('table');
    table.setAttribute('class', tableClassName);
    const tableInfo = `<tbody>
    <tr>
        <td>Repository:</td>
        <td><a href = ${repo.html_url} target = "_blank"> ${repo.name}</a></td>
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
        <td>${new Date(repo.updated_at).toLocaleDateString()}, ${new Date(repo.updated_at).toLocaleTimeString()}</td>
    </tr>
  </tbody>`
    table.innerHTML = tableInfo;
    return table;
  }

  function renderRepoDetails(repo, ul) {
    ul.innerHTML = ''
    createAndAppend('li', ul, { class: 'li-class' });
    const liItem = document.querySelector('li:last-child');
    liItem.appendChild(createTable(repo, 'ul-table'));
  }

  function renderContributorDetailes(contribtor) {
    const main = document.getElementById('contributor-main');
    const row = createAndAppend('div', main, { class: 'row' })
    const columnPic = createAndAppend('div', row, { class: 'column-pic' });
    const pic = createAndAppend('img', columnPic, { class: 'avatar-pic' })
    pic.setAttribute('src', `${contribtor.avatar_url}`);
    const columnContent = createAndAppend('div', row, { class: 'column-content' });
    const content = createAndAppend('a', columnContent, { text: `${contribtor.login}`, href: `${contribtor.html_url}` });
    content.setAttribute('target', '_blank');
    const columnNum = createAndAppend('div', row, { text: `${contribtor.contributions}`, class: 'column-num' });
  }

  function addContributores(repo) {
    const CONTR_URL = repo.contributors_url;
    fetchJSON(CONTR_URL, (err, contribtores) => {
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: ALERT_ERROR,
        });
        return;
      }
      const main = document.getElementById('contributor-main');
      main.innerHTML = '';
      contribtores.forEach(contributor => {
        renderContributorDetailes(contributor);
      });

    })
  }

  function main(url, numberOfRepos) {
    fetchJSON(`${url}?per_page=${numberOfRepos}`, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: ALERT_ERROR,
        });
        return;
      }
      const repoSection = document.querySelector('.repo-container');
      const header = document.querySelector('.header');
      const headDiv = createAndAppend('div', header, { class: 'head' })
      const selectRepo = createAndAppend('select', header, { class: 'select-repo' })
      const ul = createAndAppend('ul', repoSection, { class: 'repos-ul' });
      headDiv.innerText = 'HYF Repositories';

      const sortedRepos = repos.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      sortedRepos.forEach((repo, index) => {
        createAndAppend('option', selectRepo, {
          text: repo.name,
          value: index
        });
      });
      renderRepoDetails(sortedRepos[0], ul);
      addContributores(sortedRepos[0]);
      selectRepo.addEventListener('change', () => {
        fetchJSON(`${url}?per_page=${numberOfRepos}`, (err, repos) => {
          if (err) {
            createAndAppend('div', root, {
              text: err.message,
              class: ALERT_ERROR,
            });
            return;
          }
          const sortedRepos = repos.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
          const selectedRepo = selectRepo.options[selectRepo.selectedIndex].value;
          renderRepoDetails(sortedRepos[selectedRepo], ul)
          addContributores(sortedRepos[selectedRepo]);
        })
      })
    });

  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos';
  window.onload = () => main(HYF_REPOS_URL, 10);

}

