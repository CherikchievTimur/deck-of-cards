const desk = document.querySelector(".desk");

let localDeckId = localStorage.getItem("deckId");
let playersCount = 0;
const pCards = []

const getDeckId = async () => {
    //if(!localDeckId){
        const request = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
        const data = await request.json();

        localDeckId = data.deck_id;
    //    localStorage.setItem('deckId', localDeckId);
    //}

    return localDeckId;
}

const drawCards = async (count) =>{
    const deckId = await getDeckId();
    const request = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
    const data = await request.json();

    return data.cards;
}

const onNumChange = (e) => { playersCount = e.target.value; }

const onDraw = async () => {
    for(let i=0; i < playersCount; ++i){
        pCards.push(await drawCards(6));
    }

    console.log(pCards);

    draw();    
}

const draw = () => {
    for (let player of pCards){
        const div = document.createElement('div');

        for(let card of player){
            const img = document.createElement('img');
            img.src = card.image;
            img.alt = card.code;

            div.append(img);
            console.log(card.image)
        }

        desk.append(div);
    }
}

const nextStep = () => {

}