import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Archetype } from '../model/archetype';
import { PitchingArchetype } from '../model/pitching-archetype';
import BattingArchetypes from '../../assets/BattingArchetypes.json';
import PitchingArtchetypes from '../../assets/PitchingArchetypes.json';
import { Velocity } from '../model/velocity';
import * as clipboard from "clipboard-polyfill";
import moment, { Moment } from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-player-calc',
  templateUrl: './player-calc.component.html',
  styleUrls: ['./player-calc.component.scss']
})
export class PlayerCalcComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  playerType = "Batter";
  battingArchetype = "";
  forumTemplateReady = false;
  selectedPitches = ['Pitch 1', 'Pitch 2', 'Pitch 3', 'Pitch 4', 'Pitch 5'];
  pitches = ['Fastball', 'Sinker', 'Cutter', 'Curveball', 'Slider', 'Changeup', 'Splitter', 'Forkball', 'Circle Change',
    'Screwball', 'Knuckle Curve'];
  positions = ['Relief Pitcher', 'Starting Pitcher', 'Catcher', 'First Baseman', 'Second Baseman', 'Third Baseman', 'Shortstop',
    'Left Fielder', 'Center Fielder', 'Right Fielder']; 
  public velocityValues = ['75 - 80',
    '80 - 83',
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
  pitchingArchetypes: PitchingArchetype[];
  selectedPitchingArchetype: PitchingArchetype;
  displayedColumns: string[] = ['name','value','min','slider','max','cost'];
  Username = '';
  PlayerName = ''; 
  Number = '';
  SelectedPosition = '';
  College = '';
  Birthdate: Moment;
  Throws = '';
  Recruited = '';
  Height = '';
  Weight = '';
  Birthplace = '';
  Discord = '';
  startDate = new Date(2012, 0, 1);
  Hitting: any;
  Bats: any;
  Selected2Position: any;
  Selected3Position: any;
  Selected4Position: any;
  Selected5Position: any;
  ArmSlot: any;
  panelOpenState: any;
  ThrowingHands = ["Right","Left"];
  BattingHands = ["Right","Left","Switch"];
  HittingTypes = ["Normal","Pull","Extreme Pull","Spray"];
  Positions = ["1B", "2B", "3B", "SS", "LF", "CF", "RF", "C"]
  playerTypes = ['Batter','Pitcher']
  formString = '[color=red][u][b]Player Information[/b][/u][/color]'; 
  ArmSlots = ["Normal (3/4)", "Submarine", "Sidearm", "Over the top"];
  skipCreationValidation = false;
  pageLink = "http://probaseballexperience.jcink.net/index.php?showtopic=11514";
  value = 'Clear me';

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {
    const temp = new Array<Archetype>();
    for (const entry of BattingArchetypes.Archetypes) {
      const archetype = new Archetype(entry.name, entry.attributes);
      temp.push(archetype);
    }
    this.hittingArchetypes = temp;
    this.selectedHittingArchetype = this.hittingArchetypes[0];

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

  createBatter() {
    this.formString = "[color=red][u][b]Player Information[/b][/u][/color]";
    if (this.PlayerName === '') {
      return alert('Please input the Player Name');
    }
    this.formString += '\n[b]Player Name:[/b] ' + this.PlayerName; 
    if (this.Number === '') {
      return alert('Please input the Number');
    }
    this.formString += '\n[b]Number:[/b] ' + this.Number;
    if (this.SelectedPosition.length === 0) {
      return alert('Please Select the Position');
    }
    this.formString += '\n[b]Position:[/b] ' + this.SelectedPosition;
    this.formString += '\n[b]College:[/b] ' + this.College;
    if (!this.Birthdate || !this.Birthdate.isValid()) {
      return alert('Please input the Birthdate of your player');
    }
    this.formString += '\n[b]Birthdate:[/b] ' + this.Birthdate.toDate().toDateString();
    if (!this.Throws) {
      return alert('Please select the Throwing Hand');
    }
    this.formString += '\n[b]Throws:[/b] ' + this.Throws;
    if (!this.Bats || this.Bats === '') {
      return alert('Please input the Batting Hand');
    }
    this.formString += '\n[b]Bats:[/b] ' + this.Bats;
    this.formString += '\n[b]Recruited by:[/b] ' + this.Recruited;
    if (this.Height === '') {
      return alert('Please input the Height');
    }
    this.formString += '\n[b]Height:[/b] ' + this.Height;
    if (this.Weight === '') {
      return alert('Please input the Weight');
    }
    this.formString += '\n[b]Weight:[/b] ' + this.Weight;
    this.formString += '\n[b]Birthplace:[/b] ' + this.Birthplace;
    this.formString += '\n[b]Discord name:[/b] ' + this.Discord;
    console.log(this.Hitting);
    if (!this.Hitting || this.Hitting === '') {
      return alert('Please input the Hitting Type');
    }
    this.formString += '\n[b]Hitting:[/b] ' + this.Hitting;
    this.formString += '\n\n[color=red][u][b]Attributes: [/b][/u][/color]';
    // if (this.selectedHittingArchetype.costSum() !== 100) {
    //   return alert('You have to spent exactly 100 starting TPE');
    // }
    this.formString += '\n[b]Hitting Archetype:[/b] ' + this.selectedHittingArchetype.name;
    for (const att of this.selectedHittingArchetype.attributes) {
      this.formString += '\n(MIN: ' + att.min + ') (MAX: ' + att.max + ') '
        + att.name + ' ' + att.value;
    }
    let uniquePositions = [];
    if (!this.SelectedPosition || this.SelectedPosition.length === 0) {
      return alert('Please input the Main Position');
    }
    this.formString += '\n1st Position (200/200 experience): ' + this.SelectedPosition;
    uniquePositions.push(this.SelectedPosition);
    if (!this.Selected2Position || this.Selected2Position.length === 0) {
      return alert('Please input the Secondary Position');
    }
    if (uniquePositions.includes(this.Selected2Position)){
      return alert(`You already selected ${this.Selected2Position}, please select another position.`);
    }
    uniquePositions.push(this.Selected2Position);
    this.formString += '\n2nd Position (150/200 experience): ' + this.Selected2Position;
    if (!this.Selected3Position || this.Selected3Position.length === 0) {
      return alert('Please input the Tertiary Position');
    }
    if (uniquePositions.includes(this.Selected3Position)){
      return alert(`You already selected ${this.Selected3Position}, please select another position.`);
    }
    uniquePositions.push(this.Selected3Position);
    this.formString += '\n3rd Position (100/200 experience): ' + this.Selected3Position;
    
    if (['Starting Pitcher', 'Relief Pitcher'].includes(this.SelectedPosition) || ['Starting Pitcher', 'Relief Pitcher'].includes(this.Selected2Position) || ['Starting Pitcher', 'Relief Pitcher'].includes(this.Selected3Position)) {
      return alert('You can\'t select either Relief Pitcher or Starting Pitcher as position for batter, please choose another');
    }
    
    this.forumTemplateReady = true;
  
    document.getElementById("formArea").focus();
  }
  
  createPitcher() { 
    this.formString = "[color=red][u][b]Player Information[/b][/u][/color]";
    if (this.PlayerName === '') {
      return alert('Please input the Player Name');
    }
    this.formString += '\n[b]Player Name:[/b] ' + this.PlayerName;
    if (this.Number === '') {
      return alert('Please input the Number');
    }
    this.formString += '\n[b]Number:[/b] ' + this.Number; 
    if (this.selectedPitchingArchetype.name.indexOf(" RP ") != -1) {
      this.formString += '\n[b]Position:[/b] RP';
    } else {
      this.formString += '\n[b]Position:[/b] SP';
    } 
    this.formString += '\n[b]College:[/b] ' + this.College;
    if (!this.Birthdate || !this.Birthdate.isValid()) {
      return alert('Please input the Birthdate of your player');
    }
    this.formString += '\n[b]Birthdate:[/b] ' + this.Birthdate.toDate().toDateString();
    if (this.Throws.length === 0) {
      return alert('Please select the Throwing Hand');
    }
    this.formString += '\n[b]Throws:[/b] ' + this.Throws;
    this.formString += '\n[b]Recruited by:[/b] ' + this.Recruited;
    if (this.Height === '') {
      return alert('Please input the Height');
    }
    this.formString += '\n[b]Height:[/b] ' + this.Height;
    if (this.Weight === '') {
      return alert('Please input the Weight');
    }
    this.formString += '\n[b]Weight:[/b] ' + this.Weight;
    this.formString += '\n[b]Birthplace:[/b] ' + this.Birthplace;
    this.formString += '\n[b]Discord name:[/b] ' + this.Discord;
    this.formString += '\n\n[color=red][u][b]Pitching Attributes: [/b][/u][/color]';
    // if (this.selectedPitchingArchetype.costSum() !== 100) {
    //   return alert('You have to spent exactly 100 of your initial TPE');
    // }
    this.formString += '\n[b]Player Archetype:[/b] ' + this.selectedPitchingArchetype.name;
    this.formString += '\n(MIN: ' + this.selectedPitchingArchetype.velocity.min + ') (MAX: ' +
      this.selectedPitchingArchetype.velocity.max + ') ' + this.selectedPitchingArchetype.velocity.name + ' ' +
      this.selectedPitchingArchetype.velocity.value;
    for (const att of this.selectedPitchingArchetype.attributes) {
      let attributeName = att.name;
      switch (att.name){
        case 'Pitch 1:':
          attributeName = this.selectedPitches[0]+":";
          break;
        case 'Pitch 2:':
          attributeName = this.selectedPitches[1]+":";
          break;
        case 'Pitch 3:':
          attributeName = this.selectedPitches[2]+":";
          break;
        case 'Pitch 4:':
          if(this.selectedPitches[3] != "") attributeName = this.selectedPitches[3]+":";
          break;
        case 'Pitch 5:':
          if(this.selectedPitches[4] != "") attributeName = this.selectedPitches[4]+":";
          break;
        default:
          break;
      }
      this.formString += '\n(MIN: ' + att.min + ') (MAX: ' + att.max + ') '
        + attributeName + ' ' + att.value;
    }
    if (!this.ArmSlot || this.ArmSlot.length === 0) {
      return alert('Please select your arm slot');
    }
    this.formString += '\nArm Slot: ' + this.ArmSlot;
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
    
    this.formString += '\n\nPitches: ' + this.selectedPitches[0] + ', ' + this.selectedPitches[1] + ', '
      + this.selectedPitches[2] + ', ' + (this.selectedPitches[3] !== 'Pitch 4' ? this.selectedPitches[3] + ', ' : ' ')
      + (this.selectedPitches[4] !== 'Pitch 5' ? this.selectedPitches[4] : ' ');
  
    // switch (this.selectedPitchingArchetype) {
    //   case this.pitchingArchetypes[0]: 
    //   case this.pitchingArchetypes[3]: 
    //   this.formString += '\n\nGroundball Percentage: 51%';
    //     break;
    //   case this.pitchingArchetypes[1]: 
    //   case this.pitchingArchetypes[5]: 
    //   case this.pitchingArchetypes[6]: 
    //   this.formString += '\n\nGroundball Percentage: 55%';
    //     break;
    //   case this.pitchingArchetypes[2]: 
    //   case this.pitchingArchetypes[4]: 
    //   this.formString += '\n\nGroundball Percentage: 59%';
    //     break;
    // }

    this.forumTemplateReady = true;
  
    document.getElementById("formArea").focus();
  
  }

  createBatterAttributes() {
 
    this.formString += '\n\n[color=red][u][b]Attributes: [/b][/u][/color]'; 
    this.formString += '\n[b]Hitting Archetype:[/b] ' + this.selectedHittingArchetype.name;
    for (const att of this.selectedHittingArchetype.attributes) {
      this.formString += '\n(MIN: ' + att.min + ') (MAX: ' + att.max + ') '
        + att.name + ' ' + att.value;
    } 
    this.formString += '\n1st Position (200/200 experience): ' + this.SelectedPosition;
    this.formString += '\n2nd Position (150/200 experience): ' + this.Selected2Position;
    this.formString += '\n3rd Position (100/200 experience): ' + this.Selected3Position;
  }

  createPitcherAttributes() {
    this.formString = '\n[b]Player Archetype:[/b] ' + this.selectedPitchingArchetype.name;
    this.formString += '\n(MIN: ' + this.selectedPitchingArchetype.velocity.min + ') (MAX: ' +
      this.selectedPitchingArchetype.velocity.max + ') ' + this.selectedPitchingArchetype.velocity.name + ' ' +
      this.selectedPitchingArchetype.velocity.value;
    for (const att of this.selectedPitchingArchetype.attributes) {
      let attributeName = att.name;
      switch (att.name){
        case 'Pitch 1:':
          attributeName = this.selectedPitches[0]+":";
          break;
        case 'Pitch 2:':
          attributeName = this.selectedPitches[1]+":";
          break;
        case 'Pitch 3:':
          attributeName = this.selectedPitches[2]+":";
          break;
        case 'Pitch 4:':
          if(this.selectedPitches[3] != "") attributeName = this.selectedPitches[3]+":";
          break;
        case 'Pitch 5:':
          if(this.selectedPitches[4] != "") attributeName = this.selectedPitches[4]+":";
          break;
        default:
          break;
      }
      this.formString += '\n(MIN: ' + att.min + ') (MAX: ' + att.max + ') '
        + attributeName + ' ' + att.value;
    }
    this.formString += '\nArm Slot: ' + this.ArmSlot;
    this.formString += '\n\nPitches: ' + this.selectedPitches[0] + ', ' + this.selectedPitches[1] + ', '
      + this.selectedPitches[2] + ', ' + (this.selectedPitches[3] !== 'Pitch 4' ? this.selectedPitches[3] + ', ' : ' ')
      + (this.selectedPitches[4] !== 'Pitch 5' ? this.selectedPitches[4] : ' ');
  }

  generateForm(){
    if(this.skipCreationValidation) {
      if(this.playerType == "Batter") this.createBatterAttributes();
      else if (this.playerType == "Pitcher") this.createPitcherAttributes();
    } else {
      if(this.playerType == "Batter") this.createBatter();
      else if (this.playerType == "Pitcher") this.createPitcher();
      else alert("Please select batter or pitcher first and fill in the fields")
    }
    
  }

  copyAndGoToForums() {
    clipboard.writeText(this.formString).then( _ => { 
      alert('New thread on forums will open up - template was copied into clipboard, paste it there and create the thread');
      window.open('http://probaseballexperience.jcink.net/index.php?act=Post&CODE=00&f=2');
    });
  }

  setMatchingHittingArchetype(archName: string){
    archName = archName.replace("The ","").split(" ")[0];
    for (let archetype of this.hittingArchetypes){
        if(archetype.name.indexOf(archName) != -1){
          this.selectedHittingArchetype = archetype;
          break;
        }
    }
  }

  setMatchingPitchingArchetype(archName: string, position: string){
    archName = archName.replace("The ","");
    if (!archName.endsWith("RP") && !archName.endsWith(" SP")){
      if(position == "Starting") archName = archName.concat(" SP");
      else if(position in ["Relief","Reliever","Closing","CL","Closer","CP"]) archName = archName.concat(" RP");
      else archName = archName.concat(position);
    }
    for (let archetype of this.pitchingArchetypes){
      if(archetype.name.indexOf(archName) != -1){
        this.selectedPitchingArchetype = archetype;
        break;
      }
    }
  }

  setArmSlot(armSlotString){
    if(armSlotString == "Normal") this.ArmSlot = "Normal (3/4)";
    else if (armSlotString == "Submarine") this.ArmSlot = armSlotString;
    else if (armSlotString == "Sidearm") this.ArmSlot = armSlotString;
    else if (armSlotString == "Over") this.ArmSlot = "Over the top";
  }

  importPlayer(){ 
    
    document.getElementById("spinner").hidden = false;
    const playerPage = this.http.get("http://pbesim.com:8080/"+this.pageLink, {responseType: 'text' }).subscribe({
      next: data => {
         const regexpBase: RegExp = new RegExp("^.*Archetype.*$", 'm'); 
         const playerString: String = regexpBase.exec(data)[0].replace(/<\/?[^>]+(>|$)/g, " ");
         if(this.playerType == "Batter"){
            this.setMatchingHittingArchetype(playerString.match("Archetype:(.+?)\\\(.+?\\\)")[1].trim());
            this.selectedHittingArchetype.attributes[0].value = Number.parseInt(playerString.match("BABIP vs\.{0,1} LHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[1].value = Number.parseInt(playerString.match("BABIP vs\.{0,1} RHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[2].value = Number.parseInt(playerString.match("Avoid K&#39;s vs\.{0,1} LHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[3].value = Number.parseInt(playerString.match("Avoid K&#39;s vs\.{0,1} RHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[4].value = Number.parseInt(playerString.match("Gap vs\.{0,1} LHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[5].value = Number.parseInt(playerString.match("Gap vs\.{0,1} RHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[6].value = Number.parseInt(playerString.match("Power vs\.{0,1} LHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[7].value = Number.parseInt(playerString.match("Power vs\.{0,1} RHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[8].value = Number.parseInt(playerString.match("Eye\/Patience vs\.{0,1} LHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[9].value = Number.parseInt(playerString.match("Eye\/Patience v\.{0,1} RHP.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[10].value = Number.parseInt(playerString.match("Speed \\\(Base &amp; Run\\\).{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[11].value = Number.parseInt(playerString.match("Stealing Ability.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[12].value = Number.parseInt(playerString.match("Bunting \\\(Both\\\).{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[13].value = Number.parseInt(playerString.match("Fielding Range.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[14].value = Number.parseInt(playerString.match("Fielding Error.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[15].value = Number.parseInt(playerString.match("Fielding\/Catching Arm.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[16].value = Number.parseInt(playerString.match("Turn Double Play.{1,3}?([0-9]+)")[1].trim());
            this.selectedHittingArchetype.attributes[17].value = Number.parseInt(playerString.match("Catcher Ability.{1,3}?([0-9]+)")[1].trim());
            this.Bats = playerString.match("Bats.{1,3}?([A-z]+)")[1];
            this.Hitting = playerString.match("Hitting.{1,3}?([A-z]+)")[1];
            const posToAcronym = {  "Right": "RF", "Left": "LF", "Center": "CF", "Shortstop": "SS", "First": "1B", "Second": "2B",
              "Third": "3B", "Catcher": "C"};
            const primaryPosition = playerString.match("1st Position \\\(200/200 experience\\\).{1,3}?([A-z0-9]+)")[1];
            if (this.Positions.includes(primaryPosition)) this.SelectedPosition = primaryPosition;
            else this.SelectedPosition = posToAcronym[primaryPosition];
            const secondaryPosition = playerString.match("2nd Position \\\(150/200 experience\\\).{1,3}?([A-z0-9]+)")[1];
            if (this.Positions.includes(secondaryPosition)) this.Selected2Position = secondaryPosition;
            else this.Selected2Position = posToAcronym[secondaryPosition];
            const tertiaryPosition = playerString.match("3rd Position \\\(100/200 experience\\\).{1,3}?([A-z0-9]+)")[1];
            if (this.Positions.includes(tertiaryPosition)) this.Selected3Position = tertiaryPosition;
            else this.Selected3Position = posToAcronym[tertiaryPosition];
         } else if(this.playerType == "Pitcher"){
          this.setMatchingPitchingArchetype(playerString.match("Archetype:(.+?)\\\(.+?\\\)")[1].trim(), playerString.match("Position.{1,3}?([A-z]+)")[1]);
          this.selectedPitchingArchetype.attributes[0].value = Number.parseInt(playerString.match("Movement vs\.{0,1} LHB.{1,3}?([0-9]+)")[1].trim());
          this.selectedPitchingArchetype.attributes[1].value = Number.parseInt(playerString.match("Movement vs\.{0,1} RHB.{1,3}?([0-9]+)")[1].trim());
          this.selectedPitchingArchetype.attributes[2].value = Number.parseInt(playerString.match("Control vs\.{0,1} LHB.{1,3}?([0-9]+)")[1].trim());
          this.selectedPitchingArchetype.attributes[3].value = Number.parseInt(playerString.match("Control vs\.{0,1} RHB.{1,3}?([0-9]+)")[1].trim());
          this.selectedPitchingArchetype.attributes[4].value = Number.parseInt(playerString.match("Stamina.{1,3}?([0-9]+)")[1].trim());
          this.selectedPitchingArchetype.attributes[5].value = Number.parseInt(playerString.match("Holding Runners.{1,3}?([0-9]+)")[1].trim());
          this.selectedPitchingArchetype.velocity.value = playerString.match(/Velocity:?.{1,2}?(.*?)(?=\s{2}|\()/)[1].trim();
          this.setArmSlot(playerString.match("Arm Slot.{1,3}?([A-z]+)")[1]);
          let pitches = playerString.match(/Pitches:?.{1,2}?(.*?)(?=\s{2}|Groundball|GB)/)[1].trim().split(",").map(_ => _.trim());
         this.selectedPitches[0] = pitches[0];
         this.selectedPitchingArchetype.attributes[6].value = Number.parseInt(playerString.match(pitches[0]+".{1,3}?([0-9]+)")[1].trim());
         this.selectedPitches[1] = pitches[1];
         this.selectedPitchingArchetype.attributes[7].value = Number.parseInt(playerString.match(pitches[1]+".{1,3}?([0-9]+)")[1].trim());
         this.selectedPitches[2] = pitches[2];
         this.selectedPitchingArchetype.attributes[8].value = Number.parseInt(playerString.match(pitches[2]+".{1,3}?([0-9]+)")[1].trim());
         if(pitches.length > 3 && pitches[3] in this.pitches){
          this.selectedPitches[3] = pitches[3];
          this.selectedPitchingArchetype.attributes[9].value = Number.parseInt(playerString.match(pitches[3]+".{1,3}?([0-9]+)")[1].trim());
          if(pitches.length > 4 && pitches[4] in this.pitches){
            this.selectedPitches[4] = pitches[4];
            this.selectedPitchingArchetype.attributes[10].value = Number.parseInt(playerString.match(pitches[4]+".{1,3}?([0-9]+)")[1].trim());
            }
          }
         } 
         this.PlayerName = playerString.match("Name.{1,3}?([A-z]+)")[1];
         this.Number = playerString.match("Number.{1,3}?([0-9]+)")[1];
         this.Throws = playerString.match("Throws.{1,3}?([A-z]+)")[1];
         this.Weight = playerString.match("Weight:.{1,3}?([0-9]+)")[1];
         this.Height = playerString.match("Height:.{1,3}?([^ ]+)")[1].replace(/&#39;/g,"'").replace(/&quot;/g,'"');
         const recruited = playerString.match("Recruited by.{1,3}?([A-z]+)");
         if(recruited && recruited.length > 1 ) this.Recruited = recruited[1];
         const birthplace = playerString.match(/Birthplace:?.{1,2}?(.*?)(?=\s{2})/);
         if(birthplace && birthplace.length > 1) this.Birthplace = birthplace[1];
         const discord = playerString.match("Discord name.{1,3}?([^ ]+)");
         if(discord && discord.length > 1) this.Discord = discord[1]; 
         document.getElementById("spinner").hidden = true;
      },
      error: error => {
          console.error('There was an error!', error);
          document.getElementById("spinner").hidden = true;
      }
  })
  }

}