document.addEventListener('DOMContentLoaded', function() {
  // Home button functionality
  const homeButton = document.getElementById('homeButton');
  if (homeButton) {
    homeButton.addEventListener('click', function() {
      window.location.href = '/';
    });
  }
  
  // Elements
  const leftBox = document.getElementById('leftBox');
  const rightBox = document.getElementById('rightBox');
  const resultBox = document.getElementById('resultBox');
  const leftDisplay = document.getElementById('leftDisplay');
  const rightDisplay = document.getElementById('rightDisplay');
  const resultDisplay = document.getElementById('resultDisplay');
  const operationDisplay = document.getElementById('operationDisplay');
  const operationSymbol = document.getElementById('operationSymbol');
  const checkButton = document.getElementById('checkButton');
  const resetButton = document.getElementById('resetButton');
  const toast = document.getElementById('toast');
  const toastContent = document.getElementById('toastContent');
  
  // Operation buttons
  const addButton = document.getElementById('addButton');
  const subtractButton = document.getElementById('subtractButton');
  const multiplyButton = document.getElementById('multiplyButton');
  const divideButton = document.getElementById('divideButton');
  
  // Draggable items
  const butterflyItem = document.getElementById('butterflyItem');
  const flowerItem = document.getElementById('flowerItem');
  
  // State
  let leftBoxItems = 0;
  let rightBoxItems = 0;
  let currentOperation = 'multiply';
  let leftItemType = '';
  let rightItemType = '';
  
  // Operation button event listeners
  addButton.addEventListener('click', () => setOperation('add', '+'));
  subtractButton.addEventListener('click', () => setOperation('subtract', '-'));
  multiplyButton.addEventListener('click', () => setOperation('multiply', '×'));
  divideButton.addEventListener('click', () => setOperation('divide', '÷'));
  
  // Set active operation
  function setOperation(operation, symbol) {
    currentOperation = operation;
    operationDisplay.textContent = symbol;
    operationSymbol.textContent = symbol;
    
    // Remove active class from all buttons
    [addButton, subtractButton, multiplyButton, divideButton].forEach(button => {
      button.classList.remove('active');
    });
    
    // Add active class to clicked button
    switch (operation) {
      case 'add':
        addButton.classList.add('active');
        break;
      case 'subtract':
        subtractButton.classList.add('active');
        break;
      case 'multiply':
        multiplyButton.classList.add('active');
        break;
      case 'divide':
        divideButton.classList.add('active');
        break;
    }
    
    updateCalculation();
  }
  
  // Make items draggable
  function setupDraggable(element, itemType) {
    element.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', itemType);
    });
  }
  
  setupDraggable(butterflyItem, 'butterfly');
  setupDraggable(flowerItem, 'flower');
  
  // Setup drop zones
  function setupDropZone(element, itemSetter, displayElement, itemType) {
    element.addEventListener('dragover', (e) => {
      e.preventDefault();
      element.classList.add('is-over');
    });
    
    element.addEventListener('dragleave', () => {
      element.classList.remove('is-over');
    });
    
    element.addEventListener('drop', (e) => {
      e.preventDefault();
      element.classList.remove('is-over');
      
      const droppedItemType = e.dataTransfer.getData('text/plain');
      
      if (itemType === 'left') {
        if (!leftItemType) leftItemType = droppedItemType;
        leftBoxItems++;
        addItemToBox(element, droppedItemType, leftBoxItems);
        displayElement.textContent = leftBoxItems;
      } else if (itemType === 'right') {
        if (!rightItemType) rightItemType = droppedItemType;
        rightBoxItems++;
        addItemToBox(element, droppedItemType, rightBoxItems);
        displayElement.textContent = rightBoxItems;
      }
      
      updateCalculation();
    });
    
    // Add manual remove button
    element.addEventListener('click', () => {
      if (itemType === 'left' && leftBoxItems > 0) {
        leftBoxItems--;
        displayElement.textContent = leftBoxItems;
        removeLastItem(element);
        if (leftBoxItems === 0) leftItemType = '';
      } else if (itemType === 'right' && rightBoxItems > 0) {
        rightBoxItems--;
        displayElement.textContent = rightBoxItems;
        removeLastItem(element);
        if (rightBoxItems === 0) rightItemType = '';
      }
      
      updateCalculation();
    });
  }
  
  setupDropZone(leftBox, (items) => leftBoxItems = items, leftDisplay, 'left');
  setupDropZone(rightBox, (items) => rightBoxItems = items, rightDisplay, 'right');
  
  // Update the addItemToBox function
  function addItemToBox(boxElement, itemType, count) {
    const item = document.createElement('div');
    item.className = `box-item ${itemType}-box-item`;
    
    if (boxElement === resultBox) {
      // For result box, just append without absolute positioning
      boxElement.appendChild(item);
    } else {
      // For left and right boxes, keep random positioning
      const boxWidth = boxElement.offsetWidth;
      const boxHeight = boxElement.offsetHeight;
      const itemWidth = 40;
      const itemHeight = 40;
      
      const maxX = boxWidth - itemWidth;
      const maxY = boxHeight - itemHeight;
      
      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);
      
      item.style.left = `${randomX}px`;
      item.style.top = `${randomY}px`;
      
      boxElement.appendChild(item);
    }
  }
  
  // Remove last item from box
  function removeLastItem(boxElement) {
    const items = boxElement.querySelectorAll('.box-item');
    if (items.length > 0) {
      boxElement.removeChild(items[items.length - 1]);
    }
  }
  
  // Update calculation
  function updateCalculation() {
    resultBox.innerHTML = '';
    
    if (leftBoxItems === 0 || rightBoxItems === 0) {
      resultDisplay.textContent = '0';
      return;
    }
    
    let result;
    
    switch (currentOperation) {
      case 'add':
        result = leftBoxItems + rightBoxItems;
        break;
      case 'subtract':
        result = Math.max(0, leftBoxItems - rightBoxItems);
        break;
      case 'multiply':
        result = leftBoxItems * rightBoxItems;
        break;
      case 'divide':
        result = rightBoxItems !== 0 ? Math.floor(leftBoxItems / rightBoxItems) : 'Erro';
        break;
      default:
        result = 0;
    }
    
    resultDisplay.textContent = result;
    
    // Add items to result box
    if (typeof result === 'number' && result > 0) {
      // First half with first item type
      const firstType = leftItemType || 'flower';
      const secondType = rightItemType || 'rose';
      
      const firstHalfCount = Math.ceil(result / 2);
      const secondHalfCount = Math.floor(result / 2);
      
      for (let i = 0; i < firstHalfCount; i++) {
        addItemToBox(resultBox, firstType, i);
      }
      
      // Second half with second item type
      for (let i = 0; i < secondHalfCount; i++) {
        addItemToBox(resultBox, secondType, i + firstHalfCount);
      }
    }
  }
  
  // Show toast message
  function showToast(message, type = 'info') {
    toastContent.textContent = message;
    toastContent.className = `toast-content toast-${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Check button
  checkButton.addEventListener('click', () => {
    let expected;
    
    switch (currentOperation) {
      case 'add':
        expected = leftBoxItems + rightBoxItems;
        break;
      case 'subtract':
        expected = Math.max(0, leftBoxItems - rightBoxItems);
        break;
      case 'multiply':
        expected = leftBoxItems * rightBoxItems;
        break;
      case 'divide':
        expected = rightBoxItems !== 0 ? Math.floor(leftBoxItems / rightBoxItems) : null;
        break;
    }
    
    const result = parseFloat(resultDisplay.textContent);
    
    if (expected === result) {
      showToast('Parabéns! Sua resposta está correta.', 'success');
    } else {
      showToast('Tente novamente. A resposta não está correta.', 'error');
    }
  });
  
  // Reset button
  resetButton.addEventListener('click', () => {
    leftBoxItems = 0;
    rightBoxItems = 0;
    leftItemType = '';
    rightItemType = '';
    leftDisplay.textContent = '0';
    rightDisplay.textContent = '0';
    resultDisplay.textContent = '0';
    leftBox.innerHTML = '';
    rightBox.innerHTML = '';
    resultBox.innerHTML = '';
    showToast('Calculadora reiniciada.', 'info');
  });
});
