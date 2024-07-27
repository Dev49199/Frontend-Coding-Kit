import { useState } from "react";

export default function ActionButtons({ handleClick, commentId }) {
  const [btnState, setBtnState] = useState(0);
  const [reply, setReply] = useState("");
  const handleSave = ()=>{
    handleClick('REPLY',commentId,reply);
    setBtnState(0);
    setReply('');
  }
  return (
    <>
      {btnState === 0 && (
        <span>
          <button onClick={() => handleClick("LIKE")}>Like</button>
          <button onClick={() => setBtnState(2)}>Reply</button>
          <button onClick={() => handleClick("DELETE", commentId)}>
            Delete
          </button>
        </span>
      )}
      {
        btnState === 2 && <span><input type="text" value={reply} onChange={(event)=>setReply(event.target.value)}/><button onClick={handleSave}>SAVE</button></span>
      }
    </>
  );
}
