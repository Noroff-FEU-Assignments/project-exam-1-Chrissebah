const blogDetails = document.getElementById('blogDetails');
const params = new URLSearchParams(window.location.search);
const blogId = params.get('id');

fetch(`https://projectexam.onechrissebah.no/wp-json/wp/v2/posts/${blogId}?_embed`)
  .then(response => response.json())
  .then(data => {
    const blog = data;
    const featuredMedia = blog._embedded && blog._embedded['wp:featuredmedia'] ? blog._embedded['wp:featuredmedia'][0] : null;
    const imageUrl = featuredMedia ? featuredMedia.source_url : 'placeholder.jpg';

    const blogItem = document.createElement('div');
    blogItem.classList.add('blog-item');
    blogItem.innerHTML = `
      <img src="${imageUrl}" alt="${blog.title.rendered}" width="20%" height="auto" onclick="openModal(this)">
      <h2 class="blog-title">${blog.title.rendered}</h2>
      <div class="blog-content">${blog.content.rendered}</div>
    `;

    blogDetails.appendChild(blogItem);
  })
  .catch(error => {
    console.error('Error fetching blog details:', error);
  });

  function openModal(img) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    modalImg.src = img.src;
    modal.style.display = 'block';
    modal.onclick = function(event) {
      if (event.target === modal) {
        closeModal();
      }
    };
  }

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}