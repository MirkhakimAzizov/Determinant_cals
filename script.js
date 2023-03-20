"use strict";

let elWrapper = document.querySelector(".wrapper");
let select = document.querySelector("#select");
let elResalt = document.querySelector(".resalt");
let btn = document.querySelector(".btn");
let elBtn = document.querySelector(".btn");
let elError = document.querySelector(".resalt-error");

let valueArr = [];
let resalt;
var number;
var selectNum;

select.addEventListener("change", evt => {
    evt.preventDefault();

    selectNum = evt.target.value;

    Number(number);

    elWrapper.innerHTML = '';
    renderArr();

})

function renderArr() {

    number = selectNum;

    for (let i = 1; i <= number; i++) {

        let elRow = document.createElement("div");
        elRow.setAttribute("class", `rows row-${i}`);
        elRow.style = `width:${number*65 + number*4}px`;
        select.style = `width:${number*65 + number*4}px`;
        elBtn.style = `width:${number*65 + number*4}px`;
        elResalt.style = `width:${number*65 + number*4}px`;
        elError.style = `width:${number*65 + number*4}px`;

        for (let j = 1; j <= number; j++) {

            let elCol = document.createElement("input");
            elCol.setAttribute("class", `cols col-${j}`);
            elCol.setAttribute("placeholder", `a${i}${j}`);
            elCol.setAttribute("data-place", `a${i}${j}`);
            elCol.setAttribute("type", "number");
            elRow.append(elCol);

        };

        elWrapper.append(elRow);

    };

    let box = document.querySelectorAll(".cols");


    box.forEach(item => {
        item.addEventListener("blur", (evt) => {
            evt.preventDefault();

            let value = evt.target.value.trim();
            let dataSet = evt.target.dataset.place;
            let row = dataSet.charAt(1);
            let col = dataSet.charAt(2);

            if (value != "" && value != " ") {
                if (!valueArr.flat(2).includes(dataSet)) {
                    valueArr.push([col, row, dataSet, value]);
                } else {
                    let index = valueArr.flat(2).indexOf(dataSet);
                    valueArr[(index - 2) / 4] = [col, row, dataSet, value];
                }
            };
        });
    });

    resaltFun();

}

function resaltFun() {

    btn.addEventListener("click", (evt) => {
        evt.preventDefault();
        valueArr.sort();
        // console.log(valueArr);
        if (number == 2) {
            resalt = valueArr[0][3] * valueArr[3][3] - valueArr[1][3] * valueArr[2][3];
        } else if (number == 3) {
            resalt = threeDeterminant(valueArr);
        } else if (number == 4) {
            resalt = fourDeterminant(valueArr);
        }
        // console.log(resalt);

        if (valueArr.length = number * number) {
            elResalt.innerHTML = `Resalt: ${resalt}`;
        }

    });

}

function threeDeterminant(arr) {
    let d1 = arr[0][3] * arr[4][3] * arr[8][3] + arr[1][3] * arr[5][3] * arr[6][3] + arr[2][3] * arr[3][3] * arr[7][3];
    let d2 = arr[2][3] * arr[4][3] * arr[6][3] + arr[0][3] * arr[5][3] * arr[7][3] + arr[1][3] * arr[3][3] * arr[8][3];
    return d1 - d2;
};

function fourDeterminant(arrPar) {

    resalt = 0;

    let arr = [],
        arr1 = [];
    arr.push(...arrPar);
    arr1 = arr.splice(0, number);
    arr1.forEach(el => {
        let arr2 = []
        arr.forEach(item => {
            if (item[0] != el[0]) {
                arr2.push(item);
            }
        })

        let index = arr1.indexOf(el);
        let resalt1 = threeDeterminant(arr2) * el[3];

        if (index % 2 == 0) {
            resalt = resalt + resalt1;
        } else {
            resalt = resalt - resalt1;
        }

    });
    return resalt;
};