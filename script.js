document.addEventListener("DOMContentLoaded", function() {

    const validationMessageX = document.getElementById("validation-message-x");
    const validationMessageY = document.getElementById("validation-message-y");
    const validationMessageR = document.getElementById("validation-message-r");
    const cleanButton = document.getElementById("clean-button");
    const submitButton = document.getElementById("submit-button");
    const resultTable = document.getElementById("result-table");
    const checkboxes = document.querySelectorAll('input[name="R"]');
    const inputX = document.getElementById("X");
    const inputY = document.getElementById("Y");
    const regex=/^(null|-?\d+(\.\d{0,10})?)?$/;

    // Вызываем функцию восстановления данных из локального хранилища
    restoreTableDataFromLocalStorage();
    

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            checkboxes.forEach(cb => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
            });
        });
    });

    

    inputX.addEventListener("input",function(){
        const X=inputX.value.replace(",",".");
        if (vailidateX(X)){
            validationMessageX.textContent='';
        }
        else{
            inputX.value = '';
            validationMessageX.textContent = "Введите корректное значение X";
        }
    })
    

    inputY.addEventListener("input", function() {
        
        const Y = inputY.value.replace(",", ".");
        
        if ( !vailidateY(Y)) {
            inputY.value = "";
        
            validationMessageY.textContent = "Введите корректное значение Y";
        } else {
            
            validationMessageY.textContent = "";
        }
    });

    submitButton.addEventListener("click", function() {
        
        const X = inputX.value.replace(",", ".");
        
        const Y = inputY.value.replace(",", ".");

        const R = document.querySelector('input[name="R"]:checked');
        
        if (X === '' || X ==='-') {
            validationMessageX.textContent = "Введите корректное значение X";
            return;
        } else {
            validationMessageX.textContent = "";
        }
        
        if (Y === '' || Y==='-') {
            validationMessageY.textContent = "Введите корректное значение Y";
            return;
        } else {
            validationMessageY.textContent = "";
        }

        if (!R) {
            validationMessageR.textContent = "Укажите значение R";
        } else {
            validationMessageR.textContent="";
            

            sendDataToServer(X,Y,R)
        }
    });

    

    
    
    //Функция для восстановления таблицы из localstorage
    function restoreTableDataFromLocalStorage() {
        const tableDataJSON = localStorage.getItem("tableData");

        if (tableDataJSON) {
            const tableData = JSON.parse(tableDataJSON);

            // Проходим по сохраненным данным и создаем строки в таблице
            for (const rowData of tableData) {
                const newRow = resultTable.insertRow(-1); // Вставляем строку в конец таблицы

                // Добавляем ячейки с данными в строку
                for (const cellData of rowData) {
                    const newCell = newRow.insertCell(-1); // Вставляем ячейку в конец строки
                    newCell.textContent = cellData;
                }
            }
        }
    }

    
    

    // Функция для сохранения данных таблицы в localStorage
    function saveTableDataToLocalStorage() {
        const tableRows = resultTable.querySelectorAll("tr");
        const tableData = [];

        // Проходим по всем строкам таблицы, начиная с первой (индекс 1, так как первая строка - заголовок)
        for (let i = 1; i < tableRows.length; i++) {
            const row = tableRows[i];
            const rowData = [];

            // Проходим по всем ячейкам в строке
            for (const cell of row.cells) {
                rowData.push(cell.textContent);
            }

            tableData.push(rowData);
        }

        // Сохраняем данные в localStorage
        localStorage.setItem("tableData", JSON.stringify(tableData));
    }

    //Функция для валидации X
    function vailidateX(par){
        return ((regex.test(par) && par<5 && par>-5) || par==='-')
    };

    //Функция для валидации Y
    function vailidateY(par){
        return ((regex.test(par) && par<3 && par>-3) || par==='-')
    };


    function sendDataToServer(X, Y, R) {
        const xhr = new XMLHttpRequest();
        
        const url = `checker.php?X=${X}&Y=${Y}&R=${R.value}`;
        xhr.open("GET", url, true);
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                
                const newRowHTML = xhr.responseText;
                const newRow = resultTable.insertRow(1); 
                newRow.innerHTML = newRowHTML;
                
                
                
            }
        };
        
        xhr.send();
    }

    function clearTable() {
        // Удаление строк из таблицы
        while (resultTable.rows.length > 1) {
            resultTable.deleteRow(1); 
        }

        localStorage.removeItem("tableData");
    }

    cleanButton.addEventListener("click", clearTable);


    window.addEventListener("beforeunload",saveTableDataToLocalStorage);
    

    
    
});

