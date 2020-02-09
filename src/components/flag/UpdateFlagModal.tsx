import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { UpdateFlagContent, UpdateFlagReview } from '../../graphql/Flag'
import { FlagModalPropType } from '../../types/prop'
import {
  flagDeclinedStatus,
  flagAcceptedStatus,
  flagImmutableStatuses
} from '../../utils/constants'
import { GetCurrAuthUserId } from '../../utils/functions'

const UpdateFlagModal: React.FC<FlagModalPropType> = (
  props: FlagModalPropType
) => {
  // Hooks
  const headerText = useState<string>('Edit Flag')
  const [currAuthUserId, setCurrAuthUserId] = useState<string | undefined>(
    undefined
  )
  const [isEdited, setIsEdited] = useState<boolean>(false)

  const [category, setCategory] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [reviewNote, setReviewNote] = useState<string>('')

  // Load Authenticated User and Initial Values
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        // Load Authenticated User Name
        setCurrAuthUserId(await GetCurrAuthUserId())

        if (props.show) {
          // When modal is shown
          setCategory(props?.initialData?.category ?? '')
          setType(props?.initialData?.type ?? '')
          setDetail(props?.initialData?.detail ?? '')
          setReviewNote(props?.initialData?.reviewNote ?? '')
        }
      } catch (err) {
        console.log(err)
      }
    })()
    // Cleanup
    if (props.show) {
      return (): void => {
        setCategory('')
        setType('')
        setDetail('')
        setReviewNote('')
      }
    }
  }, [props])

  // functions
  const onCategoryChange = (e: React.SyntheticEvent): void => {
    setIsEdited(true) // Mark as edited
    const { value } = e.target as HTMLInputElement
    setCategory(value)
  }
  const onTypeChange = (e: React.SyntheticEvent): void => {
    setIsEdited(true) // Mark as edited
    const { value } = e.target as HTMLInputElement
    setType(value)
  }
  const onDetailChange = (e: React.SyntheticEvent): void => {
    setIsEdited(true) // Mark as edited
    const { value } = e.target as HTMLInputElement
    setDetail(value)
  }
  const onReviewNoteChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement
    setReviewNote(value)
  }

  // Actions
  const reject = async (): Promise<void> => {
    try {
      // Content Update, if any
      if (isEdited) {
        await API.graphql(
          graphqlOperation(UpdateFlagContent, {
            id: props?.initialData?.id,
            category: category,
            type: type,
            detail: detail,
            reviewNote
          })
        )
      }
      // Review Update
      await API.graphql(
        graphqlOperation(UpdateFlagReview, {
          id: props?.initialData?.id,
          reviewerUserId: currAuthUserId,
          status: flagDeclinedStatus,
          reviewNote
        })
      )
      // Reload & Close
      await props.onTriggerReload()
      props.onHide()
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }
  const approve = async (): Promise<void> => {
    try {
      // Content Update, if any
      if (isEdited) {
        await API.graphql(
          graphqlOperation(UpdateFlagContent, {
            id: props?.initialData?.id,
            category: category,
            type: type,
            detail: detail,
            reviewNote
          })
        )
      }
      // Review Update
      await API.graphql(
        graphqlOperation(UpdateFlagReview, {
          id: props?.initialData?.id,
          reviewerUserId: currAuthUserId,
          status: flagAcceptedStatus,
          reviewNote
        })
      )
      // Reload & Close
      await props.onTriggerReload()
      props.onHide()
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }

  // render
  return (
    <Modal show={props.show} onHide={props.onHide}>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      {/* Modal Body */}
      <Modal.Body>
        <Form>
          {/* Category */}
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              name="category"
              onChange={onCategoryChange}
            />
          </Form.Group>
          {/* Type */}
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control value={type} name="type" onChange={onTypeChange} />
          </Form.Group>
          {/* Detail */}
          <Form.Group controlId="detail">
            <Form.Label>Detail</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Edit Flag Detail"
              value={detail}
              name="detail"
              onChange={onDetailChange}
            />
          </Form.Group>
          {/* Review Note */}
          <Form.Group controlId="reviewNote">
            <Form.Label>Review Note</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter Note"
              value={reviewNote}
              name="reviewNote"
              onChange={onReviewNoteChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      {/* Modal Footer Actions */}
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {!flagImmutableStatuses.includes(props?.initialData?.status ?? '') ? (
          <>
            <Button variant="danger" onClick={reject}>
              Reject
            </Button>
            <Button variant="success" onClick={approve}>
              Approve
            </Button>
          </>
        ) : (
          <></>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateFlagModal
