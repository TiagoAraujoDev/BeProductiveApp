import { createContext, ReactNode, useState } from 'react'

interface Task {
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
}

interface TaskContextProviderProps {
  children: ReactNode
}

export const TaskContext = createContext({} as TaskContextType)

export function TasksContextProvider({ children }: TaskContextProviderProps) {
  const [tasks, setTask] = useState<Task[]>([])

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

  return (
    <TaskContext.Provider value={{ tasks, handleCreateTask }}>
      {children}
    </TaskContext.Provider>
  )
}
