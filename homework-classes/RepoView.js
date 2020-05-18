'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      const repoContainer = document.querySelector('.repo-container')
      repoContainer.innerHTML = ''
      const ul = createAndAppend('ul', repoContainer, { class: 'repos-ul' })
      ul.innerHTML = ''
      createAndAppend('li', ul, { class: 'li-class' });
      const liItem = document.querySelector('li:last-child');
      createAndAppend('table', liItem, { class: 'ul-table' })
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
      const table = document.querySelector('.ul-table').innerHTML = tableInfo
    }
  }

  window.RepoView = RepoView;
}
