//Data structures
//Notes, chords & keys
var note = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", 
				"E", "F", "F#/Gb", "G", "G#/Ab"];
var keyTypes = ["major", "minor"];
var chordTypes = ["major", "minor", "augmented", "diminished"];
//Relative chord and note details
function relChord(inputChordName, inputKeyName, inputDegree) {
	this.chordType = inputChordType;
	this.keyName = inputKeyName;
	this.degree = inputDegree;
}
function chordType(inputChordType,inputNoteAmount) {
	this.chordType = inputChordType;
	this.noteAmount = inputNoteAmount;
}
function relNote(inputChordType, inputGap, inputDivision) {
	this.chordType = inputChordType;
	this.gapFromRoot = inputGap;
	this.division = inputDivision;
}
//Storage functions
function storeChordType(name,amount) {
	var sType = new chordType(name,amount);
	localStorage.setItem(name, JSON.stringify(sType));
}
function storeNote(name,chord,gap,degree) {
	var sNote = new relNote(chord,gap,degree);
	localStorage.setItem(name, JSON.stringify(sNote));
}
function storeChord(name,type,key,degree) {
	var sChord = new relChord(type,key,degree);
	localStorage.setItem(name, JSON.stringify(sChord));
}

//major chord
storeChordType("major",3);
storeNote("majornote1","major",0,"I");
storeNote("majornote2","major",4,"III");
storeNote("majornote3","major",7,"V");
//minor chord
storeChordType("minor",3);
storeNote("minornote1","minor",0,"I");
storeNote("minornote2","minor",3,"IIIb");
storeNote("minornote3","minor",7,"V");
//diminished chord
storeChordType("diminished",3);
storeNote("diminishednote1","diminished",0,"I");
storeNote("diminishednote2","diminished",3,"IIIb");
storeNote("diminishednote3","diminished",6,"Vb");

//major key
storeChord("majorchord1","major","major",1);
storeChord("majorchord2","minor","major",1);
storeChord("majorchord3","minor","major",3);
storeChord("majorchord4","major","major",4);
storeChord("majorchord5","major","major",5);
storeChord("majorchord6","minor","major",6);
storeChord("majorchord7","diminished","major",7);
//minor key
storeChord("minorchord1","minor","minor",1);
storeChord("minorchord2","diminished","minor",2);
storeChord("minorchord3","major","minor",3);
storeChord("minorchord4","minor","minor",4);
storeChord("minorchord5","minor","minor",5);
storeChord("minorchord6","major","minor",6);
storeChord("minorchord7","major","minor",7);