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
        }