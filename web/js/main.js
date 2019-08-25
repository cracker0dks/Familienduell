var fragen = null;
var intro = null;
var introVolume = 1;
var answerFail = null;
var schweinchenVolume = 1;
var answerFailVolume = 1;
var schweinchen = null;
// when the points for a round are assigned, we still want to show the other answers but no points should be calculated by that time
// reset when changing a question
var currentRoundPointsResolved = false;

$(document).ready(function() {
	$( "#fragenListe" ).sortable();

    $("#printQuestions").click(function() {
    	$("#printDiv").empty();
    	showQuestionsAsPrint();
    	$("#printScreen").show();
    	$("#allContent").hide();
    	window.print();
    	$("#printScreen").hide();
    	$("#allContent").show();
    });

    $("#blackScreenCheck").change(function() {
    	wsSend("toggleBlackScreen", "");
    });

    $("#modeFinal").change(function() {
    	var status = $('#modeFinal').is(':checked');
        wsSend("toggleFinalMode", status);
    });

    $(".playerTgl").change(function() {
        var player = $(this).val() == 1 ? false : true;
        wsSend("setPlayer2ForFinalMode", player);
    });

	$("#startAnswerFailBtn").click(function() {
    	wsSend("startAnswerFail", "");
    });
	
    $("#startAnswerDuplicateBtn").click(function() {
    	wsSend("startAnswerDuplicate", "");
    });

	$("#showTimerBtn").click(function() {
    	wsSend("showTimer", "");
    });
	
	$("#startTimerBtn").click(function() {
    	wsSend("startTimer", "");
    });
	
	$("#stopTimerBtn").click(function() {
    	wsSend("stopTimer", "");
    });
	
     $("#answerFailVolume").on("input", function() {
		var v = parseFloat($(this).val()) / 10;
		wsSend("setAnswerFailVolume", v);	
	});

    $("button[id^='startScheinchenbtn']").each(function(){
        $(this).click(function() {
            var status = $(this).attr('value');
            $("#pointMultiplicator").val(status)
            console.log('status' + status);
            wsSend("setRunde", status);
            $(this).attr("disabled", "disabled");
            wsSend("startSchweinchen", "");
        });
    });

    $("#stopScheinchenbtn").click(function() {
        $("button[id^='startScheinchenbtn']").each(function(){
            $(this).removeAttr("disabled");
        });
        wsSend("stopSchweinchen", "");
    });

     $("#schweinchenVolume").on("input", function() {
		var v = parseFloat($(this).val()) / 10;
		wsSend("setSchweinchenVolume", v);	
	});

	$("#addNewQuestionBtn").click(function() {
		addNewQuestion(null);
	});

	$("#openFragenEditorBtn").click(function() {
		$("#editQuestionsDiv").show();
	});

	$("#closeFragenEditorIcon").click(function() {
		$("#editQuestionsDiv").hide();
	});

	$("#saveNewQuestions").click(function() {
		saveQuestions();
		alert("Gespeichert!");
	});

	$("#upQicon").click(function() {
		var index = $("#questionsSelect>option:selected").index();
		index--;
		if (isFinalMode) {
			var questionSelected = $("#finalFragenSelect").val();
			questionSelected--;
			if (questionSelected < 0) {
				// $("#finalFragenSelect").val(0);
			} else {
				$("#finalFragenSelect").val(questionSelected)
			}
		} 

		if (index > 0) {
			setFrageIndex(index);
		}
	});

	$("#downQicon").click(function() {
		var index = $("#questionsSelect>option:selected").index();
		index++;
		if (isFinalMode) {
			var questionSelected = $("#finalFragenSelect").val();
			questionSelected++;
			if (questionSelected > 4) {
				// $("#finalFragenSelect").val(0);
			} else {
				$("#finalFragenSelect").val(questionSelected)
			}
		} 

		if (index < 8) {
			setFrageIndex(index);	
		}
	});

	$("#questionsSelect").on("change", function() {
		changeFrage();
	});

	$("#startIntroBtn").click(function() {
		$("#startIntroBtn").attr("disabled", "disabled");
		wsSend("showIntro", "");
	});

	$("#stopIntroBtn").click(function() {
		$("#startIntroBtn").removeAttr("disabled");
		wsSend("hideIntro", "");
	});

	$("#introVolume").on("input", function() {
		var v = parseFloat($(this).val()) / 10;
		wsSend("setIntroVolume", v);	
	});

	$("#pointsToTheLeft").click(function() {
		var points = parseFloat($(".pointsLeft").text()) + parseFloat($("#SumRes").text())*$("#pointMultiplicator").val();
		wsSend("setLeftPoints", points);
		$("#SumRes").text("0");
	});

	$("#pointsToTheRight").click(function() {
		var points = parseFloat($(".pointsRight").text()) + parseFloat($("#SumRes").text())*$("#pointMultiplicator").val();
		wsSend("setRightPoints", points);
		$("#SumRes").text("0");
		$("#pointsCenter").text("0");
	});

	$("#newLeftPoints").click(function() {
		wsSend("setLeftPoints", $("#mPunkteLeft").val());
	});

	$("#newRightPoints").click(function() {
		wsSend("setRightPoints", $("#mPunkteRight").val());
	});

	$("#newSumRes").click(function() {
		wsSend("setSumRes", $("#mPunkteSum").val());
	});

	$("#alternateAnswerBtn").click(function(){
		var is = $("#finalFragenSelect").val();
		var answer = $("#alternateAnswer").val();
		wsSend("setAnswer", is+"###"+answer);
	});

	$("#alternateAnswerPBtn").click(function(){
		var is = $("#finalFragenSelect").val();
		var p =  $("#altPointsFinal").val() > 0 ? $("#altPointsFinal").val() : 0;
		wsSend("setAnz", is+"###"+p);
	});

	$("#finalmodusInfoBtn").click(function(){
		alert("Im Finalmodus geklickte Antworten und Punkte werden nur auf dem Display angezeigt!")
	});
});

function setFinalMode(status){
	isFinalMode = status == "true" ? true : false;
	$(".finalElement").attr("disabled", !isFinalMode);
	var index = $("#questionsSelect>option:selected").index();
	index = index > 0 ? index : 0;
	$("#answers").empty();

	// automatically select first of the final questions (index 3)
	if (isFinalMode < 3) {
		index = 3;
	}

	loadQuestionToGui(index);

	// manually select option once final mode starts
	if (isFinalMode) {
		if (index >= 0 && index < $("#questionsSelect").find("option").length) {
			$("#questionsSelect").find("option").removeAttr("selected");
			$($("#questionsSelect").find("option")[index]).prop("selected", "true");
		}
		if ($("#questionsSelect>option:selected").index() == -1 && $("#questionsSelect").find("option")[0]) {
			$($("#questionsSelect").find("option")[0]).prop("selected", "true");
		}
	}
}

function setPlayer2(value){
	value = value == "true" ? true : false;
	player2 = value;
}

function setRunde(value){
	runde = value;
}

function showQuestionsAsPrint() {
	var ges = '<h2 style="margin-left:30px;">Familienduell Fragen</h2><ol>';
	for(var i=0;i<fragen.length;i++) {
		ges += '<li>'+fragen[i]["frage"]+'</li>';
	}
	ges +='</ol>';
	$("#printDiv").html(ges);
}

function setLeftPoints(newPoints) {
	$(".pointsLeft").text(newPoints);
	$("#mPunkteLeft").val(newPoints);
	$("#sumRes").text("0");
	$("#pointsCenter").text("0");
	if(sounds && (display || serverSound)) {
		audio = new Audio('./sounds/zahlRichtig.ogg');
		audio.play();
	}
}

function setRightPoints(newPoints) {
	$(".pointsRight").text(newPoints);
	$("#mPunkteRight").val(newPoints);
	$("#sumRes").text("0");
	$("#pointsCenter").text("0");
	if(sounds && (display || serverSound)) {
		audio = new Audio('./sounds/zahlRichtig.ogg');
		audio.play();
	}
}

function setSumRes(newSumRes) {
	$('#SumRes').text(newSumRes);
	$("#mPunkteSum").val(newSumRes);
	recalcSum(0);
}

function startAnswerFail() {
	if (sounds && (display || serverSound)) {
		answerFail = new Audio('./sounds/failOriginal.ogg');
		answerFail.volume = answerFailVolume;
		answerFail.play();
	}
}

function startAnswerDuplicate() {
	if (sounds && (display || serverSound)) {
		answerDuplicate = new Audio('./sounds/failFinal.ogg');
		answerDuplicate.volume = answerFailVolume;
		answerDuplicate.play();
	}
}

function showTimer() {
	if (display) {
		if (player2) {
			$("#timer").text("25");
		} else {
			$("#timer").text("20");
		}
		$("#timer").fadeIn();
	}
}

function startTimer() {
	if (display) {
		var timer = parseInt($("#timer").text());
		if ((timer == 20 && !player2) || (player2 && timer == 25)) {
			if (sounds && (display || serverSound)) {
				// window.document.timerTick = new Audio('./sounds/tick.ogg');
				// window.document.timerTick.volume = answerFailVolume;
				// window.document.timerTick.play();
			}
			window.document.timerId = setInterval(function() { startTimer(); }, 1000);
		}
		timer--;
		if (timer > 0) {
			$("#timer").text(timer);
		} else {
			clearInterval(window.document.timerId);
			// window.document.timerTick.pause();
			// window.document.timerTick.currentTime = 0;
			$("#timer").fadeOut();
			if (sounds && (display || serverSound)) {
				timerEnd = new Audio('./sounds/failOriginal.ogg');
				timerEnd.volume = answerFailVolume;
				timerEnd.play();
			}
		}
	}
}

function stopTimer() {
	if (display) {
		clearInterval(window.document.timerId);
		// window.document.timerTick.pause();
		// window.document.timerTick.currentTime = 0;
		$("#timer").fadeOut();
	}
}

function startSchweinchen() {
	if (runde == 2){
        $("#schweinchen2Img").show("blind", { direction: "left" }, 1500);
	} else if (runde == 3){
        $("#schweinchen3Img").show("blind", { direction: "left" }, 1500);
	} else {
		$("#schweinchen1Img").show("blind", { direction: "left" }, 1500);
	}

	$("#answers").hide();
	$("#displayQuestions").hide();
	$("#result").hide();
	$(".footer").hide();
	
	if(sounds && (display || serverSound)) {
		schweinchen = new Audio('./sounds/schweinchen.ogg');
		schweinchen.volume = schweinchenVolume;
		schweinchen.play();
	}
}

function stopSchweinchen() {
	var index = $("#questionsSelect>option:selected").index();
	$("#questionsSelect").val(index+1);
	changeFrage();

	$("#schweinchen3Img").stop(true, true).hide();
    $("#schweinchen1Img").stop(true, true).hide();
    $("#schweinchen2Img").stop(true, true).hide();
	$("#result").show();
	$(".footer").show("blind", { direction: "left" }, 1500);
	if(schweinchen) {
		schweinchen.pause();
	}
}

function hideIntro() {
	$(".noIntro").show();
	$(".intro").fadeOut();
	if(intro) {
		intro.pause();
	}
}

function showIntro() {
	$(".noIntro").hide();
	$(".intro").fadeIn();
	if(sounds && (display || serverSound)) {
		intro = new Audio('./sounds/intro.ogg');
		intro.volume = introVolume;
		intro.play();
	}
}

function fillFragenSelect() {
	$("#questionsSelect").empty();
	for(var i=0;i<fragen.length;i++) {
		$("#questionsSelect").append('<option value="'+i+'">'+fragen[i]["kuerzel"]+'</option>');
	}
}

function setFrageIndex(index) {
	if (index >= 0 && index < $("#questionsSelect").find("option").length) {
		$("#questionsSelect").find("option").removeAttr("selected");
		$($("#questionsSelect").find("option")[index]).prop("selected", "true");
	}
	if ($("#questionsSelect>option:selected").index() == -1 && $("#questionsSelect").find("option")[0]) {
		$($("#questionsSelect").find("option")[0]).prop("selected", "true");
	}
	changeFrage();
}

function changeFrage() {
	var index = $("#questionsSelect>option:selected").index();
	wsSend("loadQuestion", index);
	wsSend("clearAllFailsBtn", "");
	wsSend("resetPointsResolvedFlag", "false");
}

function loadQuestionToGui(index) {
	$("#schweinchen3Img").hide();
    $("#schweinchen1Img").hide();
    $("#schweinchen2Img").hide();
	$("#answers").empty();

	$(".pointsLeft").toggle(!isFinalMode);
	$(".pointsRight").toggle(!isFinalMode);
    $(".xmarker").toggle(!isFinalMode);
    $("#ResSum_player1").toggle(isFinalMode);
    $("#ResSum_player2").toggle(isFinalMode);
    if (isFinalMode){
		$("#resultFinal").show();
		$(".footer").hide();
	} else {
    	$("#resultFinal").hide();
	}
    $("#result").toggle(!isFinalMode);

	if(index > -1) {
        $("#displayQuestions").html(fragen[index]["frage"]);
		if (isFinalMode && display){
            $("#displayQuestions").hide();
		} else {
			$("#displayQuestions").show("blind", { direction: "left" }, 1500);
		}
		var anzahlFragen = fragen[index]["antworten"].length;
		if (isFinalMode) {
			anzahlFragen = 5;
		}
		for (var i = 0; i < anzahlFragen; i++) {
			if(isFinalMode || fragen[index]["antworten"][i]["antwort"] != "") {
                if (isFinalMode) {
				    var oneLine = $('<div>' +
                        '<div style="width: 44%; float: left; text-align: center" class="answer"></div>' +
                        '<div style="width: 6%; float: left; text-align: center" class="points"></div>' +
                        '<div style="width: 6%; float: left; text-align: center" class="points_player2"></div>' +
                        '<div style="width: 44%; float: left; text-align: center" class="answer_player2"></div>' +
                        '</div>');
                } else {
					var oneLine = $('<div>' +
                        '<div style="width: 5%; text-align: center; float: left;" class="nr">' + (i + 1) + '.</div>' +
                        '<div style="width: 89%; text-align: center; float: left" class="answer"></div>' +
                        '<div style="width: 6%; float: left; text-align: right" class="points"></div>' +
                        '</div>');
                }
	    		if(display && !player2) {
					oneLine.find(".answer").text("..............................................................................................................");
					oneLine.find(".points").text("--");
					
	    			if (isFinalMode){
	    				oneLine.find(".points_player2").text("--");
	    				oneLine.find(".answer_player2").text("..............................................................................................................");
	    				// oneLine.find(".answer_player2").text("_ _ _ _ _ _ _ _ _ _ _");
	    			}
	    		} else if (!display) {
	    			oneLine.find(".answer").html('<span class="markOnHover">'+getAnswerString(fragen[index]["antworten"][i]["antwort"])+'</span>');
	    			oneLine.find(".points").html('<span class="markOnHover">'+fragen[index]["antworten"][i]["anz"]+'</span>');
	    			(function() {
	    				var is = i;
	    				var is2 = i;
	    				var frage = fragen[index];
	    				oneLine.find(".answer").click(function() {
	    					if (isFinalMode){
		    					is = $("#finalFragenSelect").val();
		    				}
	    					wsSend("setAnswer", is+"###"+frage["antworten"][is2]["antwort"]);
	    				});
	    				oneLine.find(".points").click(function() {
	    					if (isFinalMode){
		    					is = $("#finalFragenSelect").val();
		    				}
	    					wsSend("setAnz", is+"###"+frage["antworten"][is2]["anz"]);
	    				});
	    			})();
	    		}
	    		$("#answers").append(oneLine);
	    	}
		}
	}
	if (!isFinalMode) {
		$("#SumRes").text("0");
		$("#answers").show("blind", { direction: "left" }, 1500);
    }
    if(!display)
    	$("#resultFinal").hide();

	if (isFinalMode){
        if (!player2) {
            $('#SumRes_player1').html("0");
            $('#SumRes_player2').html("0");
        }
	}
	if (!player2) {
        recalcSum(0);
    }
}

function setAnswer(index, answer) {
	if(!(isFinalMode && !display)) { //not do it at final mode and controller
	    var answer_select = ".answer";
	    if (player2){
	    	answer_select = '.answer_player2';
		}
		answer = getAnswerString(answer);
		var el = $($("#answers").find(answer_select)[index]);
		//el.empty();
		if(sounds && (display || serverSound)) {
			audio = new Audio('./sounds/textRichtig.ogg');
			audio.play();
		}
		el.typed({
	        strings: [answer],
	        typeSpeed: 10,
	        overwrite: true,
	        showCursor: false,
	        cursorChar: "",
	        fadeOut: false,
	        fadeOutDelay: 0,
	    });  		
	}
}

function setAnz(index, nr) {
	if(!(isFinalMode && !display)) { //not do it at final mode and controller
	    var points_select = ".points";
	    if (player2){
	    	points_select = '.points_player2';
		}
		var el = $($("#answers").find(points_select)[index]);
		el.text(nr);
		if(sounds && (display || serverSound)) {
			audio = new Audio('./sounds/zahlRichtig.ogg');
			audio.play();
		}
		recalcSum(nr);
	}
}

function recalcSum(s) {
	var sum_selector = '#SumRes';
	if (isFinalMode) {
		var p1p = 0;
		var p2p = 0;
		$.each($(".points"), function() {
			var v = $(this).text();
			if(v != "--") {
				p1p = p1p + parseFloat(v);
			}
		});
		$.each($(".points_player2"), function() {
			var v = $(this).text();
			if(v != "--") {
				p2p = p2p + parseFloat(v);
			}
		});
		$("#SumRes_player1").text(p1p);
		$("#SumRes_player2").text(p2p);
		if (display) {
			$("#pointsCenter").text(p1p + p2p);
		} else {
			$("#pointsCenter").text("");
		}
    } else {
    	$(sum_selector).text(parseFloat($(sum_selector).text())+parseFloat(s));
    	$("#pointsCenter").text(parseFloat($(sum_selector).text())*runde);
    }
}

// Add the scores from the final rounds to the current scores from previous rounds
function showFinalScores() {
	$("#answers").hide();
	$("#displayQuestions").hide();
	$("#result").hide();
	$("#resultFinal").hide();
	$("#pointsCenter").hide();
	$(".pointsLeft").show();
	$(".pointsRight").show();

	const leftFinalScore = parseFloat($("#SumRes_player1").text());
	const rightFinalScore = parseFloat($("#SumRes_player2").text());

	$(".pointsLeft").text(parseFloat($(".pointsLeft").text()) + leftFinalScore);
	$(".pointsRight").text(parseFloat($(".pointsRight").text()) + rightFinalScore);

	// show final scores with blinds
	$(".footer").show("blind", { direction: "left" }, 1500);
}

function getAnswerString(str) {
	if (isFinalMode){
		while(str.length < 24) {
			str = " " + str;
		}
	} else {
		str += " ";
		while(str.length < 47) {
			str += ".";
		}
	}
	return str;
}

function fillFragenEditor() {
	$("#fragenListe").empty();
	for(var i=0;i<fragen.length;i++) {
		addNewQuestion(fragen[i]);
	}
}

function loadQuestions() {
	wsSend("fileOp","read###fragen.txt");
}

function saveQuestions() {
	var objToSave = [];
	$.each($("#fragenListe").find("li"), function() {
		var oneQ = {
			"frage" : $(this).find(".questionIn").val(),
			"kuerzel" : $(this).find(".questionKIn").val(),
			"antworten" : []
		};
		$.each($(this).find(".antTr"),function() {
			oneQ["antworten"].push({
				"antwort" : $(this).find(".antwortInp").val(),
				"anz" : $(this).find(".anz").val()
			});
		});
		objToSave.push(oneQ);
	});
	var jsonQues = JSON.stringify(objToSave);
	jsonQues = btoa(encodeURIComponent(jsonQues));
	wsSend("fileOp","write###fragen.txt###"+jsonQues);
}

function addNewQuestion(frage) {
	var newQHtml = $('<li style="list-style-type: none; padding: 5px; border: 1px solid black; margin-right: 80px; position: relative;"><i style="cursor:pointer; position: absolute; right: 5px;" class="fa fa-trash-o trash"></i><table>'+
		'<tr>'+
			'<td>Frage:</td><td><input class="questionIn" type="text"></td>'+
		'</tr><tr>'+
			'<td>Kürzel:</td><td><input class="questionKIn" type="text"></td>'+
		'</tr>'+
	'</table></li>');
	for(var i=1;i<7;i++) {
		newQHtml.find("table").append('<tr class="antTr"><td>Antwort '+i+':</td><td><input class="antwortInp" type="text"><input class="anz" type="number" min="1" max="100"></td></tr>');
	}
	if(frage != null) {
		newQHtml.find(".questionIn").val(frage["frage"]);
		newQHtml.find(".questionKIn").val(frage["kuerzel"]);
		for(var i=0;i<frage["antworten"].length;i++) {
			$(newQHtml.find(".antwortInp")[i]).val(frage["antworten"][i]["antwort"]);
			$(newQHtml.find(".anz")[i]).val(frage["antworten"][i]["anz"]);
		}
	}
	newQHtml.find(".trash").click(function() {
		$(this).parent("li").remove();
	});
	$("#fragenListe").append(newQHtml);
}