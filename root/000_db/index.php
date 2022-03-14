<?php require('../../dev/db/config.php'); ?>

<html>
<head>
	<title>DB</title>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css" rel="stylesheet">
	<style>
		body{
			padding: 1.5rem;
		}
		.c-btn2{
			position: fixed;
			bottom: 30px;
			right: 3rem;
			opacity: 0.9;
		}
		.c-btn3{
			position: fixed;
			bottom: 30px;
			left: 3rem;
		}
		form{
			margin-bottom: 0;
		}
		img{
			height: auto;
		}

	</style>
</head>
<body>

<?php
////////////////////////////////////////////////
// How to use
//////////////////////////////////////////////// ?>
<?php  if(isset($_GET['t'])) { ?>

<style>
.message{
	margin-top: 30px;
}
</style>

<section class="section">


<h1 class="title is-1">準備</h1>
<h1 class="subtitle is-5">コマンドラインでMySQLを使えるようにする</h1>


<br>

<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/8.png" style="width:auto;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
Powershellなどのコマンドラインで「mysql」と入力してみてください。<br>
エラーメッセージが表示される場合には「MySQLのPath」が設定されていません<br>
<br>
↓ 動画を参考にして設定してください
</div></article>
</div>
</div>


<video src="http://flocssbem.test20008.com/sheet/db/m1.mp4" controls></video>
<br>
<br>


<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/9.png" style="width:auto;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
この様に表示されたらOKです。<br>
表示されない場合はPCを再起動してみましょう。<br>
<br>
※それでも表示されない場合は「Path」が間違っています。
</div></article>
</div>
</div>


<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/10.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
念の為、MySQLを再起動してください。<br>
STOP→STARTしてください。
</div></article>
</div>
</div>



<br>
<br>
<br>
<br>

<section class="section">

<h1 class="title is-1">出力 / Dump</h1>
<br>

<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/5.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
これをクリックすると
</div></article>
</div>
</div>



<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/1.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
Dump ファイルがそれぞれ出力されます。
</div></article>
</div>
</div>

<br><br><br><br>
<br><br><br><br>
<br><br>

<h1 class="title is-1">上書き / Overwrite</h1>
<br>


<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/6.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
これをクリックすると「上書き / Overwrite」が動作します。<br>
クリックする前に、上書きするファイルを用意します
</div></article>
</div>
</div>



<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/3.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
上書きするファイルはGitからPULLしてください。
</div></article>
</div>
</div>




<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/6.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
ファイルの準備はできましたね？<br>
それではクリックします
</div></article>
</div>
</div>


<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/2.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
現在のDBのバックアップが取得されたのち、
DBが上書きされます。
</div></article>
</div>
</div>


<br><br><br><br>
<br><br><br><br>
<br><br>

<h1 class="title is-1">PUSH</h1>
<h1 class="subtitle is-5">自分のLOCALのDBをPUSHするにはどうしたいいか？</h1>


<br>



<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/5.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
これをクリックして
</div></article>
</div>
</div>



<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/1.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
Dump ファイルを出力して
</div></article>
</div>
</div>

<img src="http://flocssbem.test20008.com/sheet/db/4.png" style="width:700px;">

<article class="message is-dark"><div class="message-body">
それをPUSHすれば良いのです。
</div></article>


</section>

<br><br><br><br>
<br><br><br><br>

<h1 class="title is-1">DBの選択</h1>
<h1 class="subtitle is-5">どのDBをDUMPしたりOverwriteするのか</h1>


<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/7.png" style="width:500px;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
それは /dev/db/config.php に記載してあります。<br>
これをプロジェクトの始まりのときに設定しておきます。
</div></article>
</div>
</div>


<br><br><br><br>
<br><br><br><br>


<h1 class="title is-1">こんなときは</h1>


<div class="columns">
<div class="column">
<img src="http://flocssbem.test20008.com/sheet/db/11.png" style="width:auto;">
</div>
<div class="column">
<article class="message is-dark"><div class="message-body">
Dumpしたファイルが0KBになってしまう！
<br>
<br>

◆原因と対策<br>
・XAMPPのMySQLを再起動してみましょう<br>
・XAMPPのMySQLにパスワードを設定していませんか？効率化のため、パスワードは「無し」で統一しています。

</div></article>
</div>
</div>


<br><br><br><br>
<br><br><br><br>




<div class="c-btn3">
	<a href="./" class="button is-light">< 戻る / Back</a>
</div>


<?php
////////////////////////////////////////////////
// DB Buttons
//////////////////////////////////////////////// ?>
<?php }else{ ?>


	<?php if($message){?>
		<article class="message is-info">
			<div class="message-body">
				<?php echo $message; ?> 
			</div>
		</article>
	<?php } ?>

	<section class="section">
	<div class="container">
		<div class="c-btn1">
			<form method="POST" id="form1">
				<input type="hidden" name="cmd" value="dump">
				<input type="submit" value="出力する / Dump" class="button is-primary is-large is-fullwidth">
			</form>
		</div>
	</div>
	</section>

	<div class="c-btn2">
		<form method="POST" id="form2">
			<input type="hidden" name="cmd" value="overwrite">
			<input type="button" value="上書きする / Overwrite" id="btnOverwrite" class="button is-danger">
		</form>
	</div>

	<div class="c-btn3">
		<a href="./?t=m" class="button is-light">使い方 / How to use</a>
	</div>


	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script>
	$('#btnOverwrite').on('click', function(event) {
		if(!confirm('★★★★★ 要確認 ★★★★★\n[DB : <?php echo DBNAME;?>] を上書きします\nよろしいですか？\n\n★★★★★ Warning!! ★★★★★\nOverwrite [DB : <?php echo DBNAME;?>] \nOK ???')){
			return false;
		} else {
			$('#form2').submit();
		}
	});
	</script>

<?php } ?>

</body>
</html>