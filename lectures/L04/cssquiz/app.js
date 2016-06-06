var util = {
	checkArrayEquality : function(arr1, arr2){
		if ( arr1.length != arr2.length ){ 
			return false; 
		}

		var equal = true;
		$.each(arr1, function(index, val){
			if(arr2[index] != val){
				equal = false;
			}
		});
		return equal;
	},

};

var app = {
	answers: [
		[5,6],
		[3,13],
		[2,7,13],
		[3,10,13],
		[10,11,12,15],
	],

	questions : [
		"td.student",
		"section article > p a",
		"li:only-child",
		"h2:empty",
		"footer li",
	],

	init: function(){
		this.currentIndex = 0;
		this.refreshQuestion();
		this.refreshAnswer();
	},

	checkAnswers: function(solution){
		var clicked = [];
		$.each(app.codeLines, function(index, val){
			if ( $(val).hasClass("selected") ){
				clicked.push(index + 1);
			}
		});
		return util.checkArrayEquality(clicked, solution);
	},

	transition: function(){
		if (app.currentIndex < app.questions.length - 1){
			app.currentIndex++;
			app.refreshQuestion();
			$(".currentAnswer").animate({left : "-10000px"}, {
				duration: 500,
				complete: function(){
					app.removeAnswer();
					$(".success").hide();
					app.addAnswer();
					app.refreshAnswer();
				},
			});
		} else {
			$("#quiz").fadeOut();
			$("#status").fadeOut(400, function(){
				$("#end").fadeIn();
			});
		}
	},

	addAnswer: function(){
		var $nextAnswer = $(".hidden pre:nth-child(1)");
		$(".answer").html($nextAnswer);
		$nextAnswer.addClass("currentAnswer");
	},

	removeAnswer: function(){
		$(".currentAnswer").remove();
		app.codeLines.unbind("click");
	},

	refreshAnswer: function(){
		prettyPrint();
		app.codeLines = $(".prettyprint li");
		app.codeLines.click(function(){
			$(this).toggleClass("selected");
			if ( app.checkAnswers(app.answers[app.currentIndex]) ) {
				$(".success").fadeIn("fast");
				window.setTimeout(app.transition, 1000);
			}
		});
	}, 

	refreshQuestion : function(){
		$(".question").text(app.questions[app.currentIndex]);
		$("#current-index").text(app.currentIndex + 1);
	}

}

var intro = {
	init: function(){
		$("#start-btn").click(function(){
			$("#intro").animate({
				left: "-5000px"
			}, {
				duration: 900,
				complete: function(){
					$(this).remove();
					$("#quiz").fadeIn();
					$("#status").fadeIn();
				},
			});
		});
	}
}

$(document).ready(function(){
	prettyPrint();
	app.init();
	intro.init();
});

