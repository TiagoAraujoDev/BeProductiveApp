import { createContext, ReactNode, useEffect, useState } from 'react'

export interface Task {
  id: string
  content: string
  done: boolean
  createdAt: Date
}

interface taskFormData {
  taskContent: string
}

interface TaskContextType {
  tasks: Task[]
  handleCreateTask: (data: taskFormData) => void
  handleToggleTaskDone: (id: string) => void
  handleDeleteTask: (id: string) => void
  countDoneTasks: () => number
}

interface TaskContextProviderProps {
  children: ReactNode
}

export const TaskContext = createContext({} as TaskContextType)

export function TasksContextProvider({ children }: TaskContextProviderProps) {
  const [tasks, setTask] = useState<Task[]>(() => {
    const localStorageTasks = localStorage.getItem('@focus:tasks/v1.0.0')
    if (localStorageTasks) {
      const tasksParsed = JSON.parse(localStorageTasks)
      return tasksParsed
    }
    return []
  })

  function handleCreateTask(data: taskFormData) {
    const id = new Date().getTime().toString()

    const newTask = {
      id,
      content: data.taskContent,
      done: false,
      createdAt: new Date(),
    }

    setTask([...tasks, newTask])
  }

  function handleToggleTaskDone(id: string): void {
    setTask(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done }
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
        handleCreateTask,
        handleToggleTaskDone,
        handleDeleteTask,
        countDoneTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
