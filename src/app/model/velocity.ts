export class Velocity {
  readonly name: string;
  readonly min: string;
  readonly max: string;
  readonly listLimitMin: number;
  readonly listLimitMax: number;
  value: string;


  constructor(name: string, min: string, max: string) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.value = min;
    this.listLimitMin = Number(min.substring(0,2))-88;
    if (max==='100+'){
      this.listLimitMax = 13;
    } else{
      this.listLimitMax = Number(max.substring(0,2))-87;
    }
  }

  /*30 across the table*/
  private static veloValue(velo: String): number {
    switch (velo) {
      case '75 - 80':
        return 0;
        break;
      case '80 - 83':
        return 15;
        break;
      case '83 - 85':
        return 30;
        break;
      case '84 - 86':
        return 45;
        break;
      case '85 - 87':
        return 60;
        break;
      case '86 - 88':
        return 75;
        break;
      case '87 - 89':
        return 90;
        break;
      case '88 - 90':
        return 105;
        break;
      case '89 - 91':
        return 120;
        break;
      case '90 - 92':
        return 135;
        break;
      case '91 - 93':
        return 150;
        break;
      case '92 - 94':
        return 165;
        break;
      case '93 - 95':
        return 180;
        break;
      case '94 - 96':
        return 195;
        break;
      case '95 - 97':
        return 210;
        break;
      case '96 - 98':
        return 225;
        break;
      case '97 - 99':
        return 240;
        break;
      case '98 - 100':
        return 255;
        break;
      case '99 - 101':
        return 270;
        break;
      case '100+':
        return 285;
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
