// code for the copyright
let copyright = document.getElementById("copyright");
let year = new Date().getFullYear();

copyright.innerHTML = `&copy; ${year} News App`;

// Function to set the copyright year dynamically
function setCopyright(title) {
  let copyright = document.getElementById("copyright");
  let year = new Date().getFullYear();
  copyright.innerHTML = `&copy; ${year} ${title}`;
}

export default setCopyright;
