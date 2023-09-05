 currentPageUrl = 'https://swapi.dev/api/people/' ;


window.onload = async () => {
    try {
       await loadCharacters(currentPageUrl);
    } catch  (error) {
        console.log (error);
        alert('erro ao carregar os cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    // backButton.addEventListener('click', loadPreviousPage)
   
};






async function loadCharacters(url) {

    const mainContent = document.getElementById('main-content')
    mainContent.innerText=''; // limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((characters) => {

            const card = document.createElement('div'); // createElement - vai criar um elemento html
            card.style.backgroundImage=`url('https://starwars-visualguide.com/assets/img/characters/${characters.url.replace(/\D/g, '')}.jpg')`;
            card.className = 'cards';
            mainContent.appendChild(card);
            
            const bgNameCharacter = document.createElement('div');
            bgNameCharacter.className = 'bg-name-character';
            card.appendChild(bgNameCharacter);
            
            const nameCharacter = document.createElement('span');
            nameCharacter.className = "name-character";
            nameCharacter.innerText = `${characters.name}`; //vai modificar o text do elemento
            bgNameCharacter.appendChild(nameCharacter); //appendChild - Vai add um elemento filho no outro elemento
            
            
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? 'visible' : 'hidden';
        nextButton.style.visibility = responseJson.next ? 'visible' : 'hidden' ;


        currentPageUrl = url ;

    } catch (error) {
        console.log(error);
        alert(error)
    }
};





async function loadNextPage (){
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert("Erro ao carregar a próxima página")
    }

}


async function loadPreviousPage (){
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters (responseJson.previous)
        
    } catch (error) {
        console.log (error)
        alert("Erro ao carregar a próxima página")
    }

}