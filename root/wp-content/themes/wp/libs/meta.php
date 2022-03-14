<?php global $page_id;

// Default
$title       = "title";
$description = "description";
$keywords    = "key1,key2";

if ( $page_id == "xxx" ) {
	$title       = "xxx";
	$description = "xxx description";
	$keywords    = "xxx,key1,key2";
}

?>
<title><?php echo $title; ?></title>
<meta name="description" content="<?php echo $description; ?>">
<meta name="keywords" content="<?php echo $keywords; ?>">
