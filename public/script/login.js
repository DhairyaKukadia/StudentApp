async function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username,password})
  });

  const d = await res.json();

  if (d.token){
    localStorage.setItem("token", d.token);
    window.location.href="/dashboard";
  } else {
    document.getElementById("msg").innerText="Invalid credentials";
  }
}
