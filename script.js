<!DOCTYPE html>
<html>
<head>

<title>Polskie Informacje 24/7</title>

<style>

body{
font-family:Arial;
margin:0;
background:#f2f2f2;
}

.topbar{
background:#0a2c5a;
color:white;
padding:20px;
display:flex;
justify-content:space-between;
align-items:center;
}

.logo{
font-size:28px;
font-weight:bold;
background:linear-gradient(white 50%, red 50%);
-webkit-background-clip:text;
color:transparent;
}

.menu a{
color:white;
margin-left:20px;
text-decoration:none;
}

#articles{
padding:40px;
display:grid;
grid-template-columns:repeat(3,1fr);
gap:30px;
}

.article{
background:white;
padding:15px;
border-radius:8px;
}

.article img{
width:100%;
border-radius:5px;
}

</style>

</head>

<body>

<div class="topbar">

<div class="logo">
Polskie Informacje 24/7
</div>

<div class="menu">
<a>Najnowsze</a>
<a>Polityka</a>
<a>Sport</a>
<a>Ciekawostki</a>
<a href="login.html">Login</a>
</div>

</div>

<div id="articles">
Ładowanie artykułów...
</div>

<script src="script.js"></script>

</body>
</html>
