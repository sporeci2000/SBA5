const postArea = document.getElementById("post-area");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");
const postsDisplay = document.getElementById("posts-display");

let postsArray = [];

let editedPost = null;

function generateId() {
    return Date.now();
}

// Load saved posts on page load
function loadPosts() {
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
        postsArray = JSON.parse(savedPosts);
        renderPosts();
    }
}

document.addEventListener("DOMContentLoaded", loadPosts);

//Render Posts Function
function renderPosts() {
    postsDisplay.innerHTML = "";

    postsArray.forEach(post => {
        const blogPost = document.createElement("li");
        blogPost.classList.add("post");
        blogPost.setAttribute("data-id", post.id);

        const postTitle = document.createElement("h3");
        postTitle.textContent = post.title;

        const postContent = document.createElement("p");
        postContent.textContent = post.content;

        const postTimestamp = document.createElement("small");
        postTimestamp.textContent = `Posted on: ${post.timestamp}`;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editPost(post.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deletePost(post.id));

        blogPost.appendChild(postTitle);
        blogPost.appendChild(postContent);
        blogPost.appendChild(postTimestamp);
        blogPost.appendChild(editBtn);
        blogPost.appendChild(deleteBtn);

        postsDisplay.appendChild(blogPost);
    });
}

//Edit Button
function editPost(postId) {
    const postToEdit = postsArray.find(post => post.id === postId);

    if (postToEdit) {
        titleInput.value = postToEdit.title;
        contentInput.value = postToEdit.content;
        editedPost = postToEdit;
    }
}

//Delete button
function deletePost(postId) {

    for (let i = 0; i < postsArray.length; i++) {
        if (postsArray[i].id === postId) {
            postsArray.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("blogPosts", JSON.stringify(postsArray));
    renderPosts();
}

//Edit button


//Validate inputs function
function validateFormInputs() {
    let validForm = true;

    titleError.textContent = "";
    contentError.textContent = "";

    if (titleInput.value.trim() === "") {
        titleError.textContent = "Title is required!";
        validForm = false;
    }

    if (contentInput.value.trim() === "") {
        contentError.textContent = "Content is required";
        validForm = false;
    }

    return validForm;
}


//Gotm submission event listener
postArea.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateFormInputs()) {
        return;
    }
    if (editedPost) {
        editedPost.title = titleInput.value.trim();
        editedPost.content = contentInput.value.trim();
        editedPost.timestamp = new Date().toLocaleString();
        editedPost = null;
    }
    else {


        const newPostBlog = {
            id: generateId(),
            title: titleInput.value.trim(),
            content: contentInput.value.trim(),
            timestamp: new Date().toLocaleString()
        };

        postsArray.push(newPostBlog);
    }
    localStorage.setItem("blogPosts", JSON.stringify(postsArray));

    renderPosts();

    titleInput.value = "";
    contentInput.value = "";
});



