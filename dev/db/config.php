<?php

////////////////////////////////////////////////
// user setting
////////////////////////////////////////////////

// いじるDB名
define('DBNAME', 'ここにDB名を入れるんだ');

////////////////////////////////////////////////
// define
////////////////////////////////////////////////

// ローカルのDB設定
define('DBUSER', 'root');
define('DBHOST', 'localhost');

//dumpするファイル名
define('DUMP_FILENAME', 'dump.sql');

// ファイルパス
define('DUMP_PATH', '../../dev/db/mydump');
define('REPO_PATH', '../../dev/db/repository');
define('BACKUP_PATH', '../../dev/db/backup');

$message = "";

////////////////////////////////////////////////
// Main flow
////////////////////////////////////////////////

checkDir(DUMP_PATH);
checkDir(BACKUP_PATH);
checkDir(REPO_PATH);

if(isset($_POST['cmd'])) {
	if($_POST['cmd']=="dump") {
	 	$message = runDump();
	}elseif($_POST['cmd']=="overwrite") {
		$message = runOverwrite();
	}
}

////////////////////////////////////////////////
// functions
////////////////////////////////////////////////

// ディレクトリなければ作成
function checkDir($path){
	if(!file_exists($path)){
		mkdir($path);
	}
}

// Dump ＋ バックアップ
function runDump(){
	$cmd = "mysqldump -u".DBUSER." -h".DBHOST." ".DBNAME." > ".DUMP_PATH."\\".DUMP_FILENAME;
	shell_exec($cmd);
	runBackup('dump');
	return "出力しました / Dump done!";
}

// 上書き ＋ バックアップ
function runOverwrite(){
	runBackup('overwrite');
	if(file_exists(REPO_PATH.'/dump.sql')){
//		$cmd = "mysql -u".DBUSER." xxx < ".REPO_PATH."\\".DUMP_FILENAME;
		$cmd = "mysql -u".DBUSER." -h".DBHOST." ".DBNAME." < ".REPO_PATH."\\".DUMP_FILENAME;
		shell_exec($cmd);
		return "上書きしました / Overwrite done!";
	}else{
		return '上書き用のファイルがありません！ / No file for overwriting!';
	}
}

// バックアップ
function runBackup($type){
	$time = date("YmdHis");
	$cmd = "mysqldump -u".DBUSER." -h".DBHOST." ".DBNAME." > ".BACKUP_PATH."/mydump_".$type."_".$time.".sql";
	shell_exec($cmd);
}

?>
