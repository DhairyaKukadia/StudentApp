const token2 = localStorage.getItem("token");
if (!token2) location.href="/";

async function addStudent(){
  const student = {
    name: name.value,
    roll: roll.value,
    branch: branch.value,
    email: email.value
  };

  await fetch("/api/students",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "x-auth-token":token2
    },
    body:JSON.stringify(student)
  });

  loadStudents();
}

async function loadStudents(){
  const search = document.getElementById("search").value;

  const res = await fetch(`/api/students?search=${search}`, {
    headers:{"x-auth-token":token2}
  });

  const {students} = await res.json();

  studentList.innerHTML = students.map(s=>`
    <div class="card">
      <h3>${s.name}</h3>
      <p>${s.roll} — ${s.branch}</p>

      <button class="btn-edit" onclick="editStudent('${s._id}')">Edit</button>
      <button class="btn-delete" onclick="deleteStudent('${s._id}')">Delete</button>
      <button onclick="openAttendance('${s._id}','${s.name}')">Attendance</button>
    </div>
  `).join("");
}

async function deleteStudent(id){
  await fetch(`/api/students/${id}`,{
    method:"DELETE",
    headers:{"x-auth-token":token2}
  });
  loadStudents();
}

async function editStudent(id){
  const name = prompt("New Name:");
  const roll = prompt("New Roll:");
  const branch = prompt("New Branch:");

  await fetch(`/api/students/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "x-auth-token":token2
    },
    body:JSON.stringify({name,roll,branch})
  });

  loadStudents();
}

// Attendance
let currentStudentId = null;

function openAttendance(id,name){
  currentStudentId = id;
  attStudentName.innerText = name;
  attendanceBox.style.display="block";
}

function closeAttendance(){
  attendanceBox.style.display="none";
}

async function submitAttendance(){
  const status = attStatus.value;
  const date = attDate.value;

  await fetch("/api/attendance/mark",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "x-auth-token":token2
    },
    body:JSON.stringify({studentId:currentStudentId,status,date})
  });

  alert("Attendance marked");
  closeAttendance();
}

function exportCSV(){
  window.location.href="/api/export/students";
}

function logout(){
  localStorage.removeItem("token");
  location.href="/";
}

loadStudents();
