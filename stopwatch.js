$(function() {
    //Variables
    var mode = 0;//App mode
    var timeCounter = 0;//Time counter
    var lapCounter = 0;//Lap counter
    var action;//Variable for setInterval
    var lapNumber = 0;//Number of laps

        //Minutes, seconds, centiseconds for time and lap
        var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

    //On App load show start and lap buttons
    hideShowButtons("#startButton", "#lapButton");

    //Click on startButton
    $("#startButton").click(function() {
        //Mode on
        mode = 1;
        //Show stop and lap buttons
        hideShowButtons("#stopButton", "#lapButton");
        //Start counter
        startAction();
    });
        
    //Click on stopButton
    $("#stopButton").click(function() {
        //Show resume and reset button
        hideShowButtons("#resumeButton", "#resetButton");
        //Stop counter
        clearInterval(action);
    });
        
    //Click on resumeButton
    $("#resumeButton").click(function() {
        //Show stop and lap button
        hideShowButtons("#stopButton", "#lapButton");
         //start action
        startAction();
    });
        
    //Click on resetButton
    $("#resetButton").click(function() {
        //reload the page
        location.reload();
    });
        
    //Click on lapButton
    $("#lapButton").click(function() {
        //If mode is ON
        if(mode) {
            //Stop action
            clearInterval(action);
            //resetlap and print details
            lapCounter = 0;
            addLap();
            //Start action
            startAction();
        }   
    });
        
    //Functions
    //hideShowButtons function shows two buttons
    function hideShowButtons(x,y) {
        $(".start, .stop, .resume, .lap, .reset").hide();
        $(x).show();
        $(y).show();
    }

    //Start the counter
    function startAction() {
        action = setInterval(function() {
            timeCounter++;
            if(timeCounter == 100 * 60 * 100) {
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100 * 60 * 100) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }

    //updateTime converts counters to min, sec and centisec
    function updateTime() {
        //1min = 60 * 100centiseconds = 6000centiseconds
        timeMinutes = Math.floor(timeCounter / 6000);
        //1sec = 100centiseconds
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        timeCentiseconds = (timeCounter % 6000)% 100;
        $("#timeMinute").text(format(timeMinutes));
        $("#timeSecond").text(format(timeSeconds));
        $("#timeCentisecond").text(format(timeCentiseconds));

        //1min = 60 * 100centiseconds = 6000centiseconds
        lapMinutes = Math.floor(lapCounter / 6000);
        //1sec = 100centiseconds
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapCentiseconds = (lapCounter % 6000)% 100;
        $("#lapMinute").text(format(lapMinutes));
        $("#lapSecond").text(format(lapSeconds));
        $("#lapCentisecond").text(format(lapCentiseconds));
    }

    //Format nubers
    function format(number) {
        if (number < 10) {
            return "0" + number;
        }else{
            return number;
        }
    }

    //addlap function prints lap details inside the lap box
    function addLap() {
        lapNumber++;
        var myLapDetails = "<div class='lapDetails'>" + "<div class='lapTimeTitle'>" + "Lap" + lapNumber + "</div>" + "<div class='lapTime'>" + "<span>" + format(lapMinutes) + "</span>" + ":<span>" + format(lapSeconds) + "</span>" + ":<span>" + format(lapCentiseconds) + "</span>" + "</div" + "</div>";
        $(myLapDetails).prependTo("#laps");
    }
});