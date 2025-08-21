document.addEventListener("DOMContentLoaded", function () {
  const recordsData = JSON.parse(localStorage.getItem("records")) || [];
  const records = document.querySelector(".records");

  recordsData.forEach((record) => {
    const newdiv = document.createElement("div");
    newdiv.classList.add("newdiv");
    newdiv.innerHTML = `<p class="Name">Name: ${record.name}</p>
      <p>Student ID: ${record.id}</p>
      <p>Email: ${record.email}</p>
      <p>Contact Number: ${record.contact}</p><br>
      <button class="reset-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      <br><br><br>`;
    records.appendChild(newdiv);
  });
});

document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("student-name").value.trim();
  const ID = document.getElementById("student-id").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!/^[A-Za-z\s]+$/.test(name)) {
    alert("Student name should only contain letters and spaces.");
    return;
  }

  if (!/^\d+$/.test(ID)) {
    alert("Student ID should only contain numbers.");
    return;
  }
  if (!/^\d{5}$/.test(ID)) {
    alert("Student ID must be exactly 5 digits.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!/^\d{10}$/.test(contact)) {
    alert("Contact number must be exactly 10 digits.");
    return;
  }

  alert("Registration done successfully!");

  const records = document.querySelector(".records");
  const newdiv = document.createElement("div");
  newdiv.classList.add("newdiv");
  const content = `<p class="Name">Name: ${name}</p>
    <p>Student ID: ${ID}</p>
    <p>Email: ${email}</p>
    <p>Contact Number: ${contact}</p><br>
    <button class="reset-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    <br><br><br>`;
  newdiv.insertAdjacentHTML("beforeend", content);
  records.appendChild(newdiv);
  const existingRecords = JSON.parse(localStorage.getItem("records")) || [];
  existingRecords.push({ name, id: ID, email, contact });
  localStorage.setItem("records", JSON.stringify(existingRecords));
  e.target.reset();
});

const records = document.querySelector(".records");
records.addEventListener("click", function (e) {
  const newdiv = e.target.closest(".newdiv");
  if (!newdiv) return;

  let existingRecords = JSON.parse(localStorage.getItem("records")) || [];

  const paragraphs = newdiv.querySelectorAll("p");
  const ID = paragraphs[1].textContent.replace("Student ID:", "").trim();
  if (e.target.classList.contains("delete-btn")) {
    const newdiv = e.target.closest(".newdiv");
    if (newdiv) {
      newdiv.remove();
      existingRecords = existingRecords.filter((record) => record.id !== ID);
      localStorage.setItem("records", JSON.stringify(existingRecords));
    }
  } else if (e.target.classList.contains("reset-btn")) {
    const newdiv = e.target.closest(".newdiv");
    if (newdiv) {
      const paragraphs = newdiv.querySelectorAll("p");
      const name = paragraphs[0].textContent.replace("Name:", "").trim();
      const ID = paragraphs[1].textContent.replace("Student ID:", "").trim();
      const email = paragraphs[2].textContent.replace("Email:", "").trim();
      const contact = paragraphs[3].textContent
        .replace("Contact Number:", "")
        .trim();
      document.getElementById("student-name").value = name;
      document.getElementById("student-id").value = ID;
      document.getElementById("email").value = email;
      document.getElementById("contact").value = contact;
      newdiv.remove();
      existingRecords = existingRecords.filter((record) => record.id !== ID);
      localStorage.setItem("records", JSON.stringify(existingRecords));
    }
  }
});
function alphabetsOnly(event) {
  const key = event.key;
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
  ];
}
