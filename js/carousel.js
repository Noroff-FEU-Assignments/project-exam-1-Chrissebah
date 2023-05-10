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
        `;
        carousel.appendChild(item);
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

    showItems();

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.addEventListener('click', showPreviousItems);
    nextBtn.addEventListener('click', showNextItems);
  });