function Task_1() {
    /*************** Первое езадание ************/
    let a = 1, b = 1, c, d;
    c = ++a; alert(c); // 2 В префиксной форме инкрементирование производится сразу, а возврат — уже с обновленным значением.
    d = b++; alert(d); // 1 В постфиксной форме сначала происходит возвращение значения, а потом выполняется инкрементирование.
    c = (2+ ++a); alert(c); // 5 Тоже самое, что в пункте 1
    d = (2+ b++); alert(d); // 4 Тоже самое что в пункте 2
    alert(a); // 3 Операции инкрементирования прошли
    alert(b); // 3 Все значения возвращены, операции инкрементирования выполнились.
}

function Task_2() {
    /*************** Второе езадание ************/
    let a = 2;
    let x = 1 + (a *= 2);
    console.log(x);  // 5
}

function Task_3() {
    let a,b;
    a = +prompt("Введите число A:");
    b = +prompt("Введите число B:");

    if (a >= 0 && b >= 0) {
        console.log(`${a} - ${b} = ` + (a - b));
    } else if (a < 0 && b < 0) {
        console.log(`${a} * ${b} = ` + (a * b));
    } else {
        console.log(`${a} + ${b} = ` + (a + b));
    }
}

function Task_4() {
    let a;
    while (a < 0 || a > 15 || a === undefined) {
        a = +prompt("Введите число от 0 до 15:");
    }
    switch (a) {
        case 0:
            console.log(0);
        case 1:
            console.log(1);
        case 2:
            console.log(2);
        case 3:
            console.log(3);
        case 4:
            console.log(4);
        case 5:
            console.log(5);
        case 6:
            console.log(6);
        case 7:
            console.log(7);
        case 8:
            console.log(8);
        case 9:
            console.log(9);
        case 10:
            console.log(10);
        case 11:
            console.log(11);
        case 12:
            console.log(12);
        case 13:
            console.log(13);
        case 14:
            console.log(14);
        case 15:
            console.log(15);
    }
}


function plus(a= 0, b= 0) {
    return a + b;
}

function minus(a= 0, b= 0) {
    return a - b;
}

function multiply(a= 0, b= 0) {
    return a * b;
}

function devision(a= 0, b= 0) {
    return a / b;
}

function Task_5() {
    let a = +prompt("Введите число A:");
    let b = +prompt("Введите число B:");
    let op = prompt("Введите название операции (plus, minus, multiply, devision):")

    console.log(`${a} ${op} ${b} = ` + getOp(a, b, op))
}

function getOp(a,b,op) {
    switch (op){
        case "plus":
            return plus(a, b);
        case "minus":
            return minus(a, b);
        case "multiply":
            return multiply(a, b);
        case "devision":
            return devision(a, b);
    }
}

function Task_6() {
    console.log("0 == undefined = " + (0 == undefined));
    // undefined - это не инициализированная переменная
    // 0 - это конкретное значение
}

