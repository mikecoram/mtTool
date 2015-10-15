//populate note and key type drop down boxs
populateDropBox("inputRoot",note);
populateDropBox("inputType",keyTypes);

//draw piano
var canvas = document.getElementById("scalePiano");
var context = canvas.getContext('2d');

var imageObj = new Image();
imageObj.src = "img/piano.png"

var circleRadius = 7;
var midC = 270;

var yoffset = 120;
var xoffset = 36;

var bxoffset = 26;
var byoffset = -50;

imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
};

function populateDropBox(elementName,dArray) {
	var dropBox = document.getElementById(elementName);
	for (var i = 0; i < dArray.length; i++) {
		var option = document.createElement("option");
		option.text = dArray[i];
		option.value = dArray[i];
		dropBox.add(option);
	}
}

function drawCircle(pos,xmod,ymod,color) {
	context.beginPath();
	context.arc(midC+xmod+((xoffset*pos)),yoffset+ymod, circleRadius, 0,
				 2 * Math.PI,false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = "#000000";
	context.lineWidth = 2;
	context.stroke();
}

function pressSubmit() {
	var scaleNotes = shuffleNotes(inputRoot.value);
	var keyNotes = getScale(inputRoot.value,inputType.value);

	//display output div
	document.getElementById("output").style.display="inline";

	var colorChord = JSON.parse(localStorage.getItem(inputType.value));
	document.getElementById("scaleInspector").style.backgroundColor =
	colorChord.typeColor;
	document.getElementById("output-title").innerHTML = inputRoot.value + " " +
	inputType.value;

	for(var i = 0; i < keyNotes.length; i++) {
		//display root notes
		document.getElementById("o"+(i+1)+"chordroot").innerHTML
		=keyNotes[i];
		document.getElementById("o"+(i+1)+"root").innerHTML
		=keyNotes[i];

		if (keyNotes[i].length > 1) {
			drawCircle(i, bxoffset, byoffset, colorChord.typeColor);
		}
		else {
			drawCircle(i, 0, 0, colorChord.typeColor);
		}

		//store relative chord at position from scale
		var cStore = inputType.value + "chord" + (i+1);
		var retChord = JSON.parse(localStorage.getItem(cStore));
		//display chord types
		document.getElementById("o"+(i+1)+"chordtype").innerHTML=
		retChord.chordType;
		//store chord type information
		var retType = JSON.parse(localStorage.getItem(retChord.chordType));

		document.getElementById("o"+(i+1)).style.backgroundColor = 
		retType.typeColor;

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