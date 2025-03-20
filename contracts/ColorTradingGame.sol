// contracts/ColorTrading.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ColorTrading {
    struct Game {
        uint256 id;
        uint256 startTime;
        uint256 entryFee;
        mapping(address => string) playerColors;
        string winningColor;
        bool isFinalized;
    }
    
    mapping(uint256 => Game) public games;
    uint256 public gameCounter;
    
    event GameCreated(uint256 gameId, uint256 startTime);
    event PlayerJoined(uint256 gameId, address player, string color);
    event GameFinalized(uint256 gameId, string winningColor);
    
    function createGame(uint256 _startTime, uint256 _entryFee) external returns (uint256) {
        gameCounter++;
        Game storage newGame = games[gameCounter];
        newGame.id = gameCounter;
        newGame.startTime = _startTime;
        newGame.entryFee = _entryFee;
        
        emit GameCreated(gameCounter, _startTime);
        return gameCounter;
    }
    
    function joinGame(uint256 _gameId, string calldata _color) external payable {
        Game storage game = games[_gameId];
        require(block.timestamp < game.startTime, "Game already started");
        require(msg.value == game.entryFee, "Incorrect entry fee");
        
        game.playerColors[msg.sender] = _color;
        
        emit PlayerJoined(_gameId, msg.sender, _color);
    }
    
    function finalizeGame(uint256 _gameId, string calldata _winningColor) external {
        Game storage game = games[_gameId];
        game.winningColor = _winningColor;
        game.isFinalized = true;
        
        emit GameFinalized(_gameId, _winningColor);
    }
}
