'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      const main = document.querySelector('.contributors-container');
      main.innerHTML = '';
      contributors.forEach(contribtor => {
        const row = createAndAppend('div', main, { class: 'row' })
        const columnPic = createAndAppend('div', row, { class: 'column-pic' });
        const pic = createAndAppend('img', columnPic, { class: 'avatar-pic' })
        pic.setAttribute('src', `${contribtor.avatar_url}`);
        const columnContent = createAndAppend('div', row, { class: 'column-content' });
        const content = createAndAppend('a', columnContent, { text: `${contribtor.login}`, href: `${contribtor.html_url}` });
        content.setAttribute('target', '_blank');
        const columnNum = createAndAppend('div', row, { text: `${contribtor.contributions}`, class: 'column-num' });
      })
    }
  }

  window.ContributorsView = ContributorsView;
}
