import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrogBattle from './FrogBattle';
import { 
  PixelFrog, PixelNinjaFrog, PixelMageFrog, PixelKnightFrog, PixelWitchFrog,
  PixelBug, PixelFly, PixelSpider, PixelDragonfly, PixelWasp, PixelBeetle 
} from './PixelSprites';

interface FrogClickerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Game data types
interface Skill {
  id: number;
  name: string;
  description: string;
  damage: number;
  cooldown: number;
  level: number;
  isUnlocked: boolean;
  lastUsed: number;
}

interface Enemy {
  id: number;
  name: string;
  hp: number;
  maxHp: number;
  sprite: string;
  level: number;
  experienceReward: number;
}

interface FrogClass {
  id: number;
  name: string;
  description: string;
  sprite: string;
  requiredLevel: number;
  skills: Skill[];
}

interface Upgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  effect: string;
  purchased: boolean;
}

// Main game component
export default function FrogClicker({ isOpen, onClose }: FrogClickerProps) {
  // Game state
  const [level, setLevel] = useState<number>(1);
  const [experience, setExperience] = useState<number>(0);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState<number>(100);
  const [stats, setStats] = useState({
    attack: 5,
    clickPower: 1,
    autoClickSpeed: 0
  });
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [gold, setGold] = useState<number>(0);
  const [selectedClass, setSelectedClass] = useState<FrogClass | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([]);
  const [showClassSelection, setShowClassSelection] = useState<boolean>(false);
  const [autoClicking, setAutoClicking] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("battle");
  const [showSkillEffect, setShowSkillEffect] = useState<boolean>(false);
  const [currentSkillType, setCurrentSkillType] = useState<string>("normal");
  
  const autoClickerRef = useRef<number | null>(null);
  const skillIntervalRef = useRef<number | null>(null);

  // Initial skills (unlocked as player levels up)
  const initialSkills: Skill[] = [
    { id: 1, name: "Lily Pad Slam", description: "A basic attack", damage: 3, cooldown: 3, level: 1, isUnlocked: false, lastUsed: 0 },
    { id: 2, name: "Tongue Lash", description: "Whip enemy with your tongue", damage: 5, cooldown: 5, level: 3, isUnlocked: false, lastUsed: 0 },
    { id: 3, name: "Splash Attack", description: "Call upon water magic", damage: 8, cooldown: 8, level: 5, isUnlocked: false, lastUsed: 0 },
    { id: 4, name: "Croak Blast", description: "Sonic attack that damages enemies", damage: 12, cooldown: 10, level: 7, isUnlocked: false, lastUsed: 0 },
    { id: 5, name: "Toxic Skin", description: "Poison enemies with your touch", damage: 15, cooldown: 15, level: 10, isUnlocked: false, lastUsed: 0 },
  ];

  // Available frog classes
  const frogClasses: FrogClass[] = [
    {
      id: 1,
      name: "Ninja Frog",
      description: "Swift and stealthy, the Ninja Frog excels at quick attacks",
      sprite: "🐸⚔️",
      requiredLevel: 10,
      skills: [
        { id: 101, name: "Shadow Strike", description: "Attack from the shadows", damage: 20, cooldown: 8, level: 11, isUnlocked: true, lastUsed: 0 },
        { id: 102, name: "Shuriken Throw", description: "Throw ninja stars", damage: 25, cooldown: 10, level: 12, isUnlocked: true, lastUsed: 0 },
        { id: 103, name: "Smoke Bomb", description: "Confuse enemies with smoke", damage: 15, cooldown: 5, level: 13, isUnlocked: true, lastUsed: 0 },
        { id: 104, name: "Blade Cyclone", description: "Spin attack with blades", damage: 35, cooldown: 15, level: 14, isUnlocked: true, lastUsed: 0 },
        { id: 105, name: "Assassination", description: "Deadly precision attack", damage: 50, cooldown: 20, level: 15, isUnlocked: true, lastUsed: 0 },
      ]
    },
    {
      id: 2,
      name: "Mage Frog",
      description: "Magical and mystical, the Mage Frog uses powerful spells",
      sprite: "🐸✨",
      requiredLevel: 10,
      skills: [
        { id: 201, name: "Fireball", description: "Launch a ball of fire", damage: 22, cooldown: 7, level: 11, isUnlocked: true, lastUsed: 0 },
        { id: 202, name: "Ice Shard", description: "Sharp pieces of ice", damage: 18, cooldown: 6, level: 12, isUnlocked: true, lastUsed: 0 },
        { id: 203, name: "Lightning Bolt", description: "Shock enemies with lightning", damage: 28, cooldown: 12, level: 13, isUnlocked: true, lastUsed: 0 },
        { id: 204, name: "Arcane Explosion", description: "Area effect magical damage", damage: 32, cooldown: 14, level: 14, isUnlocked: true, lastUsed: 0 },
        { id: 205, name: "Meteor Strike", description: "Call down a meteor", damage: 55, cooldown: 25, level: 15, isUnlocked: true, lastUsed: 0 },
      ]
    },
    {
      id: 3,
      name: "Knight Frog",
      description: "Armored and brave, the Knight Frog has high defenses",
      sprite: "🐸🛡️",
      requiredLevel: 10,
      skills: [
        { id: 301, name: "Shield Bash", description: "Stun enemies with your shield", damage: 15, cooldown: 5, level: 11, isUnlocked: true, lastUsed: 0 },
        { id: 302, name: "Sword Slash", description: "Basic sword attack", damage: 20, cooldown: 7, level: 12, isUnlocked: true, lastUsed: 0 },
        { id: 303, name: "Heroic Strike", description: "Powerful melee attack", damage: 30, cooldown: 10, level: 13, isUnlocked: true, lastUsed: 0 },
        { id: 304, name: "Charge", description: "Rush at your enemy", damage: 35, cooldown: 12, level: 14, isUnlocked: true, lastUsed: 0 },
        { id: 305, name: "Frog's Judgment", description: "Divine attack", damage: 50, cooldown: 20, level: 15, isUnlocked: true, lastUsed: 0 },
      ]
    },
    {
      id: 4,
      name: "Witch Frog",
      description: "Mystical and powerful, the Witch Frog uses potions and curses",
      sprite: "🐸🧙‍♀️",
      requiredLevel: 10,
      skills: [
        { id: 401, name: "Hex", description: "Curse the enemy", damage: 18, cooldown: 6, level: 11, isUnlocked: true, lastUsed: 0 },
        { id: 402, name: "Poison Brew", description: "Throw a poisonous potion", damage: 25, cooldown: 9, level: 12, isUnlocked: true, lastUsed: 0 },
        { id: 403, name: "Familiar Attack", description: "Your familiar attacks", damage: 22, cooldown: 8, level: 13, isUnlocked: true, lastUsed: 0 },
        { id: 404, name: "Witch's Brew", description: "Powerful potion explosion", damage: 35, cooldown: 15, level: 14, isUnlocked: true, lastUsed: 0 },
        { id: 405, name: "Curse of Doom", description: "Ultimate curse", damage: 52, cooldown: 22, level: 15, isUnlocked: true, lastUsed: 0 },
      ]
    }
  ];

  // Shop upgrades
  const initialUpgrades: Upgrade[] = [
    { id: 1, name: "Sharp Tongue", description: "Increase attack power by 2", cost: 50, effect: "attack", purchased: false },
    { id: 2, name: "Strong Legs", description: "Increase click power by 1", cost: 30, effect: "clickPower", purchased: false },
    { id: 3, name: "Auto-Croak", description: "Automatically click once every 5 seconds", cost: 100, effect: "autoClickStart", purchased: false },
    { id: 4, name: "Fast Croaker", description: "Increase auto-click speed", cost: 200, effect: "autoClickSpeed", purchased: false },
    { id: 5, name: "Poison Skin", description: "Increase attack power by 5", cost: 300, effect: "attack", purchased: false },
    { id: 6, name: "Master Clicker", description: "Double click power", cost: 500, effect: "clickPower", purchased: false },
  ];

  // Enemy generator based on player level
  const generateEnemy = () => {
    const enemyTypes = [
      "Bug", "Fly", "Mosquito", "Beetle", "Worm", 
      "Slug", "Snail", "Spider", "Ant", "Cricket",
      "Dragonfly", "Butterfly", "Moth", "Wasp", "Hornet"
    ];
    
    const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemyLevel = Math.max(1, Math.floor(level * 0.8 + Math.random() * level * 0.4));
    const maxHp = 20 + (enemyLevel * 5);
    
    const newEnemy: Enemy = {
      id: Date.now(),
      name: `Level ${enemyLevel} ${enemyType}`,
      hp: maxHp,
      maxHp: maxHp,
      sprite: getEnemySprite(enemyType),
      level: enemyLevel,
      experienceReward: 10 + (enemyLevel * 5)
    };
    
    setEnemy(newEnemy);
  };

  const getEnemySprite = (type: string): string => {
    const sprites: {[key: string]: string} = {
      "Bug": "🐛",
      "Fly": "🪰",
      "Mosquito": "🦟",
      "Beetle": "🪲",
      "Worm": "🪱",
      "Slug": "🐌",
      "Snail": "🐌",
      "Spider": "🕷️",
      "Ant": "🐜",
      "Cricket": "🦗",
      "Dragonfly": "🦋",
      "Butterfly": "🦋",
      "Moth": "🦋",
      "Wasp": "🐝",
      "Hornet": "🐝"
    };
    
    return sprites[type] || "🐛";
  };

  // Initialize game
  useEffect(() => {
    if (isOpen) {
      // Set initial game state
      setSkills(initialSkills);
      setUpgrades(initialUpgrades);
      if (!enemy) {
        generateEnemy();
      }
      
      // Start automatic skill usage if available
      if (skillIntervalRef.current === null) {
        const interval = window.setInterval(() => {
          useSkillsAutomatically();
        }, 1000);
        skillIntervalRef.current = interval;
      }
    }
    
    return () => {
      // Clean up intervals when component unmounts
      if (autoClickerRef.current !== null) {
        clearInterval(autoClickerRef.current);
        autoClickerRef.current = null;
      }
      
      if (skillIntervalRef.current !== null) {
        clearInterval(skillIntervalRef.current);
        skillIntervalRef.current = null;
      }
    };
  }, [isOpen]);

  // Check for level ups and skill unlocks
  useEffect(() => {
    // Check for level up
    if (experience >= experienceToNextLevel) {
      levelUp();
    }
    
    // Check for skill unlocks based on level
    const updatedSkills = skills.map(skill => {
      if (!skill.isUnlocked && level >= skill.level) {
        return { ...skill, isUnlocked: true };
      }
      return skill;
    });
    
    setSkills(updatedSkills);
    
    // Show class selection at level 10
    if (level === 10 && !selectedClass && !showClassSelection) {
      setShowClassSelection(true);
    }
  }, [experience, level]);

  // Auto-clicker effect
  useEffect(() => {
    if (autoClicking && autoClickerRef.current === null) {
      const clickSpeed = 5000 / (stats.autoClickSpeed + 1);
      const interval = window.setInterval(() => {
        handleClick();
      }, clickSpeed);
      autoClickerRef.current = interval;
    } else if (!autoClicking && autoClickerRef.current !== null) {
      clearInterval(autoClickerRef.current);
      autoClickerRef.current = null;
    }
    
    return () => {
      if (autoClickerRef.current !== null) {
        clearInterval(autoClickerRef.current);
        autoClickerRef.current = null;
      }
    };
  }, [autoClicking, stats.autoClickSpeed]);

  // Level up function
  const levelUp = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setExperience(experience - experienceToNextLevel);
    setExperienceToNextLevel(Math.floor(experienceToNextLevel * 1.5));
    
    // Check for checkpoints (every 10 levels)
    if (newLevel % 10 === 0) {
      // Bonus for reaching checkpoint
      setGold(gold + newLevel * 20);
      alert(`Checkpoint reached! Level ${newLevel}! You've earned ${newLevel * 20} gold as a bonus!`);
    }
  };

  // Handle manual click
  const handleClick = () => {
    if (enemy && enemy.hp > 0) {
      const damage = stats.clickPower;
      const newHp = Math.max(0, enemy.hp - damage);
      
      // Show basic attack effect
      setCurrentSkillType("normal");
      setShowSkillEffect(true);
      
      // Hide effect after a short time
      setTimeout(() => {
        setShowSkillEffect(false);
      }, 300);
      
      // Update enemy HP
      setEnemy({
        ...enemy,
        hp: newHp
      });
      
      // Check if enemy is defeated
      if (newHp === 0) {
        defeatEnemy();
      }
    }
  };

  // Automatically use skills if they're off cooldown
  const useSkillsAutomatically = () => {
    if (!enemy || enemy.hp <= 0) return;
    
    const now = Date.now();
    let totalDamage = 0;
    
    // Get all active skills that are off cooldown
    const availableSkills = [...skills, ...(selectedClass?.skills || [])]
      .filter(skill => skill.isUnlocked && now - skill.lastUsed >= skill.cooldown * 1000);
    
    if (availableSkills.length > 0) {
      // Use a random available skill
      const skillToUse = availableSkills[Math.floor(Math.random() * availableSkills.length)];
      
      // Calculate damage with stats
      const damage = skillToUse.damage + stats.attack;
      totalDamage += damage;
      
      // Determine skill type/effect based on name or class
      let skillType = "normal";
      
      if (skillToUse.name.includes("Fire") || skillToUse.name.includes("Meteor") || skillToUse.name.includes("Explosion")) {
        skillType = "fire";
      } else if (skillToUse.name.includes("Ice") || skillToUse.name.includes("Freeze")) {
        skillType = "ice";
      } else if (skillToUse.name.includes("Lightning") || skillToUse.name.includes("Thunder")) {
        skillType = "lightning";
      } else if (skillToUse.name.includes("Shadow") || skillToUse.name.includes("Dark") || skillToUse.name.includes("Curse")) {
        skillType = "shadow";
      } else if (skillToUse.name.includes("Toxic") || skillToUse.name.includes("Poison")) {
        skillType = "poison";
      } else if (skillToUse.name.includes("Slash") || skillToUse.name.includes("Blade") || skillToUse.name.includes("Sword")) {
        skillType = "slash";
      }
      
      // Show skill effect
      setCurrentSkillType(skillType);
      setShowSkillEffect(true);
      
      // Hide skill effect after a short time
      setTimeout(() => {
        setShowSkillEffect(false);
      }, 500);
      
      // Update the skill's last used timestamp
      const updatedSkills = skills.map(skill => {
        if (skill.id === skillToUse.id) {
          return { ...skill, lastUsed: now };
        }
        return skill;
      });
      
      setSkills(updatedSkills);
      
      // If it's a class skill, update that too
      if (selectedClass) {
        const updatedClassSkills = selectedClass.skills.map(skill => {
          if (skill.id === skillToUse.id) {
            return { ...skill, lastUsed: now };
          }
          return skill;
        });
        
        setSelectedClass({
          ...selectedClass,
          skills: updatedClassSkills
        });
      }
    }
    
    // Apply automatic damage from stats (if any)
    totalDamage += stats.attack * 0.1;
    
    // Apply damage to enemy
    if (totalDamage > 0 && enemy) {
      const newHp = Math.max(0, enemy.hp - totalDamage);
      setEnemy({
        ...enemy,
        hp: newHp
      });
      
      // Check if enemy is defeated
      if (newHp === 0) {
        defeatEnemy();
      }
    }
  };

  // Handle enemy defeat
  const defeatEnemy = () => {
    if (!enemy) return;
    
    // Award experience and gold
    const expReward = enemy.experienceReward;
    const goldReward = Math.floor(enemy.level * 2 + Math.random() * enemy.level * 3);
    
    setExperience(experience + expReward);
    setGold(gold + goldReward);
    
    // Generate new enemy after a short delay
    setTimeout(() => {
      generateEnemy();
    }, 1000);
  };

  // Buy upgrade
  const buyUpgrade = (upgrade: Upgrade) => {
    if (gold >= upgrade.cost && !upgrade.purchased) {
      // Subtract gold
      setGold(gold - upgrade.cost);
      
      // Apply upgrade effect
      switch (upgrade.effect) {
        case "attack":
          setStats({
            ...stats,
            attack: stats.attack + (upgrade.id === 5 ? 5 : 2) // Special case for Poison Skin
          });
          break;
        case "clickPower":
          setStats({
            ...stats,
            clickPower: upgrade.id === 6 ? stats.clickPower * 2 : stats.clickPower + 1 // Special case for Master Clicker
          });
          break;
        case "autoClickStart":
          setAutoClicking(true);
          break;
        case "autoClickSpeed":
          setStats({
            ...stats,
            autoClickSpeed: stats.autoClickSpeed + 1
          });
          break;
      }
      
      // Mark as purchased
      const updatedUpgrades = upgrades.map(u => {
        if (u.id === upgrade.id) {
          return { ...u, purchased: true };
        }
        return u;
      });
      
      setUpgrades(updatedUpgrades);
    }
  };

  // Select a class
  const selectClass = (frogClass: FrogClass) => {
    setSelectedClass(frogClass);
    setShowClassSelection(false);
  };

  // Calculate cooldown percentage for UI
  const getCooldownPercent = (skill: Skill) => {
    const now = Date.now();
    const elapsed = now - skill.lastUsed;
    const cooldownTime = skill.cooldown * 1000;
    
    if (elapsed >= cooldownTime) return 100;
    return Math.floor((elapsed / cooldownTime) * 100);
  };

  // Get all available skills (basic + class skills if selected)
  const getAllSkills = () => {
    const basicSkills = skills.filter(skill => skill.isUnlocked);
    const classSkills = selectedClass ? selectedClass.skills : [];
    return [...basicSkills, ...classSkills];
  };

  // Render the game UI
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel text-center">
            {selectedClass ? `Level ${level} ${selectedClass.name}` : `Level ${level} Frog`} 
            <span className="ml-2">{selectedClass ? selectedClass.sprite : "🐸"}</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Gold: {gold} | Experience: {experience}/{experienceToNextLevel}
          </DialogDescription>
          <Progress value={(experience / experienceToNextLevel) * 100} className="w-full h-2 my-2" />
        </DialogHeader>
        
        <Tabs defaultValue="battle" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="battle" className="font-pixel">Battle</TabsTrigger>
            <TabsTrigger value="skills" className="font-pixel">Skills</TabsTrigger>
            <TabsTrigger value="shop" className="font-pixel">Shop</TabsTrigger>
          </TabsList>
          
          {/* Battle Tab */}
          <TabsContent value="battle" className="pt-4">
            {enemy && (
              <div className="flex flex-col items-center">
                <div className="text-xl font-pixel mb-2">{enemy.name}</div>
                <div className="text-5xl mb-4">{enemy.sprite}</div>
                <Progress value={(enemy.hp / enemy.maxHp) * 100} className="w-full h-4 mb-4" />
                <div className="font-pixel">HP: {enemy.hp}/{enemy.maxHp}</div>
                
                <FrogBattle 
                  enemyType={enemy.name.split(' ').pop() || 'Bug'}
                  frogClass={selectedClass?.name || null}
                  onAttack={handleClick}
                  showSkillEffect={showSkillEffect}
                  skillType={currentSkillType}
                  damage={stats.clickPower}
                />
                
                <Button 
                  onClick={handleClick} 
                  className="mt-8 w-40 h-20 text-xl font-pixel pokemon-button animate-pulse hover:animate-none"
                >
                  Click to Attack! (+{stats.clickPower})
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Skills Tab */}
          <TabsContent value="skills" className="pt-4">
            {showClassSelection ? (
              <div>
                <h3 className="text-xl font-pixel text-center mb-4">Choose Your Frog Class!</h3>
                <div className="grid grid-cols-2 gap-4">
                  {frogClasses.map(frogClass => (
                    <div 
                      key={frogClass.id}
                      className="border p-4 rounded-md cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => selectClass(frogClass)}
                    >
                      <div className="text-xl font-pixel flex items-center">
                        <div className="mr-2 transform scale-75">
                          {frogClass.name === "Ninja Frog" && <PixelNinjaFrog />}
                          {frogClass.name === "Mage Frog" && <PixelMageFrog />}
                          {frogClass.name === "Knight Frog" && <PixelKnightFrog />}
                          {frogClass.name === "Witch Frog" && <PixelWitchFrog />}
                        </div>
                        {frogClass.name}
                      </div>
                      <p className="text-sm mt-2">{frogClass.description}</p>
                      <p className="text-xs mt-2">Unlocks 5 new special skills!</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-pixel mb-4">Your Skills</h3>
                <div className="grid grid-cols-1 gap-2">
                  {getAllSkills().map(skill => (
                    <div key={skill.id} className="border p-2 rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-pixel">{skill.name}</div>
                          <div className="text-xs">{skill.description}</div>
                          <div className="text-xs">Damage: {skill.damage + stats.attack} | Cooldown: {skill.cooldown}s</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <Progress 
                            value={getCooldownPercent(skill)} 
                            className={`w-20 h-2 ${getCooldownPercent(skill) < 100 ? 'bg-red-200' : 'bg-green-200'}`} 
                          />
                          <div className="text-xs mt-1">
                            {getCooldownPercent(skill) < 100 ? 'Cooling down...' : 'Ready!'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {level < 10 && !selectedClass && (
                  <div className="mt-4 p-2 bg-yellow-100 rounded-md">
                    <p className="text-sm">Reach level 10 to choose a frog class and unlock special skills!</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Shop Tab */}
          <TabsContent value="shop" className="pt-4">
            <h3 className="text-xl font-pixel mb-2">Shop - Gold: {gold}</h3>
            <div className="grid grid-cols-1 gap-2">
              {upgrades.map(upgrade => (
                <div key={upgrade.id} className="border p-2 rounded-md flex justify-between items-center">
                  <div>
                    <div className="font-pixel">{upgrade.name}</div>
                    <div className="text-xs">{upgrade.description}</div>
                    <div className="text-xs text-yellow-600">Cost: {upgrade.cost} gold</div>
                  </div>
                  <Button
                    onClick={() => buyUpgrade(upgrade)}
                    disabled={upgrade.purchased || gold < upgrade.cost}
                    className="pokemon-button-green"
                  >
                    {upgrade.purchased ? "Purchased" : "Buy"}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <div className="w-full flex justify-between">
            <div className="text-xs text-gray-500">
              Auto-attack: {stats.attack * 0.1 > 0 ? `${stats.attack * 0.1} DPS` : "Not active"}
              {autoClicking && ` | Auto-click every ${5 / (stats.autoClickSpeed + 1)}s`}
            </div>
            <Button onClick={onClose} className="pokemon-button">Close Game</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}