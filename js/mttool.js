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
var base;
var yoffset = 120;
var xoffset = 36;
var bxoffset = 18;
var smallbxoffset = 9;
var byoffset = -50;

function populateDropBox(elementName,dArray) {
	var dropBox = document.getElementById(elementName);
	for (var i = 0; i < dArray.length; i++) {
		var option = document.createElement("option");
		option.text = dArray[i];
		option.value = dArray[i];
		dropBox.add(option);
	}
}

function getKeyColor() {
	var colorChord = JSON.parse(localStorage.getItem(inputType.value));
	return colorChord.typeColor;
}
function colorElement(element, color) {
	document.getElementById(element).style.backgroundColor =
	color;
}
function setElementContent(element, content, mode) {
	if (mode == 0) { //overwrite
		document.getElementById(element).innerHTML = content;
	}
	else { //append
		document.getElementById(element).innerHTML += content;
	}
}

function getBasePos(keyNote) {
	var pos = -99;
	switch (keyNote.charAt(0)) {
		case 'G': pos = -3; break;
		case 'A': pos = -2; break;
		case 'B': pos = -1; break;
		case 'C': pos = 0; break;
		case 'D': pos = 1; break;
		case 'E': pos = 2; break;
		case 'F': pos = 3; break;
		default: pos = -9; break;
	}

	return pos;
}
function drawNotes(keyNote, pos, base) {
	if (keyNote.length > 1) { //black note
			drawCircle(base+(xoffset*pos)+bxoffset, yoffset+byoffset, circleRadius,
			getKeyColor());
		}
	else {
			drawCircle(base+(xoffset*pos), yoffset, circleRadius,
			getKeyColor());
	}
}
function drawCircle(x, y, radius, color) {
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI,false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = "#000000";
	context.lineWidth = 2;
	context.stroke();
}
function refreshCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(imageObj, 0, 0);
}

function pressSubmit() {
	refreshCanvas();

	var scaleNotes = shuffleNotes(inputRoot.value);
	var keyNotes = getScale(inputRoot.value,inputType.value);

	colorElement("scaleInspector",getKeyColor());

	document.getElementById("output-title").innerHTML = inputRoot.value + " " +
	inputType.value;

	//display output div
	document.getElementById("output").style.display="inline";

	for(var i = 0; i < keyNotes.length; i++) {
		//roots
		setElementContent("o"+(i+1)+"chordroot",keyNotes[i],0);
		setElementContent("o"+(i+1)+"root",keyNotes[i],0);
		var base = midC + (getBasePos(keyNotes[0]) * xoffset);
		drawNotes(keyNotes[i],i,base);

		//chords
		var cStore = inputType.value + "chord" + (i+1);
		var retChord = JSON.parse(localStorage.getItem(cStore));
		setElementContent("o"+(i+1)+"chordtype",retChord.chordType,0)
		//type
		var retType = JSON.parse(localStorage.getItem(retChord.chordType));
		colorElement("o"+(i+1),retType.typeColor);

		//reset chord breakdown output
		document.getElementById("o"+(i+1)+"note").innerHTML="";
		document.getElementById("o"+(i+1)+"notedivi").innerHTML="";
		//chord notes
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