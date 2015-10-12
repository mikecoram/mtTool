//populate note and key type drop down boxs
populateDropBox("inputRoot",note);
populateDropBox("inputType",keyTypes);

function pressInputSubmit() {
	var scaleNotes = shuffleNotes(inputRoot.value);
	var keyNotes = getScale(inputRoot.value,inputType.value);

	for(var i = 0; i < keyNotes.length; i++) {
		//display root notes
		document.getElementById("o"+(i+1)+"chordnote").innerHTML
		=keyNotes[i];

		//store relative chord at position from scale
		var cStore = inputType.value + "chord" + (i+1);
		var retChord = JSON.parse(localStorage.getItem(cStore));
		//display chord types
		document.getElementById("o"+(i+1)+"chordtype").innerHTML=
		retChord.chordType;
		//store chord type information
		var retType = JSON.parse(localStorage.getItem(inputType.value));

		//reset chord breakdown output
		document.getElementById("o"+(i+1)+"note").innerHTML="";
		document.getElementById("o"+(i+1)+"notedivi").innerHTML="";
		//display chord breakdown
		for(var j = 1; j <= retType.noteAmount; j++) {
			var nStore = retChord.chordType + "note" + j;
			var retNote = JSON.parse(localStorage.getItem(nStore));
			var outputNote=getNote(keyNotes[i],retNote.gapFromRoot);
			
			document.getElementById("o"+(i+1)+"notedivi").innerHTML+=
			retNote.division+"<br>";
			document.getElementById("o"+(i+1)+"note").innerHTML+=
			outputNote+"<br>";
		}

	}
}

function populateDropBox(elementName,dArray) {
	var dropBox = document.getElementById(elementName);
	for (var i = 0; i < dArray.length; i++) {
		var option = document.createElement("option");
		option.text = dArray[i];
		option.value = dArray[i];
		dropBox.add(option);
	}
}

function getNote(rootNote,gap) {
	var noteScale = shuffleNotes(rootNote);
	return noteScale[gap];
}

function getScale(keyRoot,keyType) {
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
	var shuffle = new Array(note.length);
	var startNote = 0;
	for (var i = 0; i < note.length; i++) {
		if(note[i] == keyRoot) {
			startNote = i;
			break;
		}
	}
	var j = startNote;
	for (var i = 0; i < note.length; i++) {
		if (j > 11) { j = 0;}
		shuffle[i] = note[j];
		j++;
	}
	return shuffle;
}