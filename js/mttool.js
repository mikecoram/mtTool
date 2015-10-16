//populate note and key type drop down boxs
populateDropBox("inputRoot",note);
populateDropBox("inputType",keyTypes);
const canvas = document.getElementById("scalePiano");
const context = canvas.getContext('2d');
var imageObj = new Image();
imageObj.src = "img/piano.png"

const circleRadius = 7;
const midC = 270;
const yoffset = 120;
const xoffset = 36;

const bxoffset = 18;
const byoffset = 70;

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
	var colorChord = getObject(inputType.value);
	return colorChord.typeColor;
}

function setElementColor(element, color) {
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

function getObject(objectName) {
	return JSON.parse(localStorage.getItem(objectName));
}

function getBasePos(keyNote) {
	var pos;
	switch (keyNote.charAt(0)) {
		case 'G': pos = -3; break;
		case 'A': pos = -2; break;
		case 'B': pos = -1; break;
		case 'C': pos = 0; break;
		case 'D': pos = 1; break;
		case 'E': pos = 2; break;
		case 'F': pos = 3; break;
	}
	return pos;
}

function getBasex(root) {
	if (root.length > 1) {
		return bxoffset;
	}
	else {
		return 0;
	}
}

function getSemiGap(dia,note) {
	var gap = 0;

	for (var i = 0; i < dia.length; i++) {
		if(note == dia[i]) {
			gap = i;
			break;
		}
	}

	return gap;
}

function getxDist(dia, gap) {
	var dist = 0;
	for(var i = 0; i < dia.length, i < gap;i++) {
		if (dia[i] == "B" || dia[i] == "E") {
			dist += xoffset;
		}
		else {
			dist += bxoffset;
		}
	}

	return dist;
}

function getyDist(note) {
	if (note.length > 1) {
		return byoffset;
	}
	else {
		return yoffset;
	}
}

function removeAccidentals(scale) {
	var newScale = new Array(7);
	var j = 0;

	for (var i = 0; i < scale.length; i++) {
		if (scale[i].length == 1) {
			newScale[j++] = scale[i];
		}
		else {
			newScale[j++] = scale[i].charAt(0);
		}
	}

	return newScale;
}

function getBxOffset(note) {
	switch (note) {
		case 'd':break;
	}
}

function drawNote(keyNote, x, y, base) {
	if (keyNote.length > 1) { //black note
			drawCircle(base+x, y, circleRadius, getKeyColor());
		}
	else {
			drawCircle(base+x, y, circleRadius, getKeyColor());
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

function resetCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(imageObj, 0, 0);
}

function resetChordInspector() {
	for (var i = 1; i <= 7; i++) {
		setElementContent("o"+(i)+"note", "", 0);
		setElementContent("o"+(i)+"notedivi", "", 0);
	}
}

function pressSubmit() {
	var diaNotes = shuffleNotes(inputRoot.value);
	var keyNotes = getScale(inputRoot.value,inputType.value);

	resetCanvas();
	resetChordInspector();

	setElementColor("scaleInspector",getKeyColor());
	setElementContent("output-title",inputRoot.value + " " + inputType.value,0);

	document.getElementById("output").style.display="inline";

	for(var i = 0; i < keyNotes.length; i++) {
		setElementContent("o"+(i+1)+"chordroot",keyNotes[i],0);
		setElementContent("o"+(i+1)+"root",keyNotes[i],0);

		var xdist = getxDist(diaNotes, getSemiGap(diaNotes,keyNotes[i]));
		var ydist = getyDist(keyNotes[i]);
		console.log(getSemiGap(diaNotes,keyNotes[i]));
		console.log(xdist);

		drawNote(keyNotes[i],xdist,ydist, 
			midC + getBasex(keyNotes[0]) + (getBasePos(keyNotes[0]) * xoffset));

		var retChord = JSON.parse(localStorage.getItem(inputType.value 
						+ "chord" + (i+1)));
		var retType = JSON.parse(localStorage.getItem(retChord.chordType));
		setElementContent("o"+(i+1)+"chordtype",retChord.chordType,0)
		setElementColor("o"+(i+1),retType.typeColor);

		for(var j = 1; j <= retType.noteAmount; j++) {
			var retNote = JSON.parse(localStorage.getItem(
				retChord.chordType + "note" + j));
			setElementContent("o"+(i+1)+"notedivi", retNote.division+"<br>", 1);
			setElementContent("o"+(i+1)+"note", getNote(
				keyNotes[i],retNote.gapFromRoot)+"<br>", 1);
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
		shuffle[i] = note[j++];
	}

	return shuffle;
}