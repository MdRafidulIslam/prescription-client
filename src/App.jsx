import { useState } from "react";
//check box eitar moto korte hobe
function App() {
  const [checkedItems, setCheckedItems] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
      
    });
    console.log(event.target.name,event.target.checked);
  };

  console.log(checkedItems.option1)
 

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="option1"
          checked={checkedItems.option1}
          onChange={handleChange}
        />
        Option 1
      </label>
      <label>
        <input
          type="checkbox"
          name="option2"
          checked={checkedItems.option2}
          onChange={handleChange}
        />
        Option 2
      </label>
      <label>
        <input
          type="checkbox"
          name="option3"
          checked={checkedItems.option3}
          onChange={handleChange}
        />
        Option 3
      </label>
      <p>Checked Items: {JSON.stringify(checkedItems)}</p>
    </div>
  );
}

export default App;
