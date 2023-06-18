let students = [];
let editingIndex = -1;

function renderStudentTable() {
  let table = document.getElementById("studentTable");

  // Xóa tất cả các hàng trong bảng
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Thêm các sinh viên vào bảng
  for (let i = 0; i < students.length; i++) {
    let student = students[i];

    let row = table.insertRow(-1);
    row.insertCell().innerHTML = student.id;
    row.insertCell().innerHTML = student.name;
    row.insertCell().innerHTML = student.gender;
    row.insertCell().innerHTML = student.hometown;
    row.insertCell().innerHTML = student.email;
    row.insertCell().innerHTML = student.city12;
    row.insertCell().innerHTML = student.district12;
    row.insertCell().innerHTML = student.graduationYear;

    let editButton = document.createElement("button");
    editButton.innerHTML = "Sửa";
    editButton.setAttribute("data-index", i);
    editButton.onclick = function () {
      let index = parseInt(this.getAttribute("data-index"));
      editStudent(index);
    };
    row.insertCell().appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Xoá";
    deleteButton.onclick = (function (index) {
      return function () {
        showDeleteConfirmation(index);
      };
    })(i);
    row.insertCell().appendChild(deleteButton);
  }
}

function addStudent() {
  let id = document.getElementById("studentId").value;
  let name = document.getElementById("studentName").value;
  let gender = document.getElementById("studentGender").value;
  let hometown = document.getElementById("studentHometown").value;
  let email = document.getElementById("studentEmail").value;
  let city12 = document.getElementById("studentCity12").value;
  let district12 = document.getElementById("studentDistrict12").value;
  let graduationYear = document.getElementById("studentGraduationYear").value;

  if (editingIndex === -1) {
    let student = {
      id: id,
      name: name,
      gender: gender,
      hometown: hometown,
      email: email,
      city12: city12,
      district12: district12,
      graduationYear: graduationYear
    };

    students.push(student);
  } else {
    let student = students[editingIndex];
    student.id = id;
    student.name = name;
    student.gender = gender;
    student.hometown = hometown;
    student.email = email;
    student.city12 = city12;
    student.district12 = district12;
    student.graduationYear = graduationYear;

    // Reset editingIndex
    editingIndex = -1;
  }

  // Reset form fields
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("studentGender").value = "";
  document.getElementById("studentHometown").value = "";
  document.getElementById("studentEmail").value = "";
  document.getElementById("studentCity12").value = "";
  document.getElementById("studentDistrict12").value = "";
  document.getElementById("studentGraduationYear").value = "";

  renderStudentTable();
}

function editStudent(index) {
  let student = students[index];

  // Populate form fields with student information
  document.getElementById("studentId").value = student.id;
  document.getElementById("studentName").value = student.name;
  document.getElementById("studentGender").value = student.gender;
  document.getElementById("studentHometown").value = student.hometown;
  document.getElementById("studentEmail").value = student.email;
  document.getElementById("studentCity12").value = student.city12;
  document.getElementById("studentDistrict12").value = student.district12;
  document.getElementById("studentGraduationYear").value = student.graduationYear;

  // Set editingIndex to the current index
  editingIndex = index;
}

function showDeleteConfirmation(index) {
  let confirmation = confirm("Bạn có muốn xoá sinh viên không?");

  if (confirmation) {
    deleteStudent(index);
  }
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderStudentTable();
}

// Gọi hàm renderStudentTable() lần đầu để hiển thị bảng sinh viên ban đầu
renderStudentTable();