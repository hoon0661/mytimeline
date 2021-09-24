function isValidContents(contents) {
    if (contents == '') {
        alert('Please type your memo.');
        return false;
    }
    if (contents.trim().length > 140) {
        alert('Your memo cannot be more than 140 letters.');
        return false;
    }
    return true;
}


function genRandomName(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        let number = Math.random() * charactersLength;
        let index = Math.floor(number);
        result += characters.charAt(index);
    }
    return result;
}

function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}


$(document).ready(function () {
    getMessages();
})


function getMessages() {
    $("#cards-box").empty();
    $.ajax({
        type: "GET",
        url: "/api/memos",
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let memo = response[i];
                addHTML(memo.id, memo.username, memo.contents, memo.modifiedAt);
            }
        }
    });
}


function addHTML(id, username, contents, modifiedAt) {
    let tempHtml = `
        <div class="card">            
            <div class="metadata">
                <div class="date">
                    ${modifiedAt}
                </div>
                <div id="${id}-username" class="username">
                    ${username}
                </div>
            </div>
                 
            <div class="contents">
                <div id="${id}-contents" class="text">
                    ${contents}
                </div>
                <div id="${id}-editarea" class="edit">
                    <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                </div>
            </div>
                   
            <div class="footer">
                <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
            </div>
        </div>
    `;

    $('#cards-box').append(tempHtml);
}


function writePost() {
    let contents = $("#contents").val();
    if (isValidContents(contents) == false) {
        return;
    }
    let username = genRandomName(10);
    let data = {"username": username, "contents": contents};
    $.ajax({
        type: "POST",
        url: "/api/memos",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("Message has been created successfully.");
            window.location.reload();
        }
    })
}


function submitEdit(id) {
    let username = $(`#${id}-username`).text().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    if (isValidContents(contents) == false) {
        return;
    }
    let data = {"username": username, "contents": contents};
    $.ajax({
        type: "PUT",
        url: `api/memos/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("Memo has been updated successfully.");
            window.location.reload();
        }
    })
}


function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/memos/${id}`,
        success: function (response) {
            alert("Memo has been deleted.");
            window.location.reload();
        }
    })
}
