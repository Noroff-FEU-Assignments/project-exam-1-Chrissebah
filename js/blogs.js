const blogList = document.getElementById('blogList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let page = 1; // Track the current page of posts

const extractExcerpt = (content, wordCount) => {
  const words = content.split(' ');
  if (words.length > wordCount) {
    const excerpt = words.slice(0, wordCount).join(' ');
    return `${excerpt}...`;
  }
  return content;
};

const loadPosts = () => {
  fetch(`https://projectexam.onechrissebah.no/wp-json/wp/v2/posts?_embed&per_page=10&page=${page}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(blog => {
        const featuredMedia = blog._embedded && blog._embedded['wp:featuredmedia'] ? blog._embedded['wp:featuredmedia'][0] : null;
        const imageUrl = featuredMedia ? featuredMedia.source_url : 'placeholder.jpg';

        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
          <a href="blog-details.html?id=${blog.id}">
            <img src="${imageUrl}" alt="${blog.title.rendered}" width="20%" height="auto">
            <h3 class="blog-title">${blog.title.rendered}</h3>
          </a>
          <div class="blog-description">${extractExcerpt(blog.excerpt.rendered, 100)}</div>
        `;

        blogList.appendChild(blogItem);
      });

      // Increase the page count
      page++;

      // Check if there are more posts available
      if (data.length < 10) {
        loadMoreBtn.style.display = 'none'; // Hide the button if no more posts
      }
    })
    .catch(error => {
      console.error('Error fetching blog data:', error);
    });
};

const blogDescriptions = document.querySelectorAll('.blog-description');

blogDescriptions.forEach(description => {
  if (description.scrollHeight > description.clientHeight) {
    description.classList.add('expand');
  }
  
  description.addEventListener('click', () => {
    description.classList.toggle('expand');
  });
});


// Load the initial 10 posts
loadPosts();

// Event listener for the load more button
loadMoreBtn.addEventListener('click', loadPosts);

// Style for button
loadMoreBtn.style.padding = '12px 24px';
loadMoreBtn.style.backgroundColor = '#333';
loadMoreBtn.style.color = '#fff';
loadMoreBtn.style.border = 'none';
loadMoreBtn.style.cursor = 'pointer';
loadMoreBtn.style.fontSize = '18px';

// Button Hover
loadMoreBtn.style.transition = 'background-color 0.3s';

loadMoreBtn.addEventListener('mouseover', function() {
  loadMoreBtn.style.backgroundColor = '#551A8B';
});

loadMoreBtn.addEventListener('mouseout', function() {
  loadMoreBtn.style.backgroundColor = '#333';
});