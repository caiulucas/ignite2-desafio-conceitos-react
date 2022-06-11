import styles from './App.module.scss';
import './styles/global.scss';

import { Clipboard, PlusCircle } from 'phosphor-react';
import logoSvg from './assets/logo.svg';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react';

type Task = {
  id: number;
  content: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const localTasks = localStorage.getItem('@todo:tasks');
    return localTasks ? JSON.parse(localTasks) : [];
  });
  const [newTaskText, setNewTaskText] = useState('');

  const doneTasksCount = tasks.reduce((acc, task) => (
    task.done ? acc + 1 : acc
  ), 0)

  function handleCheckTask(taskId: number) {
  const updatedTasks = tasks.map(task => (
    task.id === taskId? {...task, done: !task.done} : task
  ));
  
  localStorage.setItem('@todo:tasks', JSON.stringify(updatedTasks));
  setTasks(updatedTasks);
  }

  function handleDeleteTask(taskId: number) {
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    
    localStorage.setItem('@todo:tasks', JSON.stringify(filteredTasks));
    setTasks(filteredTasks);
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.currentTarget.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const task = {
      id: Date.now(),
      content: newTaskText,
      done: false,
    }

    localStorage.setItem('@todo:tasks', JSON.stringify([...tasks, task]));
    setTasks(oldState => [...oldState, task]);
    setNewTaskText('');
  }

  return (
    <>
      <header className={styles.header}>
        <img src={logoSvg} alt="todo logo (with a rocket on the left side)"/>
      </header>

      <main className={styles.container}>
        <form className={styles.addForm} onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleChangeInput} 
          />
          <button type="submit" disabled={!newTaskText}>Criar <PlusCircle /></button>
        </form>

        <div className={styles.taskList}>
          <div className={styles.taskListStatus}>
            <h3>Tarefas criadas <span>{tasks.length}</span></h3>
            <h3>Concluídas <span>{doneTasksCount} de {tasks.length}</span></h3>
          </div>
          {tasks.length ? (
            <ul>
              {tasks.map(task => (
                <Task 
                  key={task.id} 
                  content={task.content} 
                  done={task.done}
                  onCheck={() => handleCheckTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                />))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <Clipboard />
              <h3>Você ainda não tem tarefas cadastradas</h3>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
