import { AxiosError } from 'axios'
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

interface TaskFormData {
  title: string
}

interface TaskContextType {
  tasks: Task[]
  taskTitle: string
  fetchTasks: (
    controller: AbortController,
    isMounted: boolean,
    token: string,
  ) => void
  createTask: (data: TaskFormData) => Promise<void>
  toggleTaskDoneStatus: (id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  countDoneTasks: () => number
  setTaskTitleInTimer: (title: string) => void
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

  const fetchTasks = async (
    controller: AbortController,
    isMounted: Boolean,
    token: string,
  ): Promise<void> => {
    try {
      const response = await apiPrivate.get('/tasks/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })

      isMounted && setTask(response.data.userTasks)
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
      }
    }
  }

  const createTask = async (data: TaskFormData): Promise<void> => {
    try {
      const response = await apiPrivate.post('/tasks', { title: data.title })

      const newTask = response.data

      setTask((state) => {
        return [...state, newTask]
      })
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
      }
    }
  }
  const deleteTask = async (id: string): Promise<void> => {
    try {
      deleteTaskFromState(id)
      await apiPrivate.delete('/tasks', {
        headers: {
          id: `${id}`,
        },
      })
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
      }
    }
  }

  const toggleTaskDoneStatus = async (id: string): Promise<void> => {
    try {
      toggleTaskDoneStatusFromState(id)
      await apiPrivate.patch(
        '/tasks',
        {},
        {
          headers: {
            id: `${id}`,
          },
        },
      )
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
      }
    }
  }

  const setTaskTitleInTimer = (taskTitle: string): void => {
    setTaskTitle(taskTitle)
    navigate('/')
  }

  const toggleTaskDoneStatusFromState = (id: string): void => {
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

  const deleteTaskFromState = (id: string): void => {
    setTask(tasks.filter((task) => task.id !== id))
  }

  const countDoneTasks = (): number => {
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
        fetchTasks,
        createTask,
        toggleTaskDoneStatus,
        deleteTask,
        countDoneTasks,
        setTaskTitleInTimer,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
