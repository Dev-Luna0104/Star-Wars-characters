 currentPageUrl = 'https://swapi.dev/api/people/' ;


window.onload = async () => {
    try {
       await loadCharacters(currentPageUrl);
    } catch  (error) {
        console.log (error);
        alert('erro ao carregar os cards');
    }
};

async function loadCharacters(url) {

    const mainContent = document.getElementById('main-content')
    mainContent.innerText=''; // limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {

            const card = document.createElement('div'); // createElement - vai criar um elemento html
            card.style.backgroundImage=`url('https://starwars-visualguide.com/assets/img/characters/1.jpg')`;
            card.className = 'cards';
            mainContent.appendChild(card);
            
            const bgNameCharacter = document.createElement('div');
            bgNameCharacter.className = 'bg-name-character';
            card.appendChild(bgNameCharacter);
            
            const nameCharacter = document.createElement('span');
            nameCharacter.className = "name-character";
            nameCharacter.innerText = `${character.name}`; //vai modificar o text do elemento
            bgNameCharacter.appendChild(nameCharacter); //appendChild - Vai add um elemento filho no outro elemento
            
            
        });

        currentPageUrl = url ;

    } catch (error) {
        console.log(error);
        alert(error)
    }
};

