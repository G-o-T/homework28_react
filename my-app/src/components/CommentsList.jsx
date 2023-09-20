import Comment from "./Comment";

const CommentsList = ({comments}) => {

    return (
        <div className="chat">
            {comments.map(c => <Comment comment={c} key={c.id} color={c.color}/>)}
        </div>
    )
}

export default CommentsList;