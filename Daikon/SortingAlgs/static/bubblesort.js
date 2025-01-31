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
    
    // Measure execution time of bubble sort before visualization
    const arrayCopy = [...originalArray];
    const startTime = performance.now();
    const sortedArray = bubbleSort(arrayCopy, order);
    const endTime = performance.now();
    const processTime = (endTime - startTime).toFixed(2);
    
    document.getElementById("sorted-array").value = sortedArray.join(", ");
    document.getElementById("process-time").value = `${processTime} ms`;
    visualizeBubbleSort([...originalArray], order); // Ensure visualization starts in the entered order
});  

document.getElementById("speed").addEventListener("input", function () {
  speed = 2100 - this.value;
});

function bubbleSort(array, order) {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if ((order === "ascending" && array[j] > array[j + 1]) ||
          (order === "descending" && array[j] < array[j + 1])) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}

function visualizeBubbleSort(array, order) {
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
      let j = 0;

      function bubble() {
        if (j < n - i - 1) {
          slots[j].classList.add("compare");
          slots[j + 1].classList.add("compare");
          
          setTimeout(() => {
            if ((order === "ascending" && parseInt(slots[j].textContent) > parseInt(slots[j + 1].textContent)) ||
                (order === "descending" && parseInt(slots[j].textContent) < parseInt(slots[j + 1].textContent))) {
              shiftElements(j, j + 1, () => {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Sync logic with visualization
                slots[j].classList.remove("compare");
                slots[j + 1].classList.remove("compare");
                j++;
                setTimeout(bubble, speed / 2);
              });
            } else {
              slots[j].classList.remove("compare");
              slots[j + 1].classList.remove("compare");
              j++;
              setTimeout(bubble, speed / 2);
            }
          }, speed / 2);
        } else {
          slots[n - i - 1].classList.add("sorted");
          i++;
          setTimeout(step, speed);
        }
      }
      bubble();
    } else {
      slots.forEach(slot => slot.classList.add("sorted"));
    }
  }
  step();
}

function shiftElements(index1, index2, callback) {
  let slots = document.querySelectorAll(".slot");
  let slot1 = slots[index1];
  let slot2 = slots[index2];

  slot1.classList.add("swap");
  slot2.classList.add("swap");

  slot1.style.transform = "translateX(40px)";
  slot2.style.transform = "translateX(-40px)";

  setTimeout(() => {
    [slot1.textContent, slot2.textContent] = [slot2.textContent, slot1.textContent];
    slot1.style.transform = "translateX(0)";
    slot2.style.transform = "translateX(0)";

    slot1.classList.remove("swap");
    slot2.classList.remove("swap");

    if (callback) callback();
  }, speed / 2);
}
