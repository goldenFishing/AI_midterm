// 獲取選擇框元素
const options = document.getElementById('options');
// 獲取顯示結果的元素
const resultElement = document.getElementById('result');

// 添加事件監聽器，當選擇框的值改變時觸發
options.addEventListener('change', function() {
  // 獲取選擇框的選擇值
  const selectedOption = options.value;
  
  // 根據選擇值顯示不同的結果
  switch(selectedOption) {
    case 'a':
      resultElement.textContent = '你選擇了選項 A';
      break;
    case 'b':
      resultElement.textContent = '你選擇了選項 B';
      break;
    case 'c':
      resultElement.textContent = '你選擇了選項 C';
      break;
    default:
      resultElement.textContent = '請選擇一個選項';
  }
});

