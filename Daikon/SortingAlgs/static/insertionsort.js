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
    
    // Measure execution time of insertion sort before visualization
    const startTime = performance.now();
    const sortedArray = insertionSort([...originalArray], order);
    const endTime = performance.now();
    const processTime = (endTime - startTime).toFixed(2);
    
    document.getElementById("sorted-array").value = sortedArray.join(", ");
    document.getElementById("process-time").value = `${processTime} ms`;
    visualizeInsertionSort([...originalArray], order);
});  

document.getElementById("speed").addEventListener("input", function () {
  speed = 2100 - this.value;
});

function insertionSort(array, order) {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && ((order === "ascending" && array[j] > key) || 
                      (order === "descending" && array[j] < key))) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  return array;
}

function visualizeInsertionSort(array, order) {
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
  let i = 1;

  function step() {
    if (i < n) {
      let key = array[i];
      let j = i - 1;
      let keySlot = slots[i];
      keySlot.classList.add("swap");

      function shiftElements() {
        if (j >= 0 && ((order === "ascending" && parseInt(slots[j].textContent) > key) || 
                        (order === "descending" && parseInt(slots[j].textContent) < key))) {
          slots[j].classList.add("compare");
          slots[j + 1].classList.add("compare");
          setTimeout(() => {
            slots[j + 1].style.transform = "translateX(-40px)";
            slots[j].style.transform = "translateX(40px)";
          }, speed / 4);
          setTimeout(() => {
            [slots[j + 1].textContent, slots[j].textContent] = [slots[j].textContent, slots[j + 1].textContent];
            slots[j + 1].style.transform = "translateX(0)";
            slots[j].style.transform = "translateX(0)";
            slots[j].classList.remove("compare");
            slots[j + 1].classList.remove("compare");
            j--;
            shiftElements();
          }, speed / 2);
        } else {
          slots[j + 1].textContent = key;
          keySlot.classList.remove("swap");
          slots[j + 1].classList.add("sorted");
          i++;
          setTimeout(step, speed);
        }
      }
      shiftElements();
    } else {
      slots.forEach(slot => slot.classList.add("sorted"));
    }
  }
  step();
}
