import React, { Component } from 'react'
import dnddata from '../static/sampleData/dnddata'
import StageColumn from './StageColumn'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

export class Deals extends Component {
  state = dnddata

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const startingStage = this.state.stages[source.droppableId]
    const endingStage = this.state.stages[destination.droppableId]

    if (startingStage === endingStage) {
      const newDealIds = [...startingStage.dealIds]

      newDealIds.splice(source.index, 1)
      newDealIds.splice(destination.index, 0, draggableId)

      const newStage = {
        ...startingStage,
        dealIds: newDealIds
      }

      const newState = {
        ...this.state,
        stages: {
          ...this.state.stages,
          [newStage.id]: newStage
        }
      }

      this.setState(newState)
      return
    }

    const startDealIds = [...startingStage.dealIds]
    startDealIds.splice(source.index, 1)
    const newStartingStage = {
      ...startingStage,
      dealIds: startDealIds
    }

    const finishDealIds = [...endingStage.dealIds]
    finishDealIds.splice(destination.index, 0, draggableId)
    const newEndingStage = {
      ...endingStage,
      dealIds: finishDealIds
    }

    const newState = {
      ...this.state,
      stages: {
        ...this.state.stages,
        [newStartingStage.id]: newStartingStage,
        [newEndingStage.id]: newEndingStage
      }
    }

    this.setState(newState)
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.stageOrder.map(stageId => {
            const stage = this.state.stages[stageId]
            const deals = stage.dealIds.map(dealId => this.state.deals[dealId])
            return <StageColumn key={stage.id} stage={stage} deals={deals} />
          })}
        </Container>
      </DragDropContext>
    )
  }
}

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`

export default Deals
