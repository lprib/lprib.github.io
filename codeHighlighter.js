window.onload = function () {
    var items = document.querySelectorAll(".codeblock > pre");

    items.forEach(function (item) {
        let words = item.parentElement.getAttribute("keywords").split(" ");
        var innerText = item.innerHTML;
        words.forEach(function (word) {
            // manual html templating: SAD!
            innerText = innerText.replaceAll(word, "<span class='code-keyword'>" + word + "</span>");
            console.log(innerText);
        });
        item.innerHTML = innerText;
    });
}