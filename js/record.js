var mic, recorder;

var soundFile,
	soundFileDo1,
	soundFileRe,
	soundFileMi,
	soundFileFa,
	soundFileSol,
	soundFileLa,
	soundFileTi,
	soundFileDo2;

var notes = notesDo1 = notesRe = notesMi = notesFa = notesSol = notesLa = notesTi = notesDo2 = [];

var noteNow = 'do2';
var noteElem = $('#note');
var tonicElem = $('#tonic-note');
var recordingElem = $('.recording');

var state = 0;
var color = 'white';
var steps;
var sharpOrFlat = '';

function setup() {
	mic = new p5.AudioIn();
	mic.start();

	recorder = new p5.SoundRecorder();
	recorder.setInput(mic);

	soundFileDo1 = new p5.SoundFile();
	soundFileRe = new p5.SoundFile();
	soundFileMi = new p5.SoundFile();
	soundFileFa = new p5.SoundFile();
	soundFileSol = new p5.SoundFile();
	soundFileLa = new p5.SoundFile();
	soundFileTi = new p5.SoundFile();
	soundFileDo2 = new p5.SoundFile();

	soundFile = soundFileDo2;
	notes = notesDo2;
}

function keyPressed() {
	switch (keyCode){
		case 49:
			soundFile = soundFileDo1;
			notes = notesDo1;
			noteNow = 'do1';
			Reveal.slide( 1, 7, 0 );
			break;
		case 50:
			soundFile = soundFileRe;
			notes = notesRe;
			noteNow = 're';
			Reveal.slide( 1, 6, 0 );
			break;
		case 51:
			soundFile = soundFileMi;
			notes = notesMi;
			noteNow = 'mi';
			Reveal.slide( 1, 5, 0 );
			break;
		case 52:
			soundFile = soundFileFa;
			notes = notesFa;
			noteNow = 'fa';
			Reveal.slide( 1, 4, 0 );
			break;
		case 53:
			soundFile = soundFileSol;
			notes = notesSol;
			noteNow = 'sol';
			Reveal.slide( 1, 3, 0 );
			break;
		case 54:
			soundFile = soundFileLa;
			notes = notesLa;
			noteNow = 'la';
			Reveal.slide( 1, 2, 0 );
			break;
		case 55:
			soundFile = soundFileTi;
			notes = notesTi;
			noteNow = 'ti';
			Reveal.slide( 1, 1, 0 );
			break;
		case 56:
			soundFile = soundFileDo2;
			notes = notesDo2;
			noteNow = 'do2';
			Reveal.slide( 1, 0, 0 );
			break;
	}

	if (keyCode === 82) {
		if (state === 0 && mic.enabled) {
			recorder.record(soundFile);
			state++;
			console.log('recording')
			switch (noteNow) {
				case 'do1':
					notesDo1 = [];
					break;
				case 're':
					notesRe = [];
					break;
				case 'mi':
					notesMi = [];
					break;
				case 'fa':
					notesFa = [];
					break;
				case 'sol':
					notesSol = [];
					break;
				case 'la':
					notesLa = [];
					break;
				case 'ti':
					notesTi = [];
					break;
				case 'do2':
					notesDo2 = [];
					break;
			}
		} else if (state === 1) {
			recorder.stop();
			state = 0;
			console.log('recording stopped')
		}
	}

	if (keyCode === 80) {
		soundFile.play();
		console.log('playing')
	}
}

// Fix modulo behavior
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

function draw() {
	switch (noteNow) {
		case 'do1':
			steps = 0;
			break;
		case 're':
			steps = 10;
			break;
		case 'mi':
			steps = 8;
			break;
		case 'fa':
			steps = 7;
			break;
		case 'sol':
			steps = 5;
			break;
		case 'la':
			steps = 3;
			break;
		case 'ti':
			steps = 1;
			break;
		case 'do2':
			steps = 0;
			break;
		}

	if (noteStrings[mode(notes)] != undefined) {
		if (mode(notes) !== ((((mode(notesDo2) - steps) % 12) + 12) % 12)) {
			color = 'red';
			if (mode(notes) > ((((mode(notesDo2) - steps) % 12) + 12) % 12)) {
				sharpOrFlat = ' +';
			} else {
				sharpOrFlat = ' -';
			}
		} else { 
			sharpOrFlat = '';
			color = 'white'; 
		}

		noteElem.html(noteStrings[mode(notes)].concat(sharpOrFlat))
			.css({'color':color});
	} else {
		noteElem.html('');
	}

	tonicElem.html(noteStrings[mode(notesDo2)]);

	if (state === 0) {
		recordingElem.html('Press R to record. <em>When in doubt, go back to</em> do.');
	} else {
		recordingElem.html('Press R to stop recording.');
	}
}