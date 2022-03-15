window.addEventListener("load", () => {
  const tableElement = document.getElementById("table-component");

  tableElement?.addEventListener("click", (e) => {
    console.log(e.target);
  });
});
