export class Attribute {
  readonly name: string;
  readonly min: number;
  readonly max: number;
  value: number;


  constructor(name: string, min: number, max: number, archetype: string) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.value = ['Pitch 4:', 'Pitch 5:'].includes(this.name) ? 0 : this.min;
    
  }

  /* 1-40: 1 TPE Per Point
    40-50: 2 TPE Per Point
    50-60: 3 TPE Per Point
    60-70: 4 TPE Per Point
    70-80: 6 TPE Per Point
    80-90: 7 TPE Per Point
   90-115: 8 TPE Per Point*/
  cost(archetype: string): number {
    if (this.name == 'GB%:') {
      return (this.value-this.min)*25;
    } else {
      if (this.value === 0) { return 0; }
      const minCost = this.min <= 40 ? this.min : this.min <= 50 ? 40 + 2 * (this.min - 40) : this.min <= 60 ? 60 + 3 * (this.min - 50) :
                    this.min <= 70 ? 90 + 4 * (this.min - 60) : this.min <= 80 ? 130 + 6 * (this.min - 70) : this.min <= 90 ?
                    190 + 7 * (this.min - 80) : 260 + 8 * (this.min - 90);
      const valueCost = this.value <= 40 ? this.value : this.value <= 50 ? 40 + 2 * (this.value - 40) : this.value <= 60 ? 60 + 3 *
                      (this.value - 50) : this.value <= 70 ? 90 + 4 * (this.value - 60) : this.value <= 80 ? 130 + 6 *
                      (this.value - 70) : this.value <= 90 ? 190 + 7 * (this.value - 80) : 260 + 8 * (this.value - 90);
      
      return valueCost - minCost + (['Pitch 4:', 'Pitch 5:'].includes(this.name) ? 50 : 0);
    }
  }

  baseCost(archetype: string): number {
    const minCost = this.min <= 40 ? this.min : this.min <= 50 ? 40 + 2 * (this.min - 40) : this.min <= 60 ? 60 + 3 * (this.min - 50) :
      this.min <= 70 ? 90 + 4 * (this.min - 60) : this.min <= 80 ? 130 + 6 * (this.min - 70) : this.min <= 90 ?
        190 + 7 * (this.min - 80) : 260 + 8 * (this.min - 90);
    return ['Pitch 4:', 'Pitch 5:', 'Bunting (Both):'].includes(this.name) ? 0 : minCost;
    
  }

  tooltip(): string {
    switch (this.name) {
      case 'Movement vs. LHB:': return 'Reduces Home Runs surrendered vs Left Handed Batters';
      case 'Movement vs. RHB:': return 'Reduces Home Runs surrendered vs Right Handed Batters';
      case 'Control vs. LHB:': return 'Reduces Walks surrendered vs Left Handed Batters';
      case 'Control vs. RHB:': return 'Reduces Walks surrendered vs Right Handed Batters';
      case 'Stamina:': return 'Increases amount of pitches pitcher can throw in his appearance. Better to focus later on in players career';
      case 'Holding Runners:': return 'Stops opposing players from attempting to steal a base';
      case 'Pitch 1:': return 'Choose unique pitch, different pitches are best for different artchetypes. ' +
        'Power should focus on high velocity stuff like fastball, finesse on slower pitches like curveball, changeup';
      case 'Pitch 2:': return 'Choose unique pitch, different pitches are best for different artchetypes. ' +
        'Power should focus on high velocity stuff like fastball, finesse on slower pitches like curveball, changeup';
      case 'Pitch 3:': return 'Choose unique pitch, different pitches are best for different artchetypes. ' +
        'Power should focus on high velocity stuff like fastball, finesse on slower pitches like curveball, changeup';
      case 'Pitch 4:': return 'Choose if you decided to buy 4th pitch by selecting its rating';
      case 'Pitch 5:': return 'Choose if you decided to buy 5th pitch by selecting its rating';
      case 'Velocity:': return 'Affects Stuff rating, that dictates how often pitcher strikes out opponents. Works better with pitches' +
        'relying on velocity like Fastball, Sinker, Cutter.';
      case 'BABIP vs LHP': return 'Main attribute dictating contact rate - which is ' +
        'responsible for chance of a hit vs Left Handed Pitchers';
      case 'BABIP vs RHP': return 'Main attribute dictating contact rate - which is ' +
        'responsible for chance of a hit vs Right Handed Pitchers';
      case 'Avoid K\'s vs LHP': return 'Reduces amount of strikeouts vs Left Handed Pitchers, affects also contact rating vs LHP';
      case 'Avoid K\'s vs RHP': return 'Reduces amount of strikeouts vs Right Handed Pitchers, affects also contact rating vs RHP';
      case 'Gap vs LHP': return 'Improves amount of gap hits that result in extra base hits ' +
        '(either doubles or triples) vs Left Handed Pitchers';
      case 'Gap vs RHP': return 'Improves amount of gap hits that result in extra base hits ' +
        '(either doubles or triples) vs Right Handed Pitchers';
      case 'Power vs LHP': return 'Increases chance for a Home Run vs Left Handed Pitching, affects also contact rating vs LHP';
      case 'Power vs RHP': return 'Increases chance for a Home Run vs Right Handed Pitching, affects also contact rating vs RHP';
      case 'Eye/Patience vs LHP': return 'The better rating the bigger chance to draw a walk against Left Handed Pitchers';
      case 'Eye/Patience vs RHP': return 'The better rating the bigger chance to draw a walk against Right Handed Pitchers';
      case 'Speed (Base & Run)': return 'Increases player baserunning instincts and speed that affects only offensive tendencies: ' +
        'to steal and to turn doubles into triples';
      case 'Stealing Ability': return 'The higher the stealing ability the more efficient player is in stealing bases';
      case 'Bunting': return 'Responsible for player bunting skills - both bunting for hit and sacrifice bunting. Not recommended.';
      case 'Fielding Range': return 'Measures how well a defensive player can reach a ball in play. Crucial rating for most positions.';
      case 'Fielding Error': return 'The better the rating the lower the chance to commit fielding error';
      case 'Fielding/Catching Arm': return 'Is a measure of the strength of a player\'s arm. ' +
        'Players with higher Arm ratings are more likely to throw out runners on a close play.';
      case 'Turn Double Play': return 'Defines how well infielders, pitchers, and catchers can turn infield double plays. Affects only ' +
        'turning the play from 2B (or rarely from 3B/1B), not the throw initiating the double play.';
      case 'Catcher Ability': return 'Catcher Ability is a measure of a catcher\'s overall catching skill. ' +
        'It affects the framing (increasing pitchers K/9 and BB/9), limits errors and passed balls.';
      case 'GB%:': return 'Increases frequency of batted balls against to be groundballs instead of flyballs. Costs 25 TPE to upgrade for 1%.';
      case 'pBABIP:': return 'Decreases frequency of batted balls against to be hits.';
      default: return '';
    }
  }
}
