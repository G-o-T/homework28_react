import React, { useState } from 'react';
import Button from './Button';
import Input from "./Input";

const Form = ({create}) => {

    const [commentText, setCommentText] = useState("");

    function addComment(e) {
        e.preventDefault();

        let 
        h, s, l, 
        min_s = 30, max_s = 70, 
        min_l = 70, max_l = 99;
    
        h = Math.floor(Math.random() * 360); // 0-360 градусов цвета
        s = Math.floor(Math.random() * (max_s - min_s) + min_s); // 30-70% насыщенности
        l = Math.floor(Math.random() * (max_l - min_l) + min_l); // 70-99% яркости

        const newComment = {
            id: new Date(),
            date: new Date(),
            comment: commentText,
            color: `hsl(${h}, ${s}%, ${l}%)`
        }

        create(newComment);

        setCommentText('');

    }

    const onClickHandler = (e) => {
        addComment(e);
    }

    



    return (
        <div className='form'>
            <Input label="Comment" value={commentText} onChangeHandler={e => setCommentText(e.target.value)}/>
            <Button onClickHandler={onClickHandler}>Send</Button>
        </div>
    )
}

export default Form;