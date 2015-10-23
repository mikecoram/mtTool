//Data structures
//Notes, chords & key selectors
var note = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 
				'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];
var keyTypes = ['major', 'minor'];
var chordTypes = ['major', 'minor', 'diminished', 'augmented'];
//Relative chord and note details
function relChord(inputChordType, inputKeyName, inputDegree) {
	this.chordType = inputChordType;
	this.keyName = inputKeyName;
	this.degree = inputDegree;
}
function relNote(inputChordType, inputGap, inputDivision) {
	this.chordType = inputChordType;
	this.gapFromRoot = inputGap;
	this.division = inputDivision;
}
function chordType(inputChordType,inputNoteAmount,inputColor) {
	this.chordType = inputChordType;
	this.noteAmount = inputNoteAmount;
	this.typeColor = inputColor;
}
//Storage functions
function storeChord(name,type,key,degree) {
	var sChord = new relChord(type,key,degree);
	localStorage.setItem(name, JSON.stringify(sChord));
}
function storeNote(name,chord,gap,degree) {
	var sNote = new relNote(chord,gap,degree);
	localStorage.setItem(name, JSON.stringify(sNote));
}
function storeChordType(name,amount,color) {
	var sType = new chordType(name,amount,color);
	localStorage.setItem(name, JSON.stringify(sType));
}
//chord storage
//major chord
var majcolor = '#FFFF9D'
storeChordType('major',3,majcolor);
storeNote('majornote1','major',0,'I');
storeNote('majornote2','major',4,'III');
storeNote('majornote3','major',7,'V');
//minor chord
var mincolor = '#BEEB9F'
storeChordType('minor',3,mincolor);
storeNote('minornote1','minor',0,'I');
storeNote('minornote2','minor',3,'IIIb');
storeNote('minornote3','minor',7,'V');
//augmented chord
var augcolor = 'red';
storeChordType('augmented',3,augcolor);
storeNote('augmentednote1','augmented',0,'I');
storeNote('augmentednote2','augmented',4,'III#');
storeNote('augmentednote3','augmented',8,'V#');
//diminished chord
var dimcolor = '#FF6138'
storeChordType('diminished',3,dimcolor);
storeNote('diminishednote1','diminished',0,'I');
storeNote('diminishednote2','diminished',3,'IIIb');
storeNote('diminishednote3','diminished',6,'Vb');
//key storage
//major key
storeChord('majorchord1','major','major',1);
storeChord('majorchord2','minor','major',1);
storeChord('majorchord3','minor','major',3);
storeChord('majorchord4','major','major',4);
storeChord('majorchord5','major','major',5);
storeChord('majorchord6','minor','major',6);
storeChord('majorchord7','diminished','major',7);
//minor key
storeChord('minorchord1','minor','minor',1);
storeChord('minorchord2','diminished','minor',2);
storeChord('minorchord3','major','minor',3);
storeChord('minorchord4','minor','minor',4);
storeChord('minorchord5','minor','minor',5);
storeChord('minorchord6','major','minor',6);
storeChord('minorchord7','major','minor',7);