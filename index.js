document.addEventListener('DOMContentLoaded', () => {
    console.log('work')
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
    const quoteDisplayElement = document.getElementById('quote-display');
    const quoteInputElement = document.getElementById('quoteInput');
    const timerElement = document.getElementById('timer');
    let correctQuote = true;

    async function getRandomQuote() {
        return fetch(RANDOM_QUOTE_API_URL)
            .then(res => res.json())
            .then(data => data.content);
    }

    async function renderNextQuote(){
        const quote = await getRandomQuote();
        quoteDisplayElement.innerHTML = '';
        quote.split('').forEach(character => {
            const characterSpan = document.createElement('span');
            characterSpan.innerText = character;
            quoteDisplayElement.appendChild(characterSpan);
        });

        quoteInputElement.value = null;
    }


    quoteInputElement.addEventListener('input', () => {
        const arrayQuote = quoteDisplayElement.querySelectorAll('span');
        const arrayValue = quoteInputElement.value.split('');
        
        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index];

            if(character == null){
                characterSpan.classList.remove('correct');
                characterSpan.classList.remove('incorrect');
                correctQuote = false;

            }else if(character === characterSpan.innerText){
                correctQuote = true;
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
            }else{

                characterSpan.classList.add('incorrect');
                characterSpan.classList.remove('correct');
                correctQuote = false;
            }
        });

        if(correctQuote) renderNextQuote();
    });

    renderNextQuote();
});