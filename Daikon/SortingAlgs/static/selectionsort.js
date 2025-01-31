let speed = 1000; // Default speed

document.getElementById("run-visualize-button").addEventListener("click", function () {
    const arrayInput = document.getElementById("array").value;
    const order = document.querySelector('input[name="order"]:checked').value;
  
    if (!arrayInput) {
      alert("Please enter an array.");
      return;
    }
  
    const originalArray = arrayInput.split(/[,\s]+/).map(Number);
    document.getElementById("process-time").value = "Calculating...";
    
    // Measure execution time of selection sort before visualization
    const startTime = performance.now();
    const sortedArray = selectionSort([...originalArray], order);
    const endTime = performance.now();
    const processTime = (endTime - startTime).toFixed(2);
    
    document.getElementById("sorted-array").value = sortedArray.join(", ");
    document.getElementById("process-time").value = `${processTime} ms`;
    visualizeSelectionSort([...originalArray], order);
});  

document.getElementById("speed").addEventListener("input", function () {
  speed = 2100 - this.value;
});

function selectionSort(array, order) {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if ((order === "ascending" && array[j] < array[minIdx]) ||
          (order === "descending" && array[j] > array[minIdx])) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }
  return array;
}

function visualizeSelectionSort(array, order) {
  const visualizationArea = document.getElementById("visualization-area");
  visualizationArea.innerHTML = "";

  array.forEach((value) => {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.textContent = value;
    visualizationArea.appendChild(slot);
  });

  const slots = document.querySelectorAll(".slot");
  let n = array.length;
  let i = 0;

  function step() {
    if (i < n - 1) {
      let minIdx = i;
      let j = i + 1;

      slots[minIdx].classList.add("current-min"); // Highlight initial min

      function findMin() {
        if (j < n) {
          slots[j].classList.add("compare");
          
          setTimeout(() => {
            if ((order === "ascending" && array[j] < array[minIdx]) || 
                (order === "descending" && array[j] > array[minIdx])) {
              
              slots[minIdx].classList.remove("current-min"); // Remove old min highlight
              minIdx = j;
              slots[minIdx].classList.add("current-min"); // Highlight new min
            }

            slots[j].classList.remove("compare");
            j++;
            setTimeout(findMin, speed / 2);
          }, speed / 2);
        } else {
          if (minIdx !== i) {
            slots[i].classList.add("swap");
            slots[minIdx].classList.add("swap");
            
            setTimeout(() => {
              slots[i].style.transform = "translateX(40px)";
              slots[minIdx].style.transform = "translateX(-40px)";
            }, speed / 4);
            
            setTimeout(() => {
              [array[i], array[minIdx]] = [array[minIdx], array[i]];
              [slots[i].textContent, slots[minIdx].textContent] = [slots[minIdx].textContent, slots[i].textContent];

              slots[i].style.transform = "translateX(0)";
              slots[minIdx].style.transform = "translateX(0)";
              slots[i].classList.remove("swap");
              slots[minIdx].classList.remove("swap");
              slots[i].classList.add("sorted");

              slots[minIdx].classList.remove("current-min"); // Remove min highlight
              i++;
              setTimeout(step, speed);
            }, speed / 2);
          } else {
            slots[i].classList.add("sorted");
            slots[minIdx].classList.remove("current-min"); // Remove min highlight
            i++;
            setTimeout(step, speed);
          }
        }
      }
      findMin();
    } else {
      slots[n - 1].classList.add("sorted");
    }
  }
  step();
}

