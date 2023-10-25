<?php 
$X = ($_GET['X']);
$Y=($_GET['Y']);
$R=($_GET['R']);
if (!isValidNumberX($X) || !isValidNumberY($Y) || !in_array($R,[1,1.5,2,2.5,3])){
    die("Некорректные данные");
}
function isValidNumberX($value) {
    // Проверяем, что значение не пустое
    if (!empty($value)) {
        // Пытаемся преобразовать значение в число
        $number = floatval($value);

        // Проверяем, что значение успешно преобразовано в число
        if (is_numeric($number)) {
            // Преобразуем число в строку, чтобы проверить количество знаков после точки
            $numberStr = strval($number);

            // Разделяем число на целую и дробную часть
            $parts = explode('.', $numberStr);

            // Проверяем количество знаков после точки (если есть дробная часть)
            if (count($parts) > 1 && strlen($parts[1]) > 10) {
                return false; 
            }

            if ($number > -5 && $number < 5) {
                return true; 
            }
        }
    }
    
    return false; // Значение не прошло проверку
}

function isValidNumberY($value) {
    // Проверяем, что значение не пустое
    if (!empty($value)) {
        // Пытаемся преобразовать значение в число
        $number = floatval($value);

        // Проверяем, что значение успешно преобразовано в число
        if (is_numeric($number)) {
            // Преобразуем число в строку, чтобы проверить количество знаков после точки
            $numberStr = strval($number);

            // Разделяем число на целую и дробную часть
            $parts = explode('.', $numberStr);

            // Проверяем количество знаков после точки (если есть дробная часть)
            if (count($parts) > 1 && strlen($parts[1]) > 10) {
                return false; 
            }

            if ($number > -3 && $number < 3) {
                return true; 
            }
        }
    }
    
    return false; // Значение не прошло проверку
}


$inside_area=false;

if ($X>=0 && $Y>=0){
    if ($Y<=(-$X+($R/2))){
        $inside_area=true;
    }
}
if ($X<=0 && $Y>=0){
    if (($X*$X)<=($R*$R-$Y*$Y)){
        $inside_area=true;
    }
}
if ($X>=0 && $Y<=0){
    if (($X<=$R/2)&&($Y>=-$R)){
        $inside_area=true;
    }
}
if ($inside_area){
    $inside_area="Попал";
} else{
    $inside_area="Не попал";
}

if ($X==-0){
    $X=0;
}
if ($Y==-0){
    $Y=0;
}

$html="<tr><td > X=$X; Y=$Y; R=$R</td>";

$html .="<td>".   (microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]) . " сек</td>";
$html.="<td>".date("H:i:s")."</td>";

$html.="<td>$inside_area</td></tr>";

echo $html;

?>