let listStudent = [
    ["SV001", "Nguyễn Văn A", "1234@gmail.com", "0981234567", "Hà Nội", "Nam"],
  ];
  let action = "create";
  
  function renderData() {
    let tbody = document.getElementById("content");
  
    tbody.innerHTML = "";
    for (let index = 0; index < listStudent.length; index++) {
      tbody.innerHTML += `<tr>
                  <td>${index + 1} </td>
                  <td>${listStudent[index][0]}</td>
                  <td>${listStudent[index][1]}</td>
                  <td>${listStudent[index][2]}</td>
                  <td>${listStudent[index][3]}</td>
                  <td>${listStudent[index][4]}</td>
                  <td>${listStudent[index][5]}</td>
                  <td>
                  <button onclick="editStudent('${
                    listStudent[index][0]
                  }')">Edit</button>
                  <button onclick="deleteStudent('${
                    listStudent[index][0]
                  }')">Delete</button>
                  </td>
              </tr>`;
    }
  }
  
  function validateForm() {
    let studentId = document.getElementById("studentId").value;
    let studentName = document.getElementById("studentName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let gender = document.querySelector("input[name='gender']:checked").value;
  
    if (studentId == "") {
      alert("Vui lòng nhập mã sinh viên");
      return false;
    }
  
    if (studentName == "") {
      alert("Vui lòng nhập họ tên sinh viên");
      return false;
    }
  
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailPattern)) {
      alert("vui lòng nhập email đúng định dạng");
      return false;
    }
  
    let phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phone.match(phonePattern)) {
      alert("Vui lòng nhập số điện thoại đúng");
      return false;
    }
  
    if (address == "") {
      alert("Vui lòng nhập địa chỉ");
      return false;
    }
    return true;
  }
  
  function createOrEdit() {
    if (validateForm()) {
      
      let studentId = document.getElementById("studentId").value;
      let studentName = document.getElementById("studentName").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;
      let address = document.getElementById("address").value;
      let gender = document.querySelector("input[name='gender']:checked").value;
  
      if (action == "create") {
        listStudent.push([studentId, studentName, email, phone, address, gender]);
      } else {
        let index = getStudentByStudentId(studentId);
        listStudent[index][1] = studentName;
        listStudent[index][2] = email;
        listStudent[index][3] = phone;
        listStudent[index][4] = address;
        listStudent[index][5] = gender;
        document.getElementById("studentId").readOnly = false;
      }
  
      document.getElementById("studentId").value = "";
      document.getElementById("studentName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("address").value = "";
      document.getElementById("male").checked = true;
  
      renderData();
    }
  }
  
  function getStudentByStudentId(studentId) {
    for (let index = 0; index < listStudent.length; index++) {
      if (studentId == listStudent[index][0]) {
        return index;
      }
    }
    return -1;
  }
  
  function editStudent(studentId) {
    
    let index = getStudentByStudentId(studentId);
    if (index >= 0) {
     
      document.getElementById("studentId").value = listStudent[index][0];
      document.getElementById("studentName").value = listStudent[index][1];
      document.getElementById("email").value = listStudent[index][2];
      document.getElementById("phone").value = listStudent[index][3];
      document.getElementById("address").value = listStudent[index][4];
      if (listStudent[index][5] == "Male") {
        document.getElementById("male").checked = true;
      } else {
        document.getElementById("female").checked = true;
      }
  
      action = "edit";
      document.getElementById("studentId").readOnly = true;
    }
  }
  
  function deleteStudent(studentId) {
    let index = getStudentByStudentId(studentId);
    listStudent.splice(index, 1);
    renderData();
  }
  
  document.onload = renderData();
  let btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", function (event) {
    event.preventDefault();
    createOrEdit();
  });