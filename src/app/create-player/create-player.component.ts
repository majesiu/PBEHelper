import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Archetype } from '../model/archetype';
import { PitchingArchetype } from '../model/pitching-archetype';
import BattingArchetypes from '../../assets/BattingArchetypes.json';
import FieldingArtchetypes from '../../assets/FieldingArchetypes.json';
import PitchingArtchetypes from '../../assets/PitchingArchetypes.json';
import { Velocity } from '../model/velocity';
import * as clipboard from "clipboard-polyfill";

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  playerType = "";
  battingArchetype = "";

  
  selectedPitches = ['Pitch 1', 'Pitch 2', 'Pitch 3', 'Pitch 4', 'Pitch 5'];
  pitches = ['Fastball', 'Sinker', 'Cutter', 'Curveball', 'Slider', 'Changeup', 'Splitter', 'Forkball', 'Circle Change',
    'Screwball', 'Knuckle Curve'];
  positions = ['Relief Pitcher', 'Starting Pitcher', 'Catcher', 'First Baseman', 'Second Baseman', 'Third Baseman', 'Shortstop',
    'Left Fielder', 'Center Fielder', 'Right Fielder'];
  startDate = new Date(2007, 0, 1);
  public velocityValues = ['80 - 83',
    '83 - 85',
    '84 - 86',
    '85 - 87',
    '86 - 88',
    '87 - 89',
    '88 - 90',
    '89 - 91',
    '90 - 92',
    '91 - 93',
    '92 - 94',
    '93 - 95',
    '94 - 96',
    '95 - 97',
    '96 - 98',
    '97 - 99',
    '98 - 100',
    '99 - 101',
    '100'];

  earnedBatterTPE = 100;
  earnedPitcherTPE = 100;
  hittingArchetypes: Archetype[];
  selectedHittingArchetype: Archetype;
  fieldingArchetypes: Archetype[];
  selectedFieldingArchetype: Archetype;
  pitchingArchetypes: PitchingArchetype[];
  selectedPitchingArchetype: PitchingArchetype;
  displayedColumns: string[] = ['name','value','min','slider','max','cost'];
  Username = '';
  PlayerName = ''; 
  Number = '';
  SelectedPosition = '';
  College = '';
  Birthdate = '';
  Throws = '';
  Recruited = '';
  Height = '';
  Weight = '';
  Birthplace = '';
  Discord = '';
  Hitting: any;
  Bats: any;
  Selected2Position: any;
  Selected3Position: any;
  Selected4Position: any;
  Selected5Position: any;
  ArmSlot: any;
  ThrowingHands = ["Right","Left"];
  BattingHands = ["Right","Left","Switch"];
  HittingTypes = ["Normal","Pull","Extreme Pull","Spray"];
  Positions = ["1B", "2B", "3B", "SS", "LF", "CF", "RF"]

  constructor(private _formBuilder: FormBuilder) {
    const temp = new Array<Archetype>();
    for (const entry of BattingArchetypes.Archetypes) {
      const archetype = new Archetype(entry.name, entry.attributes);
      temp.push(archetype);
    }
    this.hittingArchetypes = temp;
    this.selectedHittingArchetype = this.hittingArchetypes[0];
    const temp2 = new Array<Archetype>();
    for (const entry of FieldingArtchetypes.Archetypes) {
      const archetype = new Archetype(entry.name, entry.attributes);
      temp2.push(archetype);
    }
    this.fieldingArchetypes = temp2;
    this.selectedFieldingArchetype = this.fieldingArchetypes[0];

    const temp3 = new Array<PitchingArchetype>();
    for (const entry of PitchingArtchetypes.Archetypes) {
      // @ts-ignore
      const archetype = new PitchingArchetype(entry.name, entry.attributes.slice(1),
        new Velocity(entry.attributes[0].name, entry.attributes[0].min.toString(), entry.attributes[0].max.toString()));
      temp3.push(archetype);
    }
    this.pitchingArchetypes = temp3;
    this.selectedPitchingArchetype = this.pitchingArchetypes[0];
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  transitionStep1(playerType: string){
    this.playerType = playerType;
    document.getElementById("step1button").click();
  }

  transitionStep2(subtype: string){
    if(this.playerType === "batter"){
      switch(subtype) {
        case 'speed':
          this.selectedHittingArchetype = this.hittingArchetypes[3];
          break; 
        case 'contact':
          this.selectedHittingArchetype = this.hittingArchetypes[2];
          break; 
        case 'balanced':
          this.selectedHittingArchetype = this.hittingArchetypes[1];
          break; 
        case 'power':
          this.selectedHittingArchetype = this.hittingArchetypes[0];
          break; 
      }
    } 
    document.getElementById("step2button").click();
  }

  transitionStep3(secondArch: string){
    if(this.playerType === "batter"){
      switch(secondArch) {
        case 'speedf':
          this.selectedFieldingArchetype = this.fieldingArchetypes[2];
          break; 
        case 'strongarm':
          this.selectedFieldingArchetype = this.fieldingArchetypes[0];
          break; 
        case 'balancedf':
          this.selectedFieldingArchetype = this.fieldingArchetypes[1];
          break; 
        case 'acatcher':
          this.selectedFieldingArchetype = this.fieldingArchetypes[4];
          break; 
        case 'rcatcher':
          this.selectedFieldingArchetype = this.fieldingArchetypes[3];
          break; 
        case 'utility':
          this.selectedFieldingArchetype = this.fieldingArchetypes[6];
          break; 
        case 'dh':
          this.selectedFieldingArchetype = this.fieldingArchetypes[5];
          break; 
      }
    } 
    this.battingArchetype = secondArch;
    document.getElementById("step3button").click();
  }

  createBatter() {
    let formString = '[color=red][u][b]Player Information[/b][/u][/color]'; 
    if (this.PlayerName === '') {
      return alert('Please input the First Name');
    }
    formString += '\n[b]Player Name:[/b] ' + this.PlayerName; 
    if (this.Number === '') {
      return alert('Please input the Number');
    }
    formString += '\n[b]Number:[/b] ' + this.Number;
    if (this.SelectedPosition.length === 0) {
      return alert('Please Select the Position');
    }
    formString += '\n[b]Position:[/b] ' + this.SelectedPosition;
    formString += '\n[b]College:[/b] ' + this.College;
    if (this.Birthdate === '') {
      return alert('Please input the Birthdate of your player');
    }
    formString += '\n[b]Birthdate:[/b] ' + this.Birthdate;
    if (!this.Throws) {
      return alert('Please select the Throwing Hand');
    }
    formString += '\n[b]Throws:[/b] ' + this.Throws;
    if (!this.Bats || this.Bats === '') {
      return alert('Please input the Batting Hand');
    }
    formString += '\n[b]Bats:[/b] ' + this.Bats;
    formString += '\n[b]Recruited by:[/b] ' + this.Recruited;
    if (this.Height === '') {
      return alert('Please input the Height');
    }
    formString += '\n[b]Height:[/b] ' + this.Height;
    if (this.Weight === '') {
      return alert('Please input the Weight');
    }
    formString += '\n[b]Weight:[/b] ' + this.Weight;
    formString += '\n[b]Birthplace:[/b] ' + this.Birthplace;
    formString += '\n[b]Discord name:[/b] ' + this.Discord;
    console.log(this.Hitting);
    if (!this.Hitting || this.Hitting === '') {
      return alert('Please input the Hitting Type');
    }
    formString += '\n[b]Hitting:[/b] ' + this.Hitting;
    formString += '\n\n[color=red][u][b]Hitting Attributes: [/b][/u][/color]';
    if (this.selectedFieldingArchetype !== this.fieldingArchetypes [5]) {
      if (this.selectedFieldingArchetype.costSum() !== 50 || this.selectedHittingArchetype.costSum() !== 50) {
        return alert('You have to spent exactly 50 TPE in each Hitting and Fielding');
      }
    } else if (this.selectedFieldingArchetype.costSum() !== 0 || this.selectedHittingArchetype.costSum() !== 100) {
      return alert('As DH You have to spent exactly 100 starting TPE in Hitting and none in Fielding');
    }
    formString += '\n[b]Hitting Archetype:[/b] ' + this.selectedHittingArchetype.name;
    for (const att of this.selectedHittingArchetype.attributes) {
      formString += '\n(MIN: ' + att.min + ') (MAX: ' + att.max + ') '
        + att.name + ' ' + att.value;
    }
    formString += '\n\n[color=blue][u][b]Fielding Attributes:[/b][/u][/color]';
    formString += '\n[b]Fielding Archetype:[/b] ' + this.selectedFieldingArchetype.name;
    for (const att of this.selectedFieldingArchetype.attributes) {
      formString += '\n(MIN: ' + att.min + ') (MAX: ' + att.max + ') '
        + att.name + ' ' + att.value;
    }
    let uniquePositions = [];
    if (!this.SelectedPosition || this.SelectedPosition.length === 0) {
      return alert('Please input the Main Position');
    }
    formString += '\n1st Position (200/200 experience): ' + this.SelectedPosition;
    uniquePositions.push(this.SelectedPosition);
    if (!this.Selected2Position || this.Selected2Position.length === 0) {
      return alert('Please input the Secondary Position');
    }
    if (uniquePositions.includes(this.Selected2Position)){
      return alert(`You already selected ${this.Selected2Position}, please select another position.`);
    }
    uniquePositions.push(this.Selected2Position);
    formString += '\n2nd Position (150/200 experience): ' + this.Selected2Position;
    if (!this.Selected3Position || this.Selected3Position.length === 0) {
      return alert('Please input the Tertiary Position');
    }
    if (uniquePositions.includes(this.Selected3Position)){
      return alert(`You already selected ${this.Selected3Position}, please select another position.`);
    }
    uniquePositions.push(this.Selected3Position);
    formString += '\n3rd Position (100/200 experience): ' + this.Selected3Position;
    
    if (['Starting Pitcher', 'Relief Pitcher'].includes(this.SelectedPosition) || ['Starting Pitcher', 'Relief Pitcher'].includes(this.Selected2Position) || ['Starting Pitcher', 'Relief Pitcher'].includes(this.Selected3Position)) {
      return alert('You can\'t select either Relief Pitcher or Starting Pitcher as position for batter, please choose another');
    }
    if (this.selectedFieldingArchetype === this.fieldingArchetypes[6]) {
      if (!this.Selected4Position || this.Selected4Position.length === 0) {
        return alert('Please input the 4th Position');
      }
      if (uniquePositions.includes(this.Selected4Position)){
        return alert(`You already selected ${this.Selected4Position}, please select another position.`);
      }
      uniquePositions.push(this.Selected4Position);
      formString += '\n4th Position (100/200 experience): ' + this.Selected4Position;
      if (!this.Selected5Position || this.Selected5Position.length === 0) {
        return alert('Please input the 5th Position');
      }
      if (['Starting Pitcher', 'Relief Pitcher'].includes(this.Selected4Position) || ['Starting Pitcher', 'Relief Pitcher'].includes(this.Selected5Position)) {
        return alert('You can\'t select either Relief Pitcher or Starting Pitcher as position for batter, please choose another');
      }
      if (uniquePositions.includes(this.Selected5Position)){
        return alert(`You already selected ${this.Selected5Position}, please select another position.`);
      }
      uniquePositions.push(this.Selected5Position);
      formString += '\n5th Position (100/200 experience): ' + this.Selected5Position;
    }
    
    clipboard.writeText(formString).then( _ => { 
      alert('New thread on forums will open up - template was copied into clipboard, paste it there and create the thread');
      window.open('http://probaseballexperience.jcink.net/index.php?act=Post&CODE=00&f=2');
    });
  
  }
  
  createPitcher() {
    let formString = '[color=red][u][b]Player Information[/b][/u][/color]'; 
    if (this.PlayerName === '') {
      return alert('Please input the Player Name');
    }
    formString += '\n[b]Player Name:[/b] ' + this.PlayerName;
    if (this.Number === '') {
      return alert('Please input the Number');
    }
    formString += '\n[b]Number:[/b] ' + this.Number;
    if (this.SelectedPosition.length === 0) {
      return alert('Please Select the Position');
    }
    if (!['Starting Pitcher', 'Relief Pitcher'].includes(this.SelectedPosition)) {
      return alert('You have to select either Relief Pitcher or Starting Pitcher as position for pitcher');
    }
    formString += '\n[b]Position:[/b] ' + this.SelectedPosition;
    formString += '\n[b]College:[/b] ' + this.College;
    if (this.Birthdate === '') {
      return alert('Please input the Birthdate of your player');
    }
    formString += '\n[b]Birthdate:[/b] ' + this.Birthdate;
    if (this.Throws.length === 0) {
      return alert('Please select the Throwing Hand');
    }
    formString += '\n[b]Throws:[/b] ' + this.Throws;
    formString += '\n[b]Recruited by:[/b] ' + this.Recruited;
    if (this.Height === '') {
      return alert('Please input the Height');
    }
    formString += '\n[b]Height:[/b] ' + this.Height;
    if (this.Weight === '') {
      return alert('Please input the Weight');
    }
    formString += '\n[b]Weight:[/b] ' + this.Weight;
    formString += '\n[b]Birthplace:[/b] ' + this.Birthplace;
    formString += '\n[b]Discord name:[/b] ' + this.Discord;
    formString += '\n\n[color=red][u][b]Pitching Attributes: [/b][/u][/color]';
    if (this.selectedPitchingArchetype.costSum() !== 100) {
      return alert('You have to spent exactly 100 of your initial TPE');
    }
    formString += '\n[b]Player Archetype:[/b] ' + this.selectedPitchingArchetype.name;
    formString += '\n(MIN: ' + this.selectedPitchingArchetype.velocity.min + ') (MAX: ' +
      this.selectedPitchingArchetype.velocity.max + ') ' + this.selectedPitchingArchetype.velocity.name + ' ' +
      this.selectedPitchingArchetype.velocity.value;
    for (const att of this.selectedPitchingArchetype.attributes) {
      formString += '\n(MIN: ' + att.min + ') (MAX: ' + att.max + ') '
        + att.name + ' ' + att.value;
    }
    if (!this.ArmSlot || this.ArmSlot.length === 0) {
      return alert('Please select your arm slot');
    }
    formString += '\nArm Slot: ' + this.ArmSlot;
    if (this.selectedPitches[0].startsWith('Pitch') || this.selectedPitches[1].startsWith('Pitch') ||
      this.selectedPitches[2].startsWith('Pitch') ) {
      return alert('Please select your 3 starting pitches');
    }
    let uniquePitches = [this.selectedPitches[0]];
    if (uniquePitches.includes(this.selectedPitches[1])){
      return alert(`You already selected ${this.selectedPitches[1]}, please select another pitch.`);
    }
    uniquePitches.push(this.selectedPitches[1]);
    if (uniquePitches.includes(this.selectedPitches[2])){
      return alert(`You already selected ${this.selectedPitches[2]}, please select another pitch.`);
    }
    uniquePitches.push(this.selectedPitches[2]);
    if (this.selectedPitches[3] !== 'Pitch 4' && uniquePitches.includes(this.selectedPitches[3])){
      return alert(`You already selected ${this.selectedPitches[3]}, please select another pitch.`);
    }
    uniquePitches.push(this.selectedPitches[3]);
    if (this.selectedPitches[4] !== 'Pitch 5' && uniquePitches.includes(this.selectedPitches[4])){
      return alert(`You already selected ${this.selectedPitches[4]}, please select another pitch.`);
    }
    if (uniquePitches.includes("Changeup") && uniquePitches.includes("Circle Change")){
      return alert(`Having two changeups is not allowed, please replace one with another pitch.`);
    }
    if (!uniquePitches.includes("Fastball") && !uniquePitches.includes("Sinker") && !uniquePitches.includes("Cutter")){
      return alert(`You are required to select Fastball type (fastball/cutter/sinker) pitch at creation with one of your starting pitches.`);
    }
    
    formString += '\n\nPitches: ' + this.selectedPitches[0] + ', ' + this.selectedPitches[1] + ', '
      + this.selectedPitches[2] + ', ' + (this.selectedPitches[3] !== 'Pitch 4' ? this.selectedPitches[3] + ', ' : ' ')
      + (this.selectedPitches[4] !== 'Pitch 5' ? this.selectedPitches[4] : ' ');
  
    clipboard.writeText(formString).then( _ => { 
      alert('New thread on forums will open up - template was copied into clipboard, paste it there and create the thread');
      window.open('http://probaseballexperience.jcink.net/index.php?act=Post&CODE=00&f=2');
    });
  
  }

}