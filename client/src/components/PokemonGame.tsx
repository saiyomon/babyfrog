import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface PokemonGameProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define a simple Pokemon for the game
interface Pokemon {
  id: number;
  name: string;
  hp: number;
  attack: number;
  sprite: string;
}

// Placeholder Pokemon for the minigame
const gamePokemon: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    hp: 45,
    attack: 10,
    sprite: "data:image/png;base64,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"
  },
  {
    id: 2,
    name: "Charmander",
    hp: 39,
    attack: 12,
    sprite: "data:image/png;base64,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"
  },
  {
    id: 3,
    name: "Squirtle",
    hp: 44,
    attack: 9,
    sprite: "data:image/png;base64,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"
  },
  {
    id: 4,
    name: "Pikachu",
    hp: 35,
    attack: 13,
    sprite: "data:image/png;base64,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"
  }
];

// Game state - starts with player's pokemon
const initialGameState = {
  playerPokemon: gamePokemon[Math.floor(Math.random() * gamePokemon.length)],
  enemyPokemon: null,
  playerHealth: 0,
  enemyHealth: 0,
  gameState: 'waiting', // waiting, battle, win, lose
  battleLog: [],
};

export default function PokemonGame({ isOpen, onClose }: PokemonGameProps) {
  const [gameState, setGameState] = useState({ ...initialGameState });
  
  // Start a new battle
  const startBattle = () => {
    // Select a random enemy pokemon different from player's
    let randomEnemy;
    do {
      randomEnemy = gamePokemon[Math.floor(Math.random() * gamePokemon.length)];
    } while (randomEnemy.id === gameState.playerPokemon.id);
    
    // Set up battle state
    setGameState({
      ...gameState,
      enemyPokemon: randomEnemy,
      playerHealth: gameState.playerPokemon.hp,
      enemyHealth: randomEnemy.hp,
      gameState: 'battle',
      battleLog: [`Wild ${randomEnemy.name} appeared!`]
    });
  };
  
  // Player attacks the enemy
  const playerAttack = () => {
    if (gameState.gameState !== 'battle') return;
    
    // Calculate damage (with small random factor)
    const damage = Math.floor(gameState.playerPokemon.attack * (0.9 + Math.random() * 0.2));
    const newEnemyHealth = Math.max(0, gameState.enemyHealth - damage);
    
    // Update battle log
    const newLog = [
      ...gameState.battleLog,
      `${gameState.playerPokemon.name} attacks for ${damage} damage!`
    ];
    
    // Check if enemy is defeated
    if (newEnemyHealth <= 0) {
      setGameState({
        ...gameState,
        enemyHealth: 0,
        gameState: 'win',
        battleLog: [...newLog, `${gameState.enemyPokemon?.name} fainted!`, 'You won the battle!']
      });
      return;
    }
    
    // Enemy's turn to attack
    setTimeout(() => {
      if (gameState.enemyPokemon) {
        const enemyDamage = Math.floor(gameState.enemyPokemon.attack * (0.8 + Math.random() * 0.3));
        const newPlayerHealth = Math.max(0, gameState.playerHealth - enemyDamage);
        
        const updatedLog = [...newLog, `${gameState.enemyPokemon.name} attacks for ${enemyDamage} damage!`];
        
        // Check if player is defeated
        if (newPlayerHealth <= 0) {
          setGameState({
            ...gameState,
            enemyHealth: newEnemyHealth,
            playerHealth: 0,
            gameState: 'lose',
            battleLog: [...updatedLog, `${gameState.playerPokemon.name} fainted!`, 'You lost the battle!']
          });
        } else {
          // Battle continues
          setGameState({
            ...gameState,
            enemyHealth: newEnemyHealth,
            playerHealth: newPlayerHealth,
            battleLog: updatedLog
          });
        }
      }
    }, 1000);
  };
  
  // Reset the game
  const resetGame = () => {
    setGameState({
      ...initialGameState,
      playerPokemon: gamePokemon[Math.floor(Math.random() * gamePokemon.length)]
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] font-pixel">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-pink-900">Pokémon Battle!</DialogTitle>
          <DialogDescription className="text-center">
            {gameState.gameState === 'waiting' ? 'Start a Pokémon battle!' : 
             gameState.gameState === 'battle' ? 'Battle in progress...' : 
             gameState.gameState === 'win' ? 'Victory!' : 'Defeat!'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Player's Pokemon */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold">{gameState.playerPokemon.name}</h3>
            <img 
              src={gameState.playerPokemon.sprite} 
              alt={gameState.playerPokemon.name}
              className="h-20 w-20 object-contain my-2 pixel-art"
            />
            {gameState.gameState !== 'waiting' && (
              <div className="w-full mt-2">
                <div className="bg-gray-200 h-3 rounded-full">
                  <div 
                    className="bg-green-400 h-3 rounded-full"
                    style={{ 
                      width: `${(gameState.playerHealth / gameState.playerPokemon.hp) * 100}%`,
                      transition: 'width 0.5s'
                    }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-center">
                  {gameState.playerHealth}/{gameState.playerPokemon.hp} HP
                </p>
              </div>
            )}
          </div>
          
          {/* Enemy Pokemon (if battle started) */}
          {gameState.enemyPokemon && (
            <div className="flex flex-col items-center">
              <h3 className="font-bold">{gameState.enemyPokemon.name}</h3>
              <img 
                src={gameState.enemyPokemon.sprite} 
                alt={gameState.enemyPokemon.name}
                className="h-20 w-20 object-contain my-2 pixel-art"
              />
              <div className="w-full mt-2">
                <div className="bg-gray-200 h-3 rounded-full">
                  <div 
                    className="bg-red-400 h-3 rounded-full"
                    style={{ 
                      width: `${(gameState.enemyHealth / gameState.enemyPokemon.hp) * 100}%`,
                      transition: 'width 0.5s'
                    }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-center">
                  {gameState.enemyHealth}/{gameState.enemyPokemon.hp} HP
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Battle log */}
        {gameState.gameState !== 'waiting' && (
          <div className="bg-gray-100 p-3 rounded-md max-h-32 overflow-y-auto mb-4 border-2 border-gray-300">
            {gameState.battleLog.map((log, index) => (
              <p key={index} className="text-sm mb-1">{log}</p>
            ))}
          </div>
        )}
        
        <DialogFooter className="flex justify-center gap-4">
          {gameState.gameState === 'waiting' && (
            <Button 
              onClick={startBattle}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Start Battle
            </Button>
          )}
          
          {gameState.gameState === 'battle' && (
            <Button 
              onClick={playerAttack}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Attack!
            </Button>
          )}
          
          {(gameState.gameState === 'win' || gameState.gameState === 'lose') && (
            <Button 
              onClick={resetGame}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              New Battle
            </Button>
          )}
          
          <Button 
            onClick={onClose}
            variant="outline"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}