let speed = 1000; // Default speed

document.getElementById("run-visualize-button").addEventListener("click", function () {
    const arrayInput = document.getElementById("array").value;
    const order = document.querySelector('input[name="order"]:checked').value;
  
    if (!arrayInput) {
      alert("Please enter an array.");
      return;
    }
  
    // Send POST request to Django
    fetch(window.location.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
      },
      body: new URLSearchParams({
        array: arrayInput,
        order: order,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
  
        // Get the fields for sorted array and process time
        const sortedArrayField = document.getElementById("sorted-array");
        const processTimeField = document.getElementById("process-time");
  
        // Update fields if they exist
        if (sortedArrayField && processTimeField) {
          sortedArrayField.value = data.result.join(", ");
          processTimeField.value = `${data.process_time} ms`;
        } else {
          console.error("One or more fields are missing in the DOM.");
        }
  
        // Trigger visualization
        visualizeBubbleSort(data.original_array, order);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });  

document.getElementById("speed").addEventListener("input", function () {
  // Calculate inverse speed
  speed = 2100 - this.value; // Invert the slider value (e.g., 100 becomes 2000)
});

function bubbleSort(array, order) {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const condition =
        order === "ascending" ? array[j] > array[j + 1] : array[j] < array[j + 1];
      if (condition) {
        // Swap the elements
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

  let i = 0,
    j = 0;

  function step() {
    if (i < n) {
      if (j < n - i - 1) {
        const slot1 = slots[j];
        const slot2 = slots[j + 1];

        slot1.classList.add("swap");
        slot2.classList.add("swap");

        const condition =
          order === "ascending" ? array[j] > array[j + 1] : array[j] < array[j + 1];

        if (condition) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          const tempText = slot1.textContent;
          slot1.textContent = slot2.textContent;
          slot2.textContent = tempText;
        }

        setTimeout(() => {
          slot1.classList.remove("swap");
          slot2.classList.remove("swap");
        }, speed / 2);

        j++;
      } else {
        slots[n - i - 1].classList.add("sorted");
        j = 0;
        i++;
      }

      setTimeout(step, speed);
    } else {
      for (let k = 0; k < n; k++) {
        slots[k].classList.add("sorted");
      }
    }
  }

  step();
}