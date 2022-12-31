import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApiPrivate } from '../hooks/useAxiosPrivate'

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
  fetchTasks: (controller: AbortController, isMounted: boolean) => void
}

interface TaskContextProviderProps {
  children: ReactNode
}

export const TaskContext = createContext({} as TaskContextType)

export function TasksContextProvider({ children }: TaskContextProviderProps) {
  const navigate = useNavigate()
  const apiPrivate = useApiPrivate()

  const [taskTitle, setTaskTitle] = useState('')
  const [tasks, setTask] = useState<Task[]>([])

  //  TODO: Isolate the api requests in its own file
  const fetchTasks = async (
    controller: AbortController,
    isMounted: Boolean,
  ) => {
    try {
      const response = await apiPrivate.get('/tasks/user', {
        signal: controller.signal,
      })

      console.log(response.data)
      isMounted && setTask(response.data.userTasks)
    } catch (err: any) {
      console.log(
        `error in the fetchTasks: ${JSON.stringify(err.response.data)}`,
        //  TODO: Receive the location from the args in the ToDo component
        // navigate('/signin'),
      )
    }
  }

  //  TODO: Hit the endpoint to update the DB
  // const createTask = async (controller: AbortController, data: Task) => {}
  // const removeTask = async (controller: AbortController, id: string) => {}
  // const checkTask = async (controller: AbortController, id: string) => {}

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
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
