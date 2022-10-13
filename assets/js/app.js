$.global = new Object();

$.global.item = 1;
$.global.total = 0;

$(document).ready(function() {

var windowWidth = $(window).width();
var backgroundCount = $('.background').length;
var slidesWidth = backgroundCount * windowWidth;
$.global.item = 0;
$.global.total = backgroundCount; 
    
$('.background').css('width',windowWidth+'px');
$('#background_container').css('width',slidesWidth+'px');

$("#background_container div:nth-child(1)").addClass('active');
    
$('.response_link').click(function() { Slide('next'); }); 
// $('#back').click(function() { Slide('prev'); }); 
$('#back').off("click",function() { Slide('prev'); })


createIndicator()
selectResponse()
})


function Slide(direction)
	{

    if (direction == 'prev') { 
      var $target = $.global.item - 1;
    }
    if (direction == 'next') { 
      var $target = $.global.item + 1; 
    }  
    
    if ($target == -1) { 
      updateElement($.global.total-1); 
    }else if($target == 3){
      changeColor($target)
    } else if ($target == $.global.total) { 
      updateElement(0); 
    } else { updateElement($target); }

    
}

function updateElement(target){
   
var $windowWidth = $(window).width();
var $margin = $windowWidth * target; 
var $actualtarget = target+1;
var $theme = $("#background_container div:nth-child("+$actualtarget+")").data('theme');
var $actualBar = $("#bar_container .bar:nth-child("+$actualtarget+")");
var $bars = $("#bar_container .bar");
var $otherBars = $bars.not($actualBar);
var $question = $("#question h1:nth-child("+$actualtarget+")");
var $oldQuestion = $("#question h1:nth-child("+target+")");
var $stateOfQuestion = $question.data('state');
var $response = $("#response_list-container ul:nth-child("+$actualtarget+")");
var $oldResponse = $("#response_list-container ul:nth-child("+target+")");
var $stateOfResponse = $response.data('state');

$('#back').on("click",function() { Slide('prev'); })


$.global.item = target; 

  changeResponse($stateOfResponse,$response,$oldResponse);
  setTimeout(function(){
    $("#background_container div:nth-child("+$actualtarget+")").addClass('active');
    $('#background_container').css('transform','translate3d(-'+$margin+'px,0px,0px)');	
    textColor($theme);
    progressBar($actualtarget,$actualBar,$otherBars);
    changeText($stateOfQuestion,$question,$oldQuestion);
    $('.number').html($.global.item+1);
    $('#back').off("click",function() { Slide('prev'); })

  },1000)
  
}

function changeColor(target){
  var $actualtarget = target;
  var background = $("#background_container div:nth-child("+$actualtarget+")");
  $(background).css('background', 'url(assets/images/3747b777e269456019b15bd4a45c1d37-min.webp)')
    
}
 
function textColor($theme){
    if($theme == "light"){
      document.body.classList.add('light');
    }else{
      document.body.classList.remove('light');
    }
}

function changeText($stateOfQuestion, $question, $oldQuestion){
    if($stateOfQuestion === "change" ){

      setTimeout(function(){
        $oldQuestion.removeClass("stay").addClass('change')
      },1000);

      setTimeout(function(){
        $question.removeClass("change").addClass('stay');
      },2000);

    }else if($stateOfQuestion === undefined ){

      $oldQuestion.removeClass("change").addClass('stay');

    }
}

function progressBar($actualtarget, $actualBar,$otherBars){
    if($actualtarget == $actualBar.attr('id')){
      if(!$actualBar.hasClass('.active')){
        $actualBar.addClass('active')
      }
    }
    $otherBars.removeClass('active')
}

function changeResponse($stateOfResponse,$response,$oldResponse){

    $('#response_container').removeClass('active').addClass('change')


    if($stateOfResponse == "change" ){

      setTimeout(function(){
        $oldResponse.removeClass("stay").addClass('change')
      },1000);

      setTimeout(function(){
        $response.removeClass("change").addClass('stay');
      },2000);

      setTimeout(function(){
        $('#response_container').removeClass('change').addClass('active')
      },2500);

    }else if($stateOfResponse === undefined ){

      $oldResponse.removeClass("change").addClass('stay');

    }


   
}

function createIndicator(){
    var selection = $('ul.stay .response_link')
    var active = ($('ul.stay li.active').index())

    $(selection).each(function(){
      const aside = document.querySelector('#list-indicator ul')
      var li = document.createElement('li');
      li.className = 'indicator'
      aside.appendChild(li)
    })

    var li = $('#list-indicator ul li')
    $(li).eq(active).addClass('active')
}
  
function selectResponse(){
  
  var selection = $('ul.stay .response_link')
  var active = ($('ul.stay li.active').index())
  var indicators = $('#list-indicator ul li')
  var indicator = $('#list-indicator ul li.active')

  $('#up_container').on('click',function(){
    $(selection).removeClass('active')
    $(indicator).removeClass('active')
    $(selection).eq(active-1).addClass('active')
    $(indicators).eq(active-1).addClass('active')
  })

  $('#down_container').on('click',function(){
    $(selection).removeClass('active')
    $(indicator).removeClass('active')
    $(selection).eq(active+1).addClass('active')
    $(indicators).eq(active+1).addClass('active')

  })
    
}

