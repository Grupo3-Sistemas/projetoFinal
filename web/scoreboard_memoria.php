<!doctype html>
<head>
<meta charset="utf-8">
<title>Scoreboard Memoria</title>
<link rel="stylesheet" href="../styles/style.css">
<style>

table, th, td {
    border: 1px solid white;
    font-size: 40px;
    padding: 8px;
    text-align:center;
    background: black;
}
tr:hover {
  background-color: #6050e6;
  }
 
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: purple;
  color: white;
  }
</style>
</head>

<body>
<center>

<div class="topnav">
  <a href=index.php>Home</a>
  <a href="javascript:history.back()">Back</a>
  <a class="active">Scoreboard</a>
</div>

<div>
  
  <div class="score_div"> 
    <?php
    require_once('connection.php');
    $sql = "SELECT nmPlayer, timeScore FROM memoria ORDER BY timeScore";
    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) {
      echo "<table><tr><th>Player</th><th>Time in seconds</th></tr>";
      // output data of each row
      while($row = $result->fetch_assoc()) {
          echo "<tr><td>" . $row["nmPlayer"]. "</td><td>" . $row["timeScore"]."</td></tr>";
      }
      echo "</table>";
  } else {
      echo "0 results";
  }
  
  $conn->close();
    ?>
  </div>
  
</div>

</center>

</body>
</html>