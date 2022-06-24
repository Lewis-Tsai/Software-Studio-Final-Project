# 2022 Spring Software Studio Final Project
## Goal
Create an online web game.

## User Story
* Players will be a soldier who serves in the special force, driving helicopters to maintain peace of the world around the world.
* The helicopter opened by the player can destroy the enemy by firing bullets, missiles as well as bombs.
* At the same time, the enemy will also fire the player with bullets, anti-tank missiles, the enemy-owned tanks can attack the helicopter as well, and the player will be deducted after being hit.
* If the player's blood bars are zero, the mission fails. Conversely, if the player can kill all the soldiers and destroy all the vehicles before the blood bars return to zero, and defeat all enemies, the mission is successful.

## Controls
![](https://i.imgur.com/P1XpiMh.png)

## High risk analysis
**Basic**
* players can control the helicopter and let it fly in any direction.
* With smooth and skillful flying skills, the player will be able to prevent the helicopter from being hit by the enemy (passive defense).

**Shooting effect**
* Players can throw bombs(will be dropped vertically), shoot bullets and guild missiles to attack the enemies.

**Interacton** 
* enemies will attack the helicopter in any ways they can.

**Strategy**
* Similar to real life, the bombs and missiles a helicopter can carry is limited.
* Though they are powerful, try to use them wisely, instead of throwing them whenever you see enemies. Don’t forget you’re a special force soldier who is implementing stay-behind operations.
* A supplement base is provided, for the player to get weapon supply and increase HP.

## High value analysis
* Background : althoung it is an 2D game, but we want to make the background looks like 3D
* Enemies : As time passes, the enemies will be harder to beat and its attaking power will grow
* Variety : Besides the enimies on the ground, we let some enemies randomly exits on the sky, so the game will be more interesting
* Sounds : the sound of the helicopter may vary due to its speed or altitude

## Implementation Result
### Basic
| Feature | Description | 
| -------- | -------- | 
| Character movement/manipulation     | You can control the movement of characters and the launching and throwing of weapons through the keyboard and mouse     | 
| Cloud synchronization     | Record player scores and equipment upgrades through firebase     | 
| Animation     | Bullets fired, tanks blown up     | 
| Particle effects     | Helicopter blown up     | 
| Enemy-searching algorithm     | see  [appendix slide](##Links) for detail  | 

### Advanced
| Feature | Description | 
| -------- | -------- | 
| In-game store     | Equipment can be upgraded in the store through the experience drawn in the game     | 
| Game leaderboard     | Compete with other players' experience points on the leaderboard     | 
| Player Profile Page     | Display the player's win rate, account creation date, and related game information     |

## Project team members
* 蔡侑廷 Lewis Tsai
* 吳振群 Ken Wu
* 呂尚豪 Hower Lu
* 郭柏均 Gino Kuo

## Links
[Game link](https://software-studio-final-pr-cb8dd.web.app/)
[Slide of technical detail in the game implementation](https://docs.google.com/presentation/d/1AuD8WxYeNrQEyAemIyQW1CipYhMemDyLrYU0JyUJIoQ/edit?usp=sharing)
