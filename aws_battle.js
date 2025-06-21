// AWS Battle Game Logic
class AWSBattleGame {
    constructor() {
        this.board = Array(3).fill().map(() => Array(3).fill(null));
        this.playerCards = [];
        this.opponentCards = [];
        this.playerHand = [];
        this.selectedCard = null;
        this.currentPlayer = 'player';
        this.gameOver = false;
        
        // AWS Services with real icon paths
        this.awsServices = [
            { 
                name: 'Amazon EC2', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Compute/48/Arch_Amazon-EC2_48.png',
                values: [8, 6, 7, 5] 
            },
            { 
                name: 'Amazon S3', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Storage/48/Arch_Amazon-Simple-Storage-Service_48.png',
                values: [7, 8, 6, 7] 
            },
            { 
                name: 'AWS Lambda', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Compute/48/Arch_AWS-Lambda_48.png',
                values: [9, 5, 8, 6] 
            },
            { 
                name: 'Amazon RDS', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Database/48/Arch_Amazon-RDS_48.png',
                values: [6, 7, 9, 8] 
            },
            { 
                name: 'Amazon DynamoDB', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Database/48/Arch_Amazon-DynamoDB_48.png',
                values: [7, 6, 8, 9] 
            },
            { 
                name: 'Amazon EBS', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Storage/48/Arch_Amazon-Elastic-Block-Store_48.png',
                values: [6, 8, 7, 7] 
            },
            { 
                name: 'Amazon Aurora', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Database/48/Arch_Amazon-Aurora_48.png',
                values: [8, 9, 5, 6] 
            },
            { 
                name: 'AWS Batch', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Compute/48/Arch_AWS-Batch_48.png',
                values: [5, 7, 6, 8] 
            },
            { 
                name: 'Amazon EFS', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Storage/48/Arch_Amazon-EFS_48.png',
                values: [6, 6, 7, 7] 
            },
            { 
                name: 'Amazon ElastiCache', 
                icon: 'Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/Architecture-Service-Icons_02072025/Arch_Database/48/Arch_Amazon-ElastiCache_48.png',
                values: [7, 8, 6, 5] 
            }
        ];
        
        this.initGame();
    }
    
    initGame() {
        this.shuffleCards();
        this.dealCards();
        this.renderGame();
        this.updateScore();
    }
    
    shuffleCards() {
        const shuffled = [...this.awsServices].sort(() => Math.random() - 0.5);
        this.playerCards = shuffled.slice(0, 5);
        this.opponentCards = shuffled.slice(5, 10);
        this.playerHand = [...this.playerCards];
    }
    
    dealCards() {
        this.board = Array(3).fill().map(() => Array(3).fill(null));
        this.gameOver = false;
        this.currentPlayer = 'player';
    }
    
    renderGame() {
        this.renderBoard();
        this.renderPlayerHand();
        this.updateTurnIndicator();
    }
    
    renderBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const card = this.board[row][col];
            
            cell.innerHTML = '';
            if (card) {
                const cardElement = this.createCardElement(card);
                cell.appendChild(cardElement);
            }
        });
    }
    
    renderPlayerHand() {
        const handContainer = document.querySelector('.hand-cards');
        handContainer.innerHTML = '';
        
        this.playerHand.forEach((card, index) => {
            const cardElement = this.createHandCardElement(card, index);
            handContainer.appendChild(cardElement);
        });
    }
    
    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${card.owner}`;
        
        cardDiv.innerHTML = `
            <div class="card-values">
                <div class="value-top">${card.values[0]}</div>
                <div class="value-right">${card.values[1]}</div>
                <div class="value-bottom">${card.values[2]}</div>
                <div class="value-left">${card.values[3]}</div>
            </div>
            <div class="card-icon" style="background-image: url('${card.icon}')"></div>
            <div class="card-name">${card.name}</div>
        `;
        
        return cardDiv;
    }
    
    createHandCardElement(card, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'hand-card';
        cardDiv.dataset.index = index;
        
        cardDiv.innerHTML = `
            <div class="card-values">
                <div class="value-top">${card.values[0]}</div>
                <div class="value-right">${card.values[1]}</div>
                <div class="value-bottom">${card.values[2]}</div>
                <div class="value-left">${card.values[3]}</div>
            </div>
            <div class="card-icon" style="background-image: url('${card.icon}')"></div>
            <div class="card-name">${card.name}</div>
        `;
        
        cardDiv.addEventListener('click', () => this.selectCard(index));
        return cardDiv;
    }
    
    selectCard(index) {
        if (this.currentPlayer !== 'player' || this.gameOver) return;
        
        document.querySelectorAll('.hand-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
        this.selectedCard = index;
    }
    
    playCard(row, col) {
        if (this.gameOver || this.board[row][col] || this.selectedCard === null) return;
        
        const card = { ...this.playerHand[this.selectedCard], owner: 'player' };
        this.board[row][col] = card;
        this.playerHand.splice(this.selectedCard, 1);
        this.selectedCard = null;
        
        this.checkCaptures(row, col, card);
        this.renderGame();
        this.updateScore();
        
        if (this.checkGameEnd()) {
            this.endGame();
            return;
        }
        
        this.currentPlayer = 'opponent';
        this.updateTurnIndicator();
        setTimeout(() => this.opponentTurn(), 1000);
    }
    
    checkCaptures(row, col, card) {
        const directions = [
            [-1, 0, 0, 2], // 上: カードの上の値 vs 相手の下の値
            [0, 1, 1, 3],  // 右: カードの右の値 vs 相手の左の値
            [1, 0, 2, 0],  // 下: カードの下の値 vs 相手の上の値
            [0, -1, 3, 1]  // 左: カードの左の値 vs 相手の右の値
        ];
        
        directions.forEach(([dRow, dCol, myValueIndex, opponentValueIndex]) => {
            const newRow = row + dRow;
            const newCol = col + dCol;
            
            if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
                const adjacentCard = this.board[newRow][newCol];
                if (adjacentCard && adjacentCard.owner !== card.owner) {
                    if (card.values[myValueIndex] > adjacentCard.values[opponentValueIndex]) {
                        adjacentCard.owner = card.owner;
                    }
                }
            }
        });
    }
    
    opponentTurn() {
        if (this.gameOver) return;
        
        const emptyCells = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!this.board[row][col]) {
                    emptyCells.push([row, col]);
                }
            }
        }
        
        if (emptyCells.length === 0 || this.opponentCards.length === 0) return;
        
        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cardIndex = Math.floor(Math.random() * this.opponentCards.length);
        const card = { ...this.opponentCards[cardIndex], owner: 'opponent' };
        
        this.board[row][col] = card;
        this.opponentCards.splice(cardIndex, 1);
        
        this.checkCaptures(row, col, card);
        this.renderGame();
        this.updateScore();
        
        if (this.checkGameEnd()) {
            this.endGame();
            return;
        }
        
        this.currentPlayer = 'player';
        this.updateTurnIndicator();
    }
    
    updateScore() {
        let playerScore = 0;
        let opponentScore = 0;
        
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const card = this.board[row][col];
                if (card) {
                    if (card.owner === 'player') playerScore++;
                    else opponentScore++;
                }
            }
        }
        
        playerScore += this.playerHand.length;
        opponentScore += this.opponentCards.length;
        
        document.getElementById('player-score').textContent = playerScore;
        document.getElementById('opponent-score').textContent = opponentScore;
    }
    
    updateTurnIndicator() {
        const indicator = document.getElementById('current-turn');
        indicator.textContent = this.currentPlayer === 'player' ? 'あなたのターン' : 'CPUのターン';
    }
    
    checkGameEnd() {
        const emptyCells = this.board.flat().filter(cell => cell === null).length;
        return emptyCells === 0 || (this.playerHand.length === 0 && this.opponentCards.length === 0);
    }
    
    endGame() {
        this.gameOver = true;
        const playerScore = parseInt(document.getElementById('player-score').textContent);
        const opponentScore = parseInt(document.getElementById('opponent-score').textContent);
        
        let message;
        if (playerScore > opponentScore) {
            message = 'おめでとうございます！あなたの勝利です！';
        } else if (opponentScore > playerScore) {
            message = '残念！CPUの勝利です。';
        } else {
            message = '引き分けです！';
        }
        
        setTimeout(() => {
            alert(message);
        }, 500);
    }
}

// ゲーム初期化
let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new AWSBattleGame();
    
    // ボードのクリックイベント
    document.querySelectorAll('.cell').forEach((cell, index) => {
        cell.addEventListener('click', () => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            game.playCard(row, col);
        });
    });
});

function startNewGame() {
    game = new AWSBattleGame();
}