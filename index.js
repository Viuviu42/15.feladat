const data = {
  "Alajos Strobl": {
    "born" : "1856",
    "deat" : "1926",
    "type" : "Bust",
    "picture" : "pictures/512px-Bust_of_Alajos_Strobl_in_the_Szeged_Pantheon.jpg"
  },
  "Gregor József": {
    "born" : "1940",
    "deat" : "2006",
    "type" : "Bust",
    "picture" : "pictures/512px-Bust_of_József_Gregor_in_the_Szeged_Pantheon.jpg"
  },
  "Munkácsy Mihály": {
    "born" : "1844",
    "deat" : "1900",
    "type" : "Bust",
    "picture" : "pictures/512px-Bust_of_Mihály_Munkácsy_in_the_Szeged_Pantheon.jpg"
  }
}

if (localStorage.length === 0) {
    for (const name in data) {
    localStorage.setItem(name, JSON.stringify(data[name]));
}
}

const table = document.querySelector('table');    
for (const name in localStorage) {
    const tmp = JSON.parse(localStorage.getItem(name));
    TableMaker(tmp,name);
    console.log(tmp)
    
}
console.log(table.length)
console.log(table.rows.length)

const Add = document.getElementById('add');
Add.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const born = document.getElementById('born').value;
    const deat = document.getElementById('death').value;
    const type = document.getElementById('type').value;
    const picture = document.getElementById('picture').value;
    if (name && born && deat && type && picture) {
        if(name in localStorage){
            alert('This entry already exists.');
            return;
        }
        const newData = {
            born: born,
            deat: deat,
            type: type,
            picture: picture
        };
        localStorage.setItem(name, JSON.stringify(newData));
        TableMaker(newData, name);
    }
    else{
        alert('Please fill in all fields.');
    }
});

function TableMaker(tmp,name){
        if(tmp){
        const row = table.insertRow(table.rows.length-1);
        row.insertCell().textContent = name;
        row.insertCell().textContent = tmp.born;
        row.insertCell().textContent = tmp.deat;
        row.insertCell().textContent = tmp.type;
        const imgCell = row.insertCell();
        const img = document.createElement('img');
        img.src = tmp.picture;
        img.alt = name;
        img.style.width = '15vw'; 
        imgCell.appendChild(img);
        const buttonCell = row.insertCell();
        const buttonDel = document.createElement('button');
        const buttonEdit = document.createElement('button');
        buttonEdit.textContent = 'Edit';
        buttonCell.appendChild(buttonEdit);
        buttonEdit.addEventListener('click', () => {
            const newBorn = prompt('Enter new birth year:', tmp.born);
            const newDeat = prompt('Enter new death year:', tmp.deat);
            const newType = prompt('Enter new type:', tmp.type);
            const newPicture = prompt('Enter new picture URL:', tmp.picture);
            if (newBorn && newDeat && newType && newPicture) {
                const updatedData = {
                    born: newBorn,
                    deat: newDeat,
                    type: newType,
                    picture: newPicture
                };
                localStorage.setItem(name, JSON.stringify(updatedData));
                row.cells[1].textContent = newBorn;
                row.cells[2].textContent = newDeat;
                row.cells[3].textContent = newType;
                img.src = newPicture;
            }
        });
        buttonDel.textContent = 'Delete';
        buttonCell.appendChild(document.createElement('br'));
        buttonCell.appendChild(buttonDel);
        buttonDel.addEventListener('click', () => {
            table.deleteRow(row.rowIndex);
            localStorage.removeItem(name);
            });
        }        
}


