export class Velocity {
  readonly name: string;
  readonly min: string;
  readonly max: string;
  value: string;


  constructor(name: string, min: string, max: string) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.value = min;
  }

  /*80 - 83 Cost for next level: 30 TPE
83 - 85 Cost for next level: 30 TPE
84 - 86 Cost for next level: 30 TPE
85 - 87 Cost for next level: 30 TPE
86 - 88 Cost for next level: 30 TPE
87 - 89 Cost for next level: 30 TPE
88 - 90 Cost for next level: 30 TPE
89 - 91 Cost for next level: 50 TPE->(40)
90 - 92 Cost for next level: 50 TPE->(40)
91 - 93 Cost for next level: 50 TPE->(40)
92 - 94 Cost for next level: 50 TPE->(40)
93 - 95 Cost for next level: 50 TPE->(40)
94 - 96 Cost for next level: 50 TPE->(40)
95 - 97 Cost for next level: 75 TPE->(50)
96 - 98 Cost for next level: 75 TPE->(50)
97 - 99 Cost for next level: 75 TPE->(50)
98 - 100 Cost for next level: 75 TPE->(50)
99 - 101 Cost for next level: 75 TPE->(50)
  100+ Max level*/
  private static veloValue(velo: String): number {
    switch (velo) {
      case '80 - 83':
        return 0;
        break;
      case '83 - 85':
        return 30;
        break;
      case '84 - 86':
        return 60;
        break;
      case '85 - 87':
        return 90;
        break;
      case '86 - 88':
        return 120;
        break;
      case '87 - 89':
        return 150;
        break;
      case '88 - 90':
        return 180;
        break;
      case '89 - 91':
        return 210;
        break;
      case '90 - 92':
        return 250;
        break;
      case '91 - 93':
        return 290;
        break;
      case '92 - 94':
        return 330;
        break;
      case '93 - 95':
        return 370;
        break;
      case '94 - 96':
        return 410;
        break;
      case '95 - 97':
        return 450;
        break;
      case '96 - 98':
        return 500;
        break;
      case '97 - 99':
        return 550;
        break;
      case '98 - 100':
        return 600;
        break;
      case '99 - 101':
        return 650;
        break;
      case '100':
        return 700;
        break;
    }
  }

  cost(): number {
    return Velocity.veloValue(this.value) - Velocity.veloValue(this.min);
  }
  baseCost(): number {
    return Velocity.veloValue(this.min);
  }
}
