import { useEffect, useState } from "react";
import "./NestedComments.css";
import ActionButtons from "./components/ActionButtons";
import Comment from "./components/Comment";
import useNode from "./useNode";

const comments = {
  id: 1,
  items: [],
};

export default function NestedComments() {
  const [commentsData, setCommentsData] = useState(comments);
  const { insertNode, deleteNode } = useNode();
  const handleInsertNode = (commentId, text) => {
    const updatedData = insertNode(commentsData, commentId, text);
    setCommentsData({ ...updatedData });
  };

  //Implemented only DELETE and Insert, Similary can be implemted EDIT
  const handleClick = (type, commentId, message = "") => {
    switch (type) {
      case "DELETE":
        const updatedData = deleteNode(commentsData, commentId);
        setCommentsData({ ...updatedData });
        break;
      case "REPLY":
        handleInsertNode(commentId, message);
        break;
    }
  };

  return (
    <article>
      <Comment
        comments={commentsData}
        handleInsertNode={handleInsertNode}
        handleClick={handleClick}
      />
    </article>
  );
}
