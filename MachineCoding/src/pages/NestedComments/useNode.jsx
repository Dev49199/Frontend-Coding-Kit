export default function useNode()
{
    const insertNode = (tree, commentId, msg)=>{
        if(tree.id === commentId)
        {
            tree?.items?.push({
                id:new Date().getTime(),
                message:msg,
                likescount:0,
                items:[]
            })
            return tree;
        }

        let latestNodes = tree?.items?.map((commentNode)=>insertNode(commentNode, commentId, msg));
        return {...tree, items:latestNodes};
    }
    const deleteNode = (tree, commentId)=>{
        for(let i=0;i<tree?.items?.length;i++)
        {
            const currentNode = tree?.items[i];
            if(currentNode.id === commentId)
            {
                tree.items?.splice(i,1);
                return tree;
            }
            else{
                deleteNode(tree?.items[i], commentId);
            }
        }
        return tree;
    }
    const updateNode = ()=>{}

    return {insertNode, deleteNode, updateNode}
}