let students = [
    {
        id: 1,
        name: "rikkei",
        email: "rikkei@gmail.com",
        phone: 88888888,
        Address: "HN",
        gender: "male",
    },
    {
        id: 2,
        name: "academy",
        email: "academy@gmail.com",
        phone: 999999999,
        Address: "HCM",
        gender: "female",
    },
    {
        id: 3,
        name: "ali",
        email: "ali@gmail.com",
        phone: 666666,
        Address: "DN",
        gender: "female",
    }
]


function newtable(e = students) {
    let string = "";
    for (let i = 0; i < e.length; i++) {
        let elemnet = e[i];
        string += ` <tr>
                    <td>${elemnet.id}</td>
                    <td>${elemnet.name}</td>
                    <td>${elemnet.email}</td>
                    <td>${elemnet.phone}</td>
                    <td>${elemnet.Address}</td>
                    <td>${elemnet.gender}</td>
                    <td>
                        <button type="button" onclick="beforeEdit(${elemnet.id})">edit</button>
                    </td>
                    <td>
                        <button onclick="onDelete(${elemnet.id})">delete</button>
                    </td>
                </tr>`
    }
    document.getElementById("tbody").innerHTML = string;
}
newtable();


function idTutang() {
    let idMax = 0;
    for (let i = 0; i < students.length; i++) {
        if (idMax < students[i]) {
            students[i] = idMax;
        }
    }
    return idMax++;
}


function addNew(e) {
    e.preventDefault()
    let newId = idTutang();
    let newName = document.getElementById("name").value
    let newemail = document.getElementById("email").value
    let newphone = document.getElementById("phone").value
    let newAddress = document.getElementById("Address").value
    let newgender1 = document.getElementById("gender1").value;
    let newgender2 = document.querySelector('input[name="gender"]:checked').value;
    const newelement = {
        id: newId,
        name: newName,
        email: newemail,
        phone: newphone,
        Address: newAddress,
        gender: newgender1,
        gender: newgender2,
    }
    students.push(newelement);
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("Address").value = "";
    document.getElementById("gender1").value = "";
    document.getElementById("gender2").value = "";
    newtable();
}


function onDelete(id) {
    if (confirm("Are you sure you want to delete ?")) {
        let idx = students.findIndex(el => el.id == id)
        students.splice(idx, 1)
        newtable()
    }
}


function beforeEdit(id) {
    document.getElementById('question').style.display = 'block'
    const currentElement = students.find(el => el.id == id);
    document.getElementById('editName').value = currentElement.name
    document.getElementById('editEmail').value = currentElement.email
    document.getElementById('editPhone').value = currentElement.phone
    document.getElementById('editAddress').value = currentElement.Address
    document.getElementById('editgender').value = currentElement.Address
    localStorage.setItem('currentElementId', JSON.stringify(id))
}


function onUpdate() {
    let id = JSON.parse(localStorage.getItem('currentElementId'))
    let currentElement = students.find(el => el.id == id);
    currentElement.name = document.getElementById('editName').value
    currentElement.email = document.getElementById('editEmail').value
    currentElement.phone = document.getElementById('editPhone').value
    currentElement.Address = document.getElementById('editAddress').value
    currentElement.gender = document.getElementById('editgender').value
    newtable()
    onCancel()
}


function onCancel() {
    document.getElementById('question').style.display = 'none'
    localStorage.removeItem('currentElementId')
}


function checkSearch() {
    let text = document.getElementById("search").value;
    let checkStudent = students.filter(stud => stud.name.toLowerCase().includes(text.trim().toLowerCase()));
    newtable(checkStudent);
}


function alphab() {
    students.sort((a, b) => a.name.localeCompare(b.name));
    newtable();
}



