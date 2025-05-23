class MemoryGame {
           constructor() {
                this.currentLevel = 'easy';
                this.cards = [];
                this.flippedCards = [];
                this.moves = 0;
                this.matches = 0;
                this.totalPairs = 0;
                this.timer = 0;
                this.timerInterval = null;
                this.gameStarted = false;
                
                this.levels = {
                    easy: { rows: 2, cols: 3, pairs: 3 },
                    medium: { rows: 3, cols: 4, pairs: 6 },
                    hard: { rows: 4, cols: 5, pairs: 10 }
                };

                this.emojis = ['🎮', '🎯', '🎨', '🎪', '🎭', '🎬', '🎵', '🎸', '🎺', '🎻', '🎲', '🎳', '⭐', '🌟', '✨', '🔥', '💎', '🏆', '🎖️', '🏅'];
                
                this.init();
            }
             init() {
                this.bindEvents();
                this.createBoard();
                this.updateStats();
            }
            bindEvents() {
                document.querySelectorAll('.level-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.setLevel(e.target.dataset.level);
                    });
                });

                document.getElementById('resetBtn').addEventListener('click', () => {
                    this.resetGame();
                });

                document.getElementById('overlay').addEventListener('click', () => {
                    this.hideWinMessage();
                });
            }


 setLevel(level) {
                this.currentLevel = level;
                document.querySelectorAll('.level-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-level="${level}"]`).classList.add('active');
                
                const gameBoard = document.getElementById('gameBoard');
                gameBoard.className = `game-board ${level}`;
                
                this.resetGame();
            }
            createBoard() {
                const level = this.levels[this.currentLevel];
                this.totalPairs = level.pairs;
                
                const gameBoard = document.getElementById('gameBoard');
                gameBoard.innerHTML = '';

                // Create pairs of cards
                const cardValues = this.emojis.slice(0, this.totalPairs);
                const allCards = [...cardValues, ...cardValues];
                
                // Shuffle cards
                this.shuffle(allCards);

                allCards.forEach((value, index) => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.dataset.value = value;
                    card.dataset.index = index;
                    card.addEventListener('click', () => this.flipCard(card));
                    gameBoard.appendChild(card);
                });

                this.cards = document.querySelectorAll('.card');
            }

            shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            flipCard(card) {
                if (!this.gameStarted) {
                    this.startTimer();
                    this.gameStarted = true;
                }

                if (card.classList.contains('flipped') || 
                    card.classList.contains('matched') || 
                    this.flippedCards.length >= 2) {
                    return;
                }

                card.classList.add('flipped');
                card.textContent = card.dataset.value;
                this.flippedCards.push(card);

                if (this.flippedCards.length === 2) {
                    this.moves++;
                    this.updateStats();
                    
                    setTimeout(() => {
                        this.checkMatch();
                    }, 500);
                }
            }

            checkMatch() {
                const [card1, card2] = this.flippedCards;

                if (card1.dataset.value === card2.dataset.value) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    
                    this.matches++;
                    this.updateStats();

                    if (this.matches === this.totalPairs) {
                        this.gameWon();
                    }
                } else {
                    card1.classList.add('wrong');
                    card2.classList.add('wrong');
                    
                    setTimeout(() => {
                        card1.classList.remove('flipped', 'wrong');
                        card2.classList.remove('flipped', 'wrong');
                        card1.textContent = '';
                        card2.textContent = '';
                    }, 1000);
                }

                this.flippedCards = [];
            }

            startTimer() {
                this.timerInterval = setInterval(() => {
                    this.timer++;
                    this.updateStats();
                }, 1000);
            }

            stopTimer() {
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                    this.timerInterval = null;
                }
            }

            formatTime(seconds) {
                const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
                const secs = (seconds % 60).toString().padStart(2, '0');
                return `${mins}:${secs}`;
            }

            updateStats() {
                document.getElementById('moves').textContent = this.moves;
                document.getElementById('matches').textContent = this.matches;
                document.getElementById('timer').textContent = this.formatTime(this.timer);
            }

            gameWon() {
                this.stopTimer();
                
                const winStats = document.getElementById('winStats');
                winStats.innerHTML = `
                    <div style="margin-top: 15px; font-size: 1rem;">
                        Time: ${this.formatTime(this.timer)} | Moves: ${this.moves}
                    </div>
                `;

                document.getElementById('overlay').classList.add('show');
                document.getElementById('winMessage').classList.add('show');
            }

            hideWinMessage() {
                document.getElementById('overlay').classList.remove('show');
                document.getElementById('winMessage').classList.remove('show');
            }

            resetGame() {
                this.stopTimer();
                this.moves = 0;
                this.matches = 0;
                this.timer = 0;
                this.gameStarted = false;
                this.flippedCards = [];
                
                this.hideWinMessage();
                this.createBoard();
                this.updateStats();
            }
        }

        // Initialize the game when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new MemoryGame();
        });











        }