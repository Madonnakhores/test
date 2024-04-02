
fetch('https://jsonplaceholder.typicode.com/users')
 .then(response => response.json())
 .then(users => {
   const tabsContainer = document.querySelector('#tabs ul');
   const contentContainer = document.querySelector('#content');
   users.forEach((user,index) => {
     const tabItem = createTabItem(user.name);
     tabItem.addEventListener('click', () => displayUserPosts(user.id, contentContainer));
     if (index === 0) {
        displayUserPosts(user.id, contentContainer);
      }
     tabsContainer.appendChild(tabItem);
   });
 })
 .catch(error => console.error(error));
//  create tab item
function createTabItem(name) {
 const tabItem = document.createElement('li');
 const tabLink = document.createElement('a');
 tabLink.textContent = name;
 tabLink.href = '#';
 tabItem.appendChild(tabLink);
 return tabItem;
}
// display user posts
async function displayUserPosts(userId, contentContainer) {
 const posts = await fetchPostsByUserId(userId);
 const postsList = createPostsList(posts);
 clearContentContainer(contentContainer);
 contentContainer.appendChild(postsList);
}
//  fetch posts by user ID
async function fetchPostsByUserId(userId) {
 const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
 return await response.json();
}
// create posts list
function createPostsList(posts) {
 const postsList = document.createElement('ul');
 posts.forEach(post => {
   const listItem = createPostListItem(post.title);
   postsList.appendChild(listItem);
 });
 return postsList;
}
// create post list item
function createPostListItem(title) {
 const listItem = document.createElement('li');
 listItem.textContent = title;
 return listItem;
}
//  clear content container
function clearContentContainer(contentContainer) {
 contentContainer.innerHTML = '';
}