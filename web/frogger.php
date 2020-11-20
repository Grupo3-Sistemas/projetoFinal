<?php

?>
<!DOCTYPE html>
<html>

<head>
  <title>Frogger</title>
  <meta charset="UTF-8">
  <link rel='stylesheet' type='text/css' media='screen' href='../styles/style_frogger.css'>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>
  
  <table>

    <tr>
      <td>
        <canvas width="624" height="720" id="game"></canvas>
      </td>
    </tr>

    <tr>  
      <td>
        <label class="vida">Vidas: </label>
        <label class="vida" id="vidas">6</label>

        <label class="timer" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tempo: </label>
        <label class="timer" id="minutes">00</label>
        <label class="timer">:</label>
        <label class="timer" id="seconds">00</label>
        <label class="timer" id="player" value="" hidden></label>
        <label class="timer" id="totalSec" value="" hidden></label>
      </td>
    </tr>

  </table>

  <script src="../scripts/script_frogger.js"></script>

</body>

</html>