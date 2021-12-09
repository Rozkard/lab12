$(document).ready(function(){
	var wordList = [
	["hello", "they", "word", "hot", "time"],
	[" ironic", "futuristic", "imagine", "antic", "religion",],
	[" literally", "produce", "deceit", "acknowledgement", "diverse",]
	];
	var translationList = [
	["привіт", "вони", "слово", "гарячий", "час"],
	["іронічний", "футуристичний", "уяви", "античний", "релігія"],
	["буквально", "виробляти", "обман", "визнання", "різноманітний"]
	];
	var userTranslation = [[],[],[]];
	var wordOrder = [[],[],[]];
	var currentWord = 0;
	var currentLevel =0;
	let wordAmount = wordList[0].length;
	let amountOfLevels =3
	$('#level1').prop('checked',true);
	var rightAnswer = 0;
	var falseAnswer = 0;
	$("#currentStep").html(currentWord+1 + " з " + wordAmount);
	for(n=0;n<amountOfLevels;n++){
		for(var m =0; m<wordList[n].length;m++){
			wordOrder[n][m] = m;

		}
	}
	
	wordOrder[currentLevel].sort(() => Math.random() - 0.5);
	
	$("#word").html(wordList[currentLevel][wordOrder[currentLevel][currentWord]]);
	$(".next").click(function(){
		currentWord++;
		if(currentWord==wordAmount){
			currentWord = 0;
		}
		$("#word").html(wordList[currentLevel][wordOrder[currentLevel][currentWord]]);
		$("#currentStep").html(currentWord+1 + " з " + wordAmount);
			$("#inputText").val(userTranslation[currentLevel][wordOrder[currentLevel][currentWord]])
		if(userTranslation[currentLevel][wordOrder[currentLevel][currentWord]]!= undefined){
		
			$('input').attr('readonly',true);
		}
		else{
			$('input').attr('readonly',false);
		}
	});
	$(".prev").click(function(){
		currentWord--;
		if(currentWord==-1){
			currentWord = wordAmount-1;
		}
		$("#word").html(wordList[currentLevel][wordOrder[currentLevel][currentWord]]);
		$("#currentStep").html(currentWord+1 + " з " + wordAmount);
		$("#inputText").val(userTranslation[currentLevel][wordOrder[currentLevel][currentWord]])
		if(userTranslation[currentLevel][wordOrder[currentLevel][currentWord]]!= undefined){
			
			$('input').attr('readonly',true);
		}
		else{
			$('input').attr('readonly',false);
		}
	});
	$("input[name='contact']").change(function(){
		for(var i=0;i<wordAmount;i++){
			userTranslation[currentLevel][wordOrder[currentLevel][i]]= undefined;
			
		}
		$("#inputText").val("");
		rightAnswer = 0;
		falseAnswer = 0;
		currentWord = 0;
		if($('#level1').is(':checked')){
			currentLevel =0;
		}
		else if($('#level2').is(':checked')){
			currentLevel =1;
		}
		else if($('#level3').is(':checked')){
			currentLevel =2;
		}
		$("#currentStep").html(currentWord+1 + " з " + wordAmount);
		wordOrder[currentLevel].sort(() => Math.random() - 0.5);
		$("#word").html(wordList[currentLevel][wordOrder[currentLevel][currentWord]]);
		$("#rightAnswer").html(rightAnswer);
		$("#falseAnswer").html(falseAnswer);
		$('input').attr('readonly',false);
	});
	$('input').keydown(function(e) {
		if((e.keyCode === 13)&&((!$('input').prop('readonly')))) {
			
			userTranslation[currentLevel][wordOrder[currentLevel][currentWord]] = $("#inputText").val();
			
			if(userTranslation[currentLevel][wordOrder[currentLevel][currentWord]]==translationList[currentLevel][wordOrder[currentLevel][currentWord]]){
				
				rightAnswer++;
				$("#rightAnswer").html(rightAnswer);
				$("#falseAnswer").html(falseAnswer);
			}			 
			else{ 
				
				falseAnswer++;
				$("#rightAnswer").html(rightAnswer);
				$("#falseAnswer").html(falseAnswer);
				
			}
			$('input').attr('readonly',true);
			if(rightAnswer+falseAnswer==wordAmount){
				if(rightAnswer>0){
					let finalResult = rightAnswer/wordAmount;
					if(finalResult<0.3){
						alert("Your result is Bad")
					}
					else if(finalResult<0.6){
						alert("Your result is Normal")
					}
					else if(finalResult<1){
						alert("Your result is Good")
					}
					else{
						alert("Your result is Perfect")
					}
				}
				else{
					alert("Your result is Awful")
				}
			}
		}
	});
});