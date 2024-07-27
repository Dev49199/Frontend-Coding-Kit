import { useState } from "react";
import ActionButtons from "./ActionButtons";

export default function Comment({comments, handleInsertNode, handleClick}){
    const [commentText, setCommentText] = useState('')
    return (
        <div style={{paddingLeft:'20px'}}>
        {
            comments.id === 1 ? <div>
                <input type="text" value={commentText} onChange={(event)=>{
                    setCommentText(event.target.value)
                }}/>
                <button onClick={()=>handleInsertNode(1,commentText)}>SAVE</button>
            </div> : <div>
                <p>{comments?.message}</p>
                <ActionButtons handleClick={handleClick} commentId={comments.id}/>
            </div>
        }
        {
            comments?.items?.map((comment)=><Comment comments={comment} handleInsertNode={handleInsertNode} key={comment.id} handleClick={handleClick}/>)
        }
    </div>
    )
}