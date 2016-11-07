var vid, playbtn, seekbar, probemarkerdsply, curtimetext, durtimetext;

var breakPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function InitilizeBrainitzVideoPlayer() {
    // Set object references
    vid = document.getElementById("BrainitzVideoPlayer");
    playbtn = document.getElementById("PlayPausebtn");
    seekbar = document.getElementById("SeekSlidercnt");
    instprob = document.getElementById("InsertProbebtn");
    probemarkerdsply = document.getElementById("ProbeMarkerDisplaytxt")
    curtimetext = document.getElementById("VideoPosition");
    durtimetext = document.getElementById("VideoLength");

    // Event Listeners
    playbtn.addEventListener("click", PlayPause, false);
    seekbar.addEventListener("change", VideoSeek, false);
    vid.addEventListener("timeupdate", VideoSeekTimeUpdate, false);
    instprob.addEventListener("click", InsertProbe, false);
}

window.onload = InitilizeBrainitzVideoPlayer;

function ProbeMarker_ButtonClick() {
    //var ctl = document.getElementById('ProbeMarkerDisplaytxt');
    var pos = probemarkerdsply.selectionStart;
    if (breakPoints[pos] != 0) {
        document.getElementById('BrainitzQuestionBox').style.visibility = 'visible';
    }
}

function GetTextCursorPosition() {
    //var ctl = document.getElementById('ProbeMarkerDisplaytxt');
    var pos = probemarkerdsply.selectionStart;
    alert(pos);
}

function ProbeMarker() {
    var sl = probemarkerdsply.value;
    var id = GetProbeMarkerIndex();
    //document.getElementById("ProbeIndex").text = id;
    curtimetext.text = vid.currentTime;
    // Will eventually need range checking here
    breakPoints[id] = vid.currentTime;
    var newsl = ReplaceCharacterAt(sl, id);
    probemarkerdsply.value = newsl;
    document.getElementById('BrainitzQuestionBox').style.visibility = 'visible';
}

function GetProbeMarkerIndex() {
    var ctindex = vid.currentTime / vid.duration;
    var retVal = Math.round(ctindex * 100);
    return retVal;
}

function ReplaceCharacterAt(str, id) {
    if (id > str.length - 1) return str;
    var chr = "█";  //"▲";
    var strArray = str.split("");
    strArray[id] = chr;
    var retstr = strArray.join("");
    return retstr;
}

function VideoSeek() {
    var seekto = vid.duration * (seekbar.value / 100);
    vid.currentTime = seekto;
}

function VideoSeekTimeUpdate() {
    var newtime = vid.currentTime * (100 / vid.duration);
    seekbar.value = newtime;
    curtimetext.text = vid.currentTime;
    durtimetext.text = vid.duration;
}

function InsertProbe() {
    ProbeMarker();
}

function PlayPause() {
    if (vid.paused) {
        vid.play();
        playbtn.innerHTML = "Pause";
    } else {
        vid.pause();
        playbtn.innerHTML = "Play";
    }
}

//////////////////////////////////////////////////////////////////////
// Begin Question Management Routines                               //
/////////////////////////////////////////////////////////////////////

var displaybox = document.getElementById("QuestionDisplayBox");
var cap = document.getElementById("QuestionCaption");

function QuestionCancel() {
    cap.innerHTML = "";
    displaybox.style.backgroundColor = 'lightgreen';
}

function Done_ClickEvent() {
    cap.innerHTML = "";
    displaybox.style.backgroundColor = 'lightgreen';
    document.getElementById('BrainitzQuestionBox').style.visibility = 'hidden';
}

function DisplayQuestionType(event) {
    var selval = event.target.value;
    switch (selval) {
        case "MC2":
            cap.innerHTML = "Multiple Choice (2)";
            displaybox.style.backgroundColor = 'pink';
            break;

        case "MC3":
            cap.innerHTML = "Multiple Choice (3)";
            displaybox.style.backgroundColor = 'pink';
            break;

        case "MC4":
            cap.innerHTML = "Multiple Choice (4)";
            displaybox.style.backgroundColor = 'pink';
            break;

        case "MC5":
            cap.innerHTML = "Multiple Choice (5)";
            displaybox.style.backgroundColor = 'pink';
            break;

        case "MC6":
            cap.innerHTML = "Multiple Choice (6)";
            displaybox.style.backgroundColor = 'pink';
            break;

        case "MC7":
            cap.innerHTML = "Multiple Choice (7)";
            displaybox.style.backgroundColor = 'pink';
            break;

        case "MC8":
            cap.innerHTML = "Multiple Choice (8)";
            displaybox.style.backgroundColor = 'pink';
            break;

        case "T-F":
            cap.innerHTML = "True False";
            displaybox.style.backgroundColor = 'lightblue';
            break;

        case "FiB":
            cap.innerHTML = "Fill in Blank";
            displaybox.style.backgroundColor = 'yellow';
            break;

        case "ShA":
            cap.innerHTML = "Short Answer";
            displaybox.style.backgroundColor = 'lightsteelblue';
            break;

        case "Inf":
            cap.innerHTML = "Information";
            displaybox.style.backgroundColor = 'bisque';
            break;

        default:
    }
}

//////////////////////////////////////////////////////////////////////
// Begin Lesson Data Management Routines                            //
/////////////////////////////////////////////////////////////////////
