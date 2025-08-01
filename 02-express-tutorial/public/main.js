document.getElementById('loadBtn').addEventListener('click', () => {
  fetch('/api/v1/products')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('productContainer');
      container.innerHTML = ''; // clear previous results

      data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
          <h3>${product.name}</h3>
        <!-- <img src="${product.image}" alt="${product.name}" width="150"> -->
          <p>Price: $${product.price}</p>
          <hr/>
        `;
        container.appendChild(productDiv);
      });
    })
    .catch(err => {
      console.error('Error fetching products:', err);
    });
});
