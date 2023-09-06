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

            card.onclick = () => {
                const modal = document.getElementById ('modal');
                modal.style.visibility = 'visible' ;

                const modalContent =document.getElementById ('modal-content')
                modalContent.innerHTML = '';

                const characterImg = document.createElement ('div')
                characterImg.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${characters.url.replace(/\D/g, '')}.jpg')`
                characterImg.className = 'character-img'
                modalContent.appendChild (characterImg)

                const characterName = document.createElement ('span')
                characterName.className = 'allText'
                characterName.innerText = `Nome : ${characters.name} `
                modalContent.appendChild (characterName)

                const characterHeight = document.createElement ('span')
                characterHeight.className = 'allText'
                characterHeight.innerText = `Altura : ${characters.height} `
                modalContent.appendChild (characterHeight)
            
                const characterMass = document.createElement ('span')
                characterMass.className = 'allText'
                characterMass.innerText = `Pesso : ${characters.mass}`
                modalContent.appendChild (characterMass)

                const characterEyeColor =document.createElement ('span')
                characterEyeColor.className = 'allText'
                characterEyeColor.innerText = `Cor dos olhos : ${characters.eye_color}`
                modalContent.appendChild (characterEyeColor)

                const characterBirthYear = document.createElement ('span')
                characterBirthYear.className = 'allText'
                characterBirthYear.innerText = `Nascimento : ${characters.birth_year}`
                modalContent.appendChild (characterBirthYear)


            }


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

function hideModel () {
    const modal = document.getElementById('modal');

    modal.style.visibility = 'hidden';
}