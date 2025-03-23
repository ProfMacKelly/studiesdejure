function toggleText(element) {
    let hiddenText = element.previousElementSibling;
    
    if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
        hiddenText.style.display = "inline";
        element.textContent = " ⬅"; // Change ellipsis to collapse symbol
    } else {
        hiddenText.style.display = "none";
        element.textContent = ". . ."; // Restore ellipsis
    }
}