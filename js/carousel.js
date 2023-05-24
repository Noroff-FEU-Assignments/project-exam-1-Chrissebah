fetch('https://projectexam.onechrissebah.no/wp-json/wp/v2/posts?_embed&per_page=12')
  .then(response => response.json())
  .then(data => {
    const carousel = document.getElementById('carousel');
    const itemsPerPage = 4;
    let currentPage = 0;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    function showItems() {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      carousel.innerHTML = '';

      for (let i = startIndex; i < endIndex; i++) {
        if (i >= data.length) {
          break;
        }

        const post = data[i];
        const item = document.createElement('div');
        item.innerHTML = `
          <h3>${post.title.rendered}</h3>
          <p>${post.excerpt.rendered}</p>
          <button class="read-more-btn">Read More</button>
        `;
        carousel.appendChild(item);
      }
      
      updatePageCounter();

      // Add event listeners to the buttons
      const buttons = document.getElementsByClassName('read-more-btn');
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', () => {
          navigateToBlog(data[startIndex + i].id);
        });
        button.style.padding = '10px 20px';
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.border = '1px solid black';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.transition = 'background-color 0.3s';
        button.addEventListener('mouseenter', () => {
          button.style.backgroundColor = '#333';
          button.style.color = '#fff';
        });
        button.addEventListener('mouseleave', () => {
          button.style.backgroundColor = 'white';
          button.style.color = 'black';
        });
      }
    }

    function showPreviousItems() {
      currentPage--;
      if (currentPage < 0) {
        currentPage = totalPages - 1;
      }
      showItems();
    }

    function showNextItems() {
      currentPage++;
      if (currentPage >= totalPages) {
        currentPage = 0;
      }
      showItems();
    }

    function updatePageCounter() {
      const pageCounter = document.getElementById('pageCounter');
      pageCounter.innerText = `Page ${currentPage + 1} of ${totalPages}`;
    }

    function navigateToBlog(blogId) {
      window.location.href = `blog-details.html?id=${blogId}`;
    }

    showItems();

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.addEventListener('click', showPreviousItems);
    nextBtn.addEventListener('click', showNextItems);
  });