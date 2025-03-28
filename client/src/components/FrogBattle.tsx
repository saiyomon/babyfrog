import React, { useState, useEffect, useRef } from 'react';
import styles from './FrogBattle.module.css';
import { 
  PixelFrog, PixelNinjaFrog, PixelMageFrog, PixelKnightFrog, PixelWitchFrog,
  PixelBug, PixelFly, PixelSpider, PixelDragonfly, PixelWasp, PixelBeetle,
  SkillEffect
} from './PixelSprites';

interface FrogBattleProps {
  enemyType: string;
  className?: string;
  frogClass?: string | null;
  onAttack: () => void;
  showSkillEffect?: boolean;
  skillType?: string;
  damage?: number;
}

export default function FrogBattle({ 
  enemyType, 
  className, 
  frogClass, 
  onAttack,
  showSkillEffect = false,
  skillType = 'normal',
  damage = 0
}: FrogBattleProps) {
  const [frogAnimation, setFrogAnimation] = useState<string>('');
  const [enemyAnimation, setEnemyAnimation] = useState<string>('');
  const [showDamageText, setShowDamageText] = useState<boolean>(false);
  const [skillEffect, setSkillEffect] = useState<boolean>(false);
  
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const damageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const skillTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle attack animation
  const handleAttack = () => {
    // Clear any existing timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (damageTimeoutRef.current) {
      clearTimeout(damageTimeoutRef.current);
    }
    
    // Set frog attack animation
    setFrogAnimation(styles.frogAttack);
    
    // After frog attack, enemy takes damage
    animationTimeoutRef.current = setTimeout(() => {
      setEnemyAnimation(styles.takeDamage);
      setShowDamageText(true);
      
      // Reset animations after a delay
      damageTimeoutRef.current = setTimeout(() => {
        setFrogAnimation('');
        setEnemyAnimation('');
        setShowDamageText(false);
      }, 500);
      
      // Call the parent attack handler
      onAttack();
    }, 300);
  };
  
  // Show skill effect when prop changes
  useEffect(() => {
    if (showSkillEffect) {
      setSkillEffect(true);
      
      if (skillTimeoutRef.current) {
        clearTimeout(skillTimeoutRef.current);
      }
      
      skillTimeoutRef.current = setTimeout(() => {
        setSkillEffect(false);
      }, 700); // Duration of skill animation
    }
  }, [showSkillEffect]);
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (damageTimeoutRef.current) {
        clearTimeout(damageTimeoutRef.current);
      }
      if (skillTimeoutRef.current) {
        clearTimeout(skillTimeoutRef.current);
      }
    };
  }, []);
  
  // Render the appropriate enemy sprite based on type
  const renderEnemySprite = () => {
    switch (enemyType.toLowerCase()) {
      case 'fly':
        return <PixelFly />;
      case 'spider':
        return <PixelSpider />;
      case 'dragonfly':
      case 'butterfly':
      case 'moth':
        return <PixelDragonfly />;
      case 'wasp':
      case 'hornet':
        return <PixelWasp />;
      case 'beetle':
        return <PixelBeetle />;
      case 'bug':
      default:
        return <PixelBug />;
    }
  };
  
  // Render the appropriate frog sprite based on class
  const renderFrogSprite = () => {
    if (!frogClass) return <PixelFrog />;
    
    switch (frogClass.toLowerCase()) {
      case 'ninja frog':
        return <PixelNinjaFrog />;
      case 'mage frog':
        return <PixelMageFrog />;
      case 'knight frog':
        return <PixelKnightFrog />;
      case 'witch frog':
        return <PixelWitchFrog />;
      default:
        return <PixelFrog />;
    }
  };
  
  // Get class-specific style
  const getFrogClassStyle = () => {
    if (!frogClass) return '';
    
    switch (frogClass.toLowerCase()) {
      case 'ninja frog':
        return styles.ninja;
      case 'mage frog':
        return styles.mage;
      case 'knight frog':
        return styles.knight;
      case 'witch frog':
        return styles.witch;
      default:
        return '';
    }
  };
  
  return (
    <div 
      className={`${styles.battleContainer} ${className || ''}`}
      onClick={handleAttack}
    >
      {/* Background elements */}
      <div className={styles.battleGround}></div>
      <div className={styles.enemyPlatform}></div>
      <div className={styles.frogPlatform}></div>
      
      {/* Enemy */}
      <div className={`${styles.enemyContainer} ${enemyAnimation}`}>
        {showDamageText && (
          <div className={styles.damageText}>-{damage}</div>
        )}
        <div className={styles.pixelSprite}>
          {renderEnemySprite()}
        </div>
      </div>
      
      {/* Frog character */}
      <div className={`${styles.frogContainer} ${frogAnimation} ${getFrogClassStyle()}`}>
        <div className={styles.pixelSprite}>
          {renderFrogSprite()}
        </div>
      </div>
      
      {/* Skill effect */}
      {skillEffect && (
        <div className={styles.skillEffect}>
          <SkillEffect type={skillType} />
        </div>
      )}
    </div>
  );
}