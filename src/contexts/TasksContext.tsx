import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface Task {
  id: string
  title: string
  done: boolean
  updatedAt: Date | null
  createdAt: Date
}

interface taskFormData {
  taskContent: string
}

interface TaskContextType {
  tasks: Task[]
  taskTitle: string
  handleCreateTask: (data: taskFormData) => void
  handleToggleTaskDone: (id: string) => void
  handleDeleteTask: (id: string) => void
  countDoneTasks: () => number
  handleSetTaskTitleInTimer: (title: string) => void
}

interface TaskContextProviderProps {
  children: ReactNode
}

export const TaskContext = createContext({} as TaskContextType)

export function TasksContextProvider({ children }: TaskContextProviderProps) {
  const navigate = useNavigate()

  const [taskTitle, setTaskTitle] = useState('')
  const [tasks, setTask] = useState<Task[]>(() => {
    const localStorageTasks = localStorage.getItem('@focus:tasks/v1.0.0')

    if (localStorageTasks) {
      const tasksParsed = JSON.parse(localStorageTasks)
      return tasksParsed
    }
    return []
  })

  function handleSetTaskTitleInTimer(taskTitle: string) {
    setTaskTitle(taskTitle)
    navigate('/')
  }

  function handleCreateTask(data: taskFormData) {
    const id = new Date().getTime().toString()

    const newTask = {
      id,
      title: data.taskContent,
      done: false,
      updatedAt: null,
      createdAt: new Date(),
    }

    setTask([...tasks, newTask])
  }

  function handleToggleTaskDone(id: string): void {
    setTask(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done, updatedAt: new Date() }
        } else {
          return task
        }
      }),
    )
  }

  function handleDeleteTask(id: string): void {
    setTask(tasks.filter((task) => task.id !== id))
  }

  function countDoneTasks(): number {
    const tasksDone = tasks.reduce((acc, task) => {
      if (task.done) {
        return acc + 1
      }
      return acc + 0
    }, 0)

    return tasksDone
  }

  useEffect(() => {
    const taskJSON = JSON.stringify(tasks)
    localStorage.setItem('@focus:tasks/v1.0.0', taskJSON)
  }, [tasks])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskTitle,
        handleCreateTask,
        handleToggleTaskDone,
        handleDeleteTask,
        countDoneTasks,
        handleSetTaskTitleInTimer,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
