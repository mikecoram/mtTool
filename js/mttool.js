const scaleCanvas = document.getElementById("scalePiano");
const scaleContext = scaleCanvas.getContext('2d');
const chordCanvas = document.getElementById("chordPiano");
const chordContext = chordCanvas.getContext('2d');
var imageObj = new Image();
imageObj.src = "img/piano.png"
const circleRadius = 7;
const midC = 270;
const yoffset = 120;
const xoffset = 36;
const bxoffset = 18;
const byoffset = 70;

populateDropBox("inputRoot",note);
populateDropBox("inputType",keyTypes);

function populateDropBox(elementName,dArray) {
	var dropBox = document.getElementById(elementName);
	for (var i = 0; i < dArray.length; i++) {
		var option = document.createElement("option");
		option.text = dArray[i];
		option.value = dArray[i];
		dropBox.add(option);
	}
}

function resetCanvas(context) {
	context.clearRect(0, 0, scaleCanvas.width, scaleCanvas.height);
	context.drawImage(imageObj, 0, 0);
}

function resetChordInspector() {
	removeElementsByClass("note");
	removeElementsByClass("note-divi");
}

function displayOutput() {
	document.getElementById("output").style.display="inline";
}

function getKeyColor() {
	var colorChord = getObject(inputType.value);
	return colorChord.typeColor;
}

function getObject(objectName) {
	return JSON.parse(localStorage.getItem(objectName));
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

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
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

function getxMod(root) {
	if (root.length > 1) {
		return bxoffset;
	}
	else {
		return 0;
	}
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

function drawNote(keyNote, x, y, base, context, color) {
	if (keyNote.length > 1) { //black note
			drawCircle(base+x, y, circleRadius, color, context);
		}
	else {
			drawCircle(base+x, y, circleRadius, color, context);
	}
}

function drawCircle(x, y, radius, color, context) {
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI,false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = "#000000";
	context.lineWidth = 2;
	context.stroke();
}

function pressSubmit() {
	var diaNotes = shuffleNotes(inputRoot.value);
	var keyNotes = getScale(inputRoot.value,inputType.value);
	resetCanvas(scaleContext);
	resetCanvas(chordContext);
	resetChordInspector();
	displayOutput();
	setElementContent("chord-title","Show a chord...",0);

	for(var i = 0; i < keyNotes.length; i++) {
		setElementContent("o"+(i+1)+"chordroot",keyNotes[i],0);

		var xdist = getxDist(diaNotes, getSemiGap(diaNotes,keyNotes[i]));
		var ydist = getyDist(keyNotes[i]);

		drawNote(keyNotes[i],xdist,ydist, midC + getxMod(keyNotes[0]) + 
			(getBasePos(keyNotes[0]) * xoffset), scaleContext, getKeyColor());

		var retChord = getObject(inputType.value + "chord" + (i+1));
		var retType = getObject(retChord.chordType);
		setElementContent("o"+(i+1)+"chordtype",retChord.chordType,0)
		setElementColor("o"+(i+1),retType.typeColor);

		printNotes(retType,keyNotes[i] ,i);
	}
}

function showChord(n) {
	var keyNotes = getScale(inputRoot.value,inputType.value);
	var diaNotes = shuffleNotes(keyNotes[n-1]);
	var retChord = getObject(inputType.value + "chord" + (n));
	var retType = getObject(retChord.chordType);
	var chordBase = getBasePos(keyNotes[n-1]);

	setElementContent("chord-title",keyNotes[n-1] + " " + retType.chordType
		+ " chord",0);

	resetCanvas(chordContext);
	for (var i = 0; i < retType.noteAmount; i++) {
		var retNote = getObject(retChord.chordType + "note" + (i+1));
		var note = diaNotes[retNote.gapFromRoot];
		var xdist = getxDist(diaNotes, getSemiGap(diaNotes, note));
		var ydist = getyDist(note);

		drawNote(note,xdist,ydist, midC + (chordBase * xoffset) + 
			getxMod(keyNotes[n-1]), chordContext, retType.typeColor);
	}
}

function printNotes(retType, note, i) {
	var noteCont = document.getElementById("o"+ (i+1) +"notes");
	for(var j = 1; j <= retType.noteAmount; j++) {
		var retNote = getObject(retType.chordType + "note" + j);
		var diviDiv = document.createElement('div');
		diviDiv.className = "note-divi";
		diviDiv.innerHTML = retNote.division;
		noteCont.appendChild(diviDiv);

		var noteDiv = document.createElement('div');
		noteDiv.className = "note";
		noteDiv.innerHTML = getNote(note,retNote.gapFromRoot);
		noteCont.appendChild(noteDiv);
		}
}

function getNote(rootNote,gap) {
	var noteScale = shuffleNotes(rootNote);
	return noteScale[gap];
}

function getScale(keyRoot,keyType) {
	var shuffled = shuffleNotes(keyRoot);
	var scale = new Array(7);
	var break1 = 0; 
	var break2 = 0;

	if(keyType == "major") {
		break1 = 2;
		break2 = 6;
	}
	else if (keyType == "minor") {
		break1 = 1;
		break2 = 4;
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
		if (j > 11) { 
			j = 0;
		}
		shuffle[i] = note[j++];
	}

	return shuffle;
}