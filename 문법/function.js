// function 함수이름(매개변수){}

function 함수(매개변수) {
    console.log('함수 : ' + 매개변수);
}
함수('매개변수');

// 익명함수 : 함수 이름이 없는 함수
// 매개변수가 하나일 때 소괄호()를 제거해도 된다
익명함수 = 매개변수 => {
    console.log('익명함수 : ' + 매개변수);
}
익명함수 ('매개변수');