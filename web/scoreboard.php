<!doctype html>
<head>
<meta charset="utf-8">
<title>Scoreboard</title>
<link rel="stylesheet" href="../styles/style.css">
</head>

<body>
<center>

<div class="topnav">
  <a href=index.php>Home</a>
  <a href="javascript:history.back()">Back</a>
  <a class="active" href="scoreboard.html">Scoreboard</a>
</div>

<div class="div_body">
  
  <div class="score_div"> 
    <?php
    require_once('connection.php');
    $sql = "SELECT nmPlayer, timeScore FROM frogger ORDER BY timeScore";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
          echo "Player: " . $row["nmPlayer"]. " - Time: " . $row["timeScore"]. "<br>";
        }
      } else {
        echo "0 results";
      }
    ?>
  </div>
  
</div>

</center>

</body>
</html>