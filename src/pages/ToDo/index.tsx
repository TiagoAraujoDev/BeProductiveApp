import {
  SummaryContainer,
  TaskCardsBox,
  TaskContainer,
  TaskCounter,
  TasksBox,
} from './styles'

import todoLogo from '../../assets/todoLogo.svg'
import { EmptyTask } from './components/EmptyTask'
import { NewTaskForm } from './components/NewTaskForm'
import { TaskCard } from './components/TaskCard'

export function ToDo() {
  return (
    <TaskContainer>
      <img src={todoLogo} alt="" />
      <NewTaskForm />
      <TasksBox>
        <SummaryContainer>
          <div>
            <span>Tasks created</span>
            <TaskCounter>0</TaskCounter>
          </div>
          <div>
            <span>Tasks finished</span>
            <TaskCounter>0</TaskCounter>
          </div>
        </SummaryContainer>
        <TaskCardsBox>
          {/* <EmptyTask /> */}
          <TaskCard />
        </TaskCardsBox>
      </TasksBox>
    </TaskContainer>
  )
}
