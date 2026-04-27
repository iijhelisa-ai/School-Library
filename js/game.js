const gameData = {
    categories: [
        { id: 'cat-400', name: '자연과학', num: '400', desc: '동물, 식물, 우주' },
        { id: 'cat-800', name: '문학', num: '800', desc: '동화, 시, 소설' },
        { id: 'cat-900', name: '역사', num: '900', desc: '옛날 이야기, 위인' }
    ],
    books: [
        { id: 'book-1', title: '공룡의 세계', category: 'cat-400' },
        { id: 'book-2', title: '신비한 별자리', category: 'cat-400' },
        { id: 'book-3', title: '백설공주', category: 'cat-800' },
        { id: 'book-4', title: '흥부와 놀부', category: 'cat-800' },
        { id: 'book-5', title: '이순신 장군', category: 'cat-900' },
        { id: 'book-6', title: '조선왕조실록', category: 'cat-900' }
    ]
};

let currentScore = 0;
let draggedBook = null;
let matchedBooks = 0;

function initGame() {
    const basketsContainer = document.getElementById('baskets-container');
    const booksContainer = document.getElementById('books-container');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('game-feedback');
    const resetBtn = document.getElementById('game-reset-btn');

    // Reset variables
    currentScore = 0;
    matchedBooks = 0;
    scoreElement.textContent = currentScore;
    feedbackElement.textContent = '도전 시작!';
    feedbackElement.style.color = '#00b894';
    resetBtn.classList.add('hidden');

    // Clear containers
    basketsContainer.innerHTML = '';
    booksContainer.innerHTML = '';

    // Create baskets
    gameData.categories.forEach(cat => {
        const basket = document.createElement('div');
        basket.classList.add('basket');
        basket.dataset.category = cat.id;
        basket.innerHTML = `
            <h4>${cat.num}</h4>
            <p>${cat.name}</p>
            <span style="font-size:0.8rem; color:#b2bec3;">${cat.desc}</span>
        `;

        // Drag events for basket
        basket.addEventListener('dragover', (e) => {
            e.preventDefault(); // allow drop
            basket.classList.add('drag-over');
        });

        basket.addEventListener('dragleave', () => {
            basket.classList.remove('drag-over');
        });

        basket.addEventListener('drop', (e) => {
            e.preventDefault();
            basket.classList.remove('drag-over');
            handleDrop(basket);
        });

        basketsContainer.appendChild(basket);
    });

    // Create books (shuffle them)
    const shuffledBooks = [...gameData.books].sort(() => Math.random() - 0.5);
    shuffledBooks.forEach(book => {
        const bookEl = document.createElement('div');
        bookEl.classList.add('book-item');
        bookEl.draggable = true;
        bookEl.dataset.id = book.id;
        bookEl.dataset.category = book.category;
        bookEl.textContent = book.title;

        // Drag events for book
        bookEl.addEventListener('dragstart', () => {
            draggedBook = bookEl;
            setTimeout(() => bookEl.style.opacity = '0.5', 0);
        });

        bookEl.addEventListener('dragend', () => {
            draggedBook = null;
            bookEl.style.opacity = '1';
        });

        booksContainer.appendChild(bookEl);
    });
}

function handleDrop(basket) {
    if (!draggedBook) return;

    const bookCategory = draggedBook.dataset.category;
    const basketCategory = basket.dataset.category;
    const feedbackElement = document.getElementById('game-feedback');
    const scoreElement = document.getElementById('score');

    if (bookCategory === basketCategory) {
        // Correct
        currentScore += 10;
        matchedBooks++;
        scoreElement.textContent = currentScore;
        feedbackElement.textContent = '정답입니다! 훌륭해요! 🌟';
        feedbackElement.style.color = '#00b894';
        
        // Remove book
        draggedBook.remove();

        // Check win condition
        if (matchedBooks === gameData.books.length) {
            feedbackElement.textContent = '모두 맞췄어요! 도서관 박사님! 🎉';
            document.getElementById('game-reset-btn').classList.remove('hidden');
        }
    } else {
        // Incorrect
        feedbackElement.textContent = '앗, 다시 생각해보세요! 🤔';
        feedbackElement.style.color = '#d63031';
    }
}

// Global scope so app.js can call it if needed, though app.js already checks if it exists
window.initGame = initGame;
