<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Jogo da Memoria </title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../styles/style_memoria.css'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>



<body>
    <div id="container">

        <div class="card" id="card0">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>
        
        <div class="card" id="card1">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card2">
             <div class="face back"></div>
             <div class="face front"></div>
        </div>

        <div class="card" id="card3">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card4">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card5">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card6">
            <div class="face back"></div>
            <div class="face front"></div>
         </div>

        <div class="card" id="card7">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card8">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card9">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card10">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card11">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card12">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card13">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <div class="card" id="card14">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>
        <div class="card" id="card15">
            <div class="face back"></div>
            <div class="face front"></div>
        </div>

        <img src="./img/Match.png" id="imgMatchSign">

    </div>

    <div id="modalGameOver">
        <img src="./img/gameover.png" id="imgGameOver">
    </div>

    <div class="time">
        <label class="timer" id="minutes">00</label>:<label id="seconds">00</label>
        <label class="timer" id="player" value="" hidden></label>
        <label class="timer" id="totalSec" value="" hidden></label>
    </div>


    <script src="../scripts/script_memoria.js"></script>

</body>
</html>