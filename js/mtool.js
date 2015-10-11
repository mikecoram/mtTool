//populate root note drop down menu
var inputRoot = document.getElementById("inputRoot");
for (var i = 0; i < note.length; i++) {
	var rootOption = document.createElement("option");
	rootOption.text = note[i];
	rootOption.value = note[i];
	inputRoot.add(rootOption);
}

//populate key type drop down menu
var inputType = document.getElementById("inputType");
for (var i = 0; i < pickType.length; i++) {
	var typeOption = document.createElement("option");
	typeOption.text = pickType[i];
	typeOption.value = pickType[i];
	inputType.add(typeOption);
}

function pressInputSubmit() {
	//find matching key type
	for (var i = 0; i < keyTypes.length; i++) {
		if (inputType.value == keyTypes[i]) {
			keyFound = true;
		}
	}

	var noteDisplay = document.createElement("div");
	noteDisplay.class = "note";
	noteDisplay.id = "notedisplay";

	//find chords & notes
	if (keyFound == true) { 
		var scaleNotes = shuffleNotes(inputRoot.value);
		var keyNotes = getNotes(inputRoot.value,inputType.value);

		for(var i = 0; i < keyNotes.length; i++) {
			document.getElementById("o"+(i+1)+"notes").innerHTML="";

			//display root notes
			document.getElementById("o"+(i+1)+"chordnote").innerHTML
			=keyNotes[i];

			//display chord types
			var cStore = inputType.value + "chord" + (i+1);
			var retChord = JSON.parse(localStorage.getItem(cStore));
			document.getElementById("o"+(i+1)+"chordtype").innerHTML=
			retChord.typeName;

			//display chord notes
			for(var j = 1; j <= 3; j++) {
				var nStore = retChord.typeName + "note" + j;
				var retNote = JSON.parse(localStorage.getItem(nStore));
				var outputNote=getNote(keyNotes[i],retNote.gapFromRoot);

				document.getElementById("o"+(i+1)+"notes").innerHTML+=
				retNote.division+'\t'+outputNote+"<br></br>";
			}
		}
	}
}

function getNote(rootNote,gap) {
	var noteScale = shuffleNotes(rootNote);
	return noteScale[gap];
}

function getNotes(keyRoot,keyType) {
	var shuffled = shuffleNotes(keyRoot);
	var scale = new Array(7);
	var break1 = 0; var break2 = 0;

	if(keyType == "major") {
		break1 = 2; break2 = 6;
	}
	else if (keyType == "minor") {
		break1 = 1; break2 = 4;
	}

	var j = 0;
	for (var i = 0; i < scale.length; i++) {
		scale[i] = shuffled[j];
		if (i == break1 || i == break2) { j += 1; }
		else { j += 2; }
	}
	return scale;
}

function shuffleNotes(keyRoot) {
	//shuffle array
	var shuffle = new Array(note.length);
	var startNote = 0;

	//find start note in note array
	for (var i = 0; i < note.length; i++) {
		if(note[i] == keyRoot) {
			startNote = i;
			break;
		}
	}

	//fill shuffle array with all notes at new starting position
	var j = startNote;
	for (var i = 0; i < note.length; i++) {
		if (j > 11) { j = 0;}
		shuffle[i] = note[j];
		j++;
	}

	return shuffle;
}