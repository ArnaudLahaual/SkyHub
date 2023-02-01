import React, { useState, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { addComment } from '../../../actions/comment';
import cn from 'classnames';
import useDynamicHeightField from './animation';
import './form.scss';
import { changeFieldValue } from '../../../actions/user';


const INITIAL_HEIGHT = 46;

 function Form() {

  const { sessionComment, nickname } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeFieldValue(e.target.name, e.target.value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addComment(nickname, sessionComment));
    dispatch(changeFieldValue('sessionComment', ''));
    setIsExpanded(false);
  }

  // Code récupéré
  const [isExpanded, setIsExpanded] = useState(false);
  //const [commentValue, setCommentValue] = useState("");

  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  useDynamicHeightField(textRef, sessionComment);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };


  const onClose = () => {
    dispatch(changeFieldValue('sessionComment', ''));
    setIsExpanded(false);
  };

  return (



    <div className="form-container">
      <form
        onSubmit={handleSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: sessionComment.length > 0
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
        }}
      >
        <div className="form-headers">
          <div className="form-users">
            <span>Hey</span>
          </div>
        </div>
        <label className="form_label" htmlFor="comment">Commentaire</label>
       
          <textarea ref={textRef}
          onClick={onExpand}
          onFocus={onExpand}
          onChange={handleChange}
          className="comment-field"
          placeholder="Une question? Une remarque ? Commentez !"
          value={sessionComment}
          name="sessionComment"
          id="comment"/>

        <div className="actions">
          <button className='actionbutton__cancel' onClick={onClose}>
            Annuler
          </button>
          <button className='actionbutton__submit' disabled={sessionComment.length < 1}>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}


export default Form;
