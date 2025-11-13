const token = localStorage.getItem("token");
if (!token) location.href="/";

async function loadDashboard(){
  const res = await fetch("/api/dashboard", {
    headers:{"x-auth-token":token}
  });
  const d = await res.json();

  document.getElementById("stats").innerHTML = `
    <div class="stat-card"><h2>${d.total}</h2><p>Total Students</p></div>
  `;

  new Chart(document.getElementById("branchChart"), {
    type:"bar",
    data:{
      labels:d.byBranch.map(x=>x._id),
      datasets:[{data:d.byBranch.map(x=>x.count)}]
    }
  });

  document.getElementById("recent").innerHTML =
    d.latest.map(s=>`<p>${s.name} — ${s.branch}</p>`).join("");
}

function logout(){
  localStorage.removeItem("token");
  location.href="/";
}

loadDashboard();
