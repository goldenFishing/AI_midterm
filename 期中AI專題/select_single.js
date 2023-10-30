function check_submit() {   
    var userSelected = document.querySelector('input[name="chapter"]:checked');
    if (!userSelected) {
        alert("請選擇一個章節");
    }
    else {
        var chapter_selected = userSelected.value;
        localStorage.setItem('selectedChapter', chapter_selected);
        window.location.href = 'test_single.html';
    }
}

const buttonBack = document.getElementById('back_button');
buttonBack.addEventListener('click', function(){
    window.location.href = 'homePage.html';
});

var implementCounter = 1;
localStorage.setItem("implementCounter",implementCounter);