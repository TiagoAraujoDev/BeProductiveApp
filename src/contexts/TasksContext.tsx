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
    auth: any,
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

  //  TODO: Isolate the api requests in its own file
  const fetchTasks = async (
    controller: AbortController,
    isMounted: Boolean,
    auth: any,
  ): Promise<void> => {
    try {
      const response = await apiPrivate.get('/tasks/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        signal: controller.signal,
      })

      isMounted && setTask(response.data.userTasks)
    } catch (err: any) {
      if (err) {
        console.log(err?.response?.data)
        console.log(err?.response?.status)
        console.log(err?.response?.headers)
        // Redirection to login if refresh token expires
        if (err?.response?.status === 403) {
          navigate('/signin')
        }
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
    } catch (err) {
      navigate('/signin')
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
    } catch (err) {
      navigate('/signin')
    }
  }

  const toggleTaskDoneStatus = async (id: string): Promise<void> => {
    console.log('tctx: ', typeof id)
    try {
      toggleTaskDoneStatusFromState(id)
      await apiPrivate.put(
        '/tasks',
        {},
        {
          headers: {
            id: `${id}`,
          },
        },
      )
    } catch (err) {
      console.log(err)
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
