const Comment = ({comment, color}) => {
    
      //Функция проверяет cooбщение на наличие спама и заменяет его
  function checkSpam(commentData) {
    const spamWords = [/viagra/gi, /xxx/gi, /ххх/gi, /виагр/gi];
    let finalComment = commentData;
    for (let i = 0; i < spamWords.length; i++) {
       finalComment = finalComment.replace(spamWords[i], '***');
    };
    return finalComment;
  };

    return (
        <div className="chat__message-info" style={{"background-color" : color}}>
            <div className="chat__user-name">
                anonymous
            </div>
            <div className="chat__user-message">
                {checkSpam(comment.comment)}
            </div>
        </div>
    )
}

export default Comment;