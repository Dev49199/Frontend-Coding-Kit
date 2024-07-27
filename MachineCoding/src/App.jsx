import { useState } from "react";
import "./App.css";
import StarRating from "./pages/StarRating/StarRating";
import NestedComments from "./pages/NestedComments/NestedComments";

function App() {
  const [componentValue, setComponentValue] = useState(0);
  return (
    <>
      {componentValue === 0 && (
        <>
          <div className='divBtn' onClick={()=>setComponentValue(1)}>Show Star rating</div>
          <div className='divBtn' onClick={()=>setComponentValue(2)}>Show Nested comments</div>
        </>
      )}
      {componentValue === 1 && <StarRating />}
      {componentValue === 2 && <NestedComments />}
    </>
  );
}

export default App;
