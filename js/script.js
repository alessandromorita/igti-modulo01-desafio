let globalUsers = [];
let globalFilteredUsers = [];
let ageSum = 0;
let average = 0;
let maleSum = 0;
let femaleSum = 0;

window.addEventListener('load', () => {
  setFocusToTextBox();
  doMap(); //carrega array com valores
  render(); //cria exibição dos usuários
  enableFilter(); //ação do button
});

function doMap() {
  globalUsers = people.results.map((person) => {
    return {
      name: person.name.first + ' ' + person.name.last,
      picture: person.picture.thumbnail,
      age: person.dob.age,
      gender: person.gender,
    };
  });

  globalUsers.sort((a, b) => a.name.localeCompare(b.name));
  globalFilteredUsers = [...globalUsers];
}

function render() {
  const divUsers = document.querySelector('#usersList');
  divUsers.innerHTML = `
  <div class='row'>
    <h3>${globalFilteredUsers.length} usuários encontrados.</h3>
    ${globalFilteredUsers
      .map(({ picture, name, age }) => {
        return `
      <div class='col'>
        <div class='flex-row bordered'>
          <img class='avatar' src='${picture}' />
          <div class='flex-column'>
            <span>${name}, ${age} anos</span>
          </div>
        </div>
      </div>
    `;
      })
      .join('')}
  </div>`;

  const infoUsers = document.querySelector('#usersInfo');
  infoUsers.innerHTML = `
  <h3>Estatísticas:</h3>
  <div>
    <p>Sexo masculino: ${maleSum}</p>
    <p>Sex feminino: ${femaleSum}</p>
    <p>Soma das idades: ${ageSum}</p>
    <p>Média das idades: ${average.toFixed(2)}</p>
  </div>
  `;
  setFocusToTextBox();
}

function renderEmpty() {
  const divUsers = document.querySelector('#usersList');
  divUsers.innerHTML = `
  <p>Nenhum usuário encontrado!</p>
  `;
  const infoUsers = document.querySelector('#usersInfo');
  infoUsers.innerHTML = ` `;
  setFocusToTextBox();
}

function enableFilter() {
  const buttonFilter = document.querySelector('#inputButton');
  buttonFilter.addEventListener('click', handleFilter);
}

function handleFilter() {
  const inputFilter = document.querySelector('#inputName');
  const filterValue = inputFilter.value.trim().toLowerCase();

  globalFilteredUsers = globalUsers.filter((item) => {
    return item.name.toLowerCase().includes(filterValue);
  });

  if (globalFilteredUsers.length !== 0) {
    ageSum = globalFilteredUsers.reduce((acc, curr) => {
      return acc + curr.age;
    }, 0);

    average = ageSum / globalFilteredUsers.length;
    maleSum = 0;
    femaleSum = 0;
    globalFilteredUsers.forEach((item) => {
      if (item.gender === 'male') {
        maleSum++;
      } else if (item.gender === 'female') {
        femaleSum++;
      }
    });

    render();
  } else {
    renderEmpty();
  }
}

function setFocusToTextBox() {
  document.getElementById('inputName').value = ' ';
  document.getElementById('inputName').focus();
}
