// eslint-disable-next-line no-use-before-define
export { renderPage, renderGrid };

const renderHeader = () => {
    const header = document.createElement('div');
    header.classList.add('header');
    
    const title = document.createElement('h1');
    title.textContent = 'BATTLESHIP';
    header.appendChild(title);

    return header;
}

const renderGrid = (classlist) => {
    const grid = document.createElement('div');
    grid.classList.add('grid-body');
    grid.classList.add(`${classlist}`);

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    for (let i=0; i<100;i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        const index = i.toString().split('');
        if (index.length === 1) { 
            square.classList.add(`${letters[i]}1`);
        }
        else {
            const x = parseInt(index[1], 10);
            const y = parseInt(index[0], 10);
            square.classList.add(`${letters[x]}${y+1}`);
        }
        grid.appendChild(square);
    }
    return grid;
}

const renderPlacementScreen = () => {
    const main = document.createElement('div');
    main.classList.add('placement-screen');

    const title = document.createElement('h2');
    title.classList.add('placement-title');
    title.textContent = 'Place your ships';

    const alignment = document.createElement('button');
    alignment.classList.add('alignment-button');
    alignment.textContent = 'Rotate';

    const grid = renderGrid('placement-grid');
    
    const addButton = document.createElement('button');
    addButton.classList.add('add-button');
    addButton.textContent = 'Start';

    main.appendChild(title);
    main.appendChild(alignment);
    main.appendChild(grid);
    main.appendChild(addButton);

    return main;
}

const renderMain = () => {
    const main = document.createElement('div');
    main.classList.add('main');

    const playerScore = document.createElement('p');
    playerScore.classList.add('player-score');
    playerScore.textContent = 'Ships down:  ';
    
    const aiScore = document.createElement('p');
    aiScore.classList.add('ai-score');
    aiScore.textContent = 'Ships down:  ';

    const playerGrid = renderGrid('player-grid');
    const aiGrid = renderGrid('ai-grid');

    const playerDiv = document.createElement('div');
    playerDiv.classList.add('grid-div');

    playerDiv.appendChild(playerScore);
    playerDiv.appendChild(playerGrid);
     
    const aiDiv = document.createElement('div');
    aiDiv.classList.add('grid-div');

    aiDiv.appendChild(aiScore);
    aiDiv.appendChild(aiGrid);
    
    main.appendChild(playerDiv);
    main.append(aiDiv);

    // main.style.display = "none";

    return main;
}

const renderModal = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalCard = document.createElement('div');
    modalCard.classList.add('modal-card');

    const textCard = document.createElement('div');
    textCard.classList.add('text-card');

    const close = document.createElement('span');
    close.classList.add('close-modal'); 
    close.innerHTML ='&times';

    const playAgain = document.createElement('button');
    playAgain.classList.add('play-again');
    playAgain.textContent = 'play again';

    modalCard.appendChild(close);
    modalCard.appendChild(textCard);
    modalCard.appendChild(playAgain);
    modal.appendChild(modalCard);
    return modal;
}

const renderPage = () => {
    document.body.appendChild(renderHeader());
    document.body.appendChild(renderPlacementScreen());
    document.body.appendChild(renderMain());
    document.body.appendChild(renderModal());
}