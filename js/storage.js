//Data structures
var note = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", 
				"E", "F", "F#/Gb", "G", "G#/Ab"];
var pickType = ["major", "minor"];
var keyTypes = ["major", "minor"];
var chordTypes = ["major", "minor", "augmented", "diminished"];

function keyChord(inputTypeName, inputKeyName, inputDegree) {
	this.degree = inputDegree;
	this.typeName = inputTypeName;
	this.keyName= inputKeyName;
}
function noteType(inputTypeName, inputGap, inputDivision) {
	this.chordTypeName = inputTypeName;
	this.gapFromRoot = inputGap;
	this.division = inputDivision;
}

//Storage functions
function storeNote(name,chord,gap,degree) {
	var sNote = new noteType(chord,gap,degree);
	localStorage.setItem(name, JSON.stringify(sNote));
}
function storeChord(name,type,key,degree) {
	var sChord = new keyChord(type,key,degree);
	localStorage.setItem(name, JSON.stringify(sChord));
}


//major chord
storeNote("majornote1","major",0,"I");
storeNote("majornote2","major",4,"III");
storeNote("majornote3","major",7,"V");

//diminished chord
storeNote("diminishednote1","diminished",0,"I");
storeNote("diminishednote2","diminished",3,"IIIb");
storeNote("diminishednote3","diminished",6,"Vb");

//minor chord
storeNote("minornote1","minor",0,"I");
storeNote("minornote2","minor",3,"IIIb");
storeNote("minornote3","minor",7,"V");

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