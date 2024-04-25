//ensuring the window loads before we run the JavaScript
window.addEventListener("load", () => {
  //capuring elements on the web page and storing as variables
  const form = document.querySelector("#la-form");
  const itemName = document.querySelector(".item-name");
  const itemPrice = document.querySelector(".item-price");
  const expenseList = document.querySelector(".expense-list");
  const amount = document.querySelector(".amount");

  //price and item array assignment
  let priceArray = [];
  const itemArray = [];

  //creating submit event and operations to be executed
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = itemName.value;
    const priceValue = parseFloat(itemPrice.value);

    //conditions for the input validations
    if (!nameValue && !priceValue) {
      alert("Input fields are empty!!!");
    } else if (typeof nameValue !== "string") {
      alert("Please input only text");
      // console.log(typeof nameValue !== "number");
    } else if (typeof priceValue !== "number") {
      alert("Please input a number");
      // console.log(typeof priceValue !== "number");
    } else if (!nameValue) {
      alert("Please input Item name!");
    } else if (!priceValue) {
      alert("Please input Item price!");
      return;
    } else {
      //create new div container element for expense list
      const innerCard = document.createElement("div");
      innerCard.classList.add("inner-card");

      // creates a new input element - for item & price
      const item = document.createElement("input");
      const price = document.createElement("input");

      //creates a new button input elements - for edit & delete
      const editBtn = document.createElement("input");
      const deleteBtn = document.createElement("input");

      //create a horizontal rule element
      const hr = document.createElement("hr");

      //add a class to the input element
      item.classList.add("item");
      price.classList.add("price");
      editBtn.classList.add("edit-btn");
      deleteBtn.classList.add("delete-btn");

      // set attributes for the item input element
      item.type = "text";
      item.className = "item";
      item.value = nameValue;
      item.readOnly = true;

      //set attributes for the price input element
      price.type = "text";
      price.className = "price";
      price.value = `$ ${priceValue}`;
      price.readOnly = true;

      //set attributes for the button input elements
      editBtn.type = "button";
      deleteBtn.type = "button";
      editBtn.value = "\u270F";
      deleteBtn.value = "\uD83D\uDDD1";

      //append the new item element to the inner-card div
      innerCard.appendChild(item);
      innerCard.appendChild(price);
      innerCard.appendChild(editBtn);
      innerCard.appendChild(deleteBtn);

      //computing the total value
      const totalFunction = () => {
        //adding all the values in the array with the reduce method
        let total = priceArray.reduce(
          (accumulatedValue, currentValue) => accumulatedValue + currentValue,
          0
        );

        //assigning total amount
        amount.readOnly = true;
        amount.value = `$ ${parseFloat(total.toFixed(2))}`;
      };

      const inputPrice = () => {
        //pushing to the array so we can calculate the total
        priceArray.push(Number(priceValue));

        // //pushing to the array for total items
        // itemArray.push(nameValue);

        //computing the total value
        totalFunction();
      };

      //calling the function to add array values for price and item
      inputPrice();

      //append the elements to the expense-list div
      expenseList.appendChild(innerCard);
      expenseList.appendChild(hr);

      //function to clear the input fields
      const clearInput = () => {
        itemName.value = "";
        itemPrice.value = "";
      };

      // logging the array
      console.log("on add: " + priceArray);

      //calling the clear function
      clearInput();

      //edit and save entry function
      const editFunction = () => {
        editBtn.addEventListener("click", (e) => {
          e.preventDefault();

          // selecting old value by index
          let oldValueIndex = priceArray.indexOf(priceValue);
          let oldValue = priceArray[oldValueIndex];

          // function to check for multiple occurrances
          let occurrences;
          function occurranceChecker() {
            occurrences = priceArray.reduce(
              (count, num) => (num === oldValue ? count + 1 : count),
              0
            );
          }

          // console.log(occurrences + " occur");
          // console.log(priceArray);

          if (editBtn.className === "edit-btn") {
            // changing DOM
            //making the inputs modifiable
            price.removeAttribute("readonly");
            price.focus();
            item.removeAttribute("readonly");
            item.focus();

            //changing HTML element attributes
            editBtn.value = "SAVE";
            editBtn.className = "save-btn";

            // changing ARRAY

            // checking multiple occurrances
            occurranceChecker();

            // condition for multiple occurrances
            if (occurrences > 1) {
              alert(priceArray + " has " + occurrences + " occurrances");
            } else {
              alert(priceArray + " has no occurrances :" + occurrences);
              //new edited value from DOM
              let priceFormat = price.value.split(" ");
              let newPriceValue = priceFormat[1];

              //replacing the old value with the new one
              priceArray[oldValue] = parseFloat(newPriceValue);

              totalFunction();
            }
          } else {
            //if class name for edit button is on 'save'
            let saveBtn = document.querySelector(".save-btn");
            //change class and attributes for the save button
            saveBtn.value = "\u270F";
            saveBtn.className = "edit-btn";

            //making inputs not to be modifiable without clicking the edit button
            price.readOnly = true;
            item.readOnly = true;

            //new edited value
            let priceFormat = price.value.split(" ");
            let newPriceValue = parseFloat(priceFormat[1]);

            // updating the array
            let oldValueIndex = priceArray.indexOf(priceValue);
            let oldValue = priceArray[oldValueIndex]; //
            // console.log(priceValue);

            //checking for multiple occurrences
            // let occurrences = priceArray.reduce(
            //   (count, num) => (num === oldValue ? count + 1 : count),
            //   0
            // );
            // occurranceChecker();

            // console.log(priceArray + " has " + occurrences + " occurrences");

            if (occurrences > 1) {
              // condition to remove the first instatnce of the multiple occuring value in array
              if (oldValueIndex !== -1) priceArray.splice(oldValueIndex, 1);

              // creating new array including the remaining old values
              let newArray = [...priceArray];

              console.log(newArray + " is the remaining array value");

              // adding new entry to new array
              newArray.push(newPriceValue);
              priceArray = newArray;

              // //computing the total value
              console.log(priceArray + " is the new array value");
              totalFunction();
            } else {
              // creating new array, filtering out the edited value
              let newArray = [
                ...priceArray.filter((arrayVal) => {
                  if (arrayVal !== oldValue) return arrayVal;
                }),
              ];

              // pushing the new value into the new array
              newArray.push(newPriceValue);

              //reassigning the array values with the edited value
              priceArray = newArray;

              console.log(priceArray);

              //computing the total value
              totalFunction();
            }
          }
        });
      };

      //calling the edit function
      editFunction();

      //creating a function to delete entry
      const deleteFunction = () => {
        deleteBtn.addEventListener("click", (e) => {
          e.preventDefault();

          //removing the particular price from the javascript array
          let oldValue = priceArray.indexOf(priceValue);
          priceArray.splice(oldValue, 1);

          //removing the particular item from the javascript array
          let oldItem = itemArray.indexOf(itemName);
          itemArray.splice(oldItem, 1);

          //calling the total function to compute new total value
          totalFunction();

          //removing its html element from the DOM
          expenseList.removeChild(innerCard);
          expenseList.removeChild(hr);
        });
      };

      //calliing the function for deletion
      deleteFunction();
    }
  });
});
