// script.js
document.addEventListener('DOMContentLoaded', () => {
    const page1Link = document.getElementById('page1-link');
    const page2Link = document.getElementById('page2-link');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
  
    // Show Page 1 and hide Page 2
    page1Link.addEventListener('click', (e) => {
      e.preventDefault();
      page1.classList.remove('hidden');
      page2.classList.add('hidden');
    });
  
    // Show Page 2 and hide Page 1
    page2Link.addEventListener('click', (e) => {
      e.preventDefault();
      page2.classList.remove('hidden');
      page1.classList.add('hidden');
    });

    const itemsContainer = document.getElementById('items-container');
    const addItemButton = document.getElementById('add-item');
    let itemIndex = 0;

    function add_item() {
      itemIndex++;
    
      const newItemEntry = document.createElement('div');
      newItemEntry.classList.add('item-entry');
      newItemEntry.innerHTML = `
        <label for="item-name-${itemIndex}">Code:</label>
        <input type="text" id="item-name-${itemIndex}" name="item-name" required>
        
        <label for="count-${itemIndex}">Qty:</label>
        <input type="number" id="count-${itemIndex}" name="count" required>
    
        <button type="button" class="remove-item">Remove</button>
      `;
    
      // Attach remove logic to the button
      newItemEntry.querySelector('.remove-item').addEventListener('click', () => {
        newItemEntry.remove();
      });
    
      itemsContainer.appendChild(newItemEntry);
    }

    addItemButton.addEventListener('click', add_item);

    document.getElementById('receipt-form').addEventListener('submit', function (e) {
      // Let the browser submit the form normally
    });

    // document.getElementById('receipt-form').addEventListener('submit', async function (e) {
    //   e.preventDefault();
    
    //   const entries = document.querySelectorAll('.item-entry');
    //   const productData = [];
    
    //   entries.forEach(entry => {
    //     const name = entry.querySelector('input[type="text"]').value.trim();
    //     const count = entry.querySelector('input[type="number"]').value.trim();
    //     if (name && count) {
    //       productData.push({ name, count: parseInt(count) });
    //     }
    //   });
    
    //   try {
    //     const response = await fetch('/generate_receipt', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ products: productData })
    //     });
    
    //     if (response.ok) {
    //       const result = await response.json();
    //       alert("Submission successful: " + result.message);
    //     } else {
    //       alert("Submission failed: " + response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Error submitting form:", error);
    //     alert("An error occurred while submitting the form.");
    //   }
    // });



  });