import { Check, Trash } from "phosphor-react";

import styles from './Task.module.scss';

interface TaskProps {
  content: string;
  done?: boolean;
  onCheck(): void;
  onDelete(): void;
}

export function Task({content, done, onCheck, onDelete}: TaskProps) {
  const doneStyle = done ? styles.done : '';

  return (
    <li className={styles.task}>
      <label>
        <input type="checkbox" name="checkbox" checked={done} onClick={onCheck} />

        <span><Check /></span>
      </label>
    
      <p className={doneStyle}>{content}</p>
    
    <button onClick={onDelete}>
      <Trash />
    </button>
  </li>
  )
}