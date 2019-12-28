import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ListEnumValues } from '../../graphql/Introspection'
import { CreateUncloggerPrompt } from '../../graphql/UncloggerPrompt'
import {
  uncloggerPromptCategoryEnumName,
  supportedLanguageEnumName,
  approvalStatusEnumName
} from '../../utils/appsyncConstants'
import { UncloggerPromptModalPropType } from '../../types/prop'
import { AppSyncListEnumValuesResultData } from '../../types/appsync/introspection'
import { GetCurrAuthUserId } from '../../utils/functions'

const UpsertUncloggerPromptModal: React.FC<UncloggerPromptModalPropType> = (
  props: UncloggerPromptModalPropType
) => {
  // destruct props
  const { show, onHide, initialData } = props
  // compute data
  const isNew = !initialData || Object.entries(initialData).length === 0
  const headerText = isNew ? 'New Unclogger Prompt' : 'Edit Unclogger Prompt'

  // Hooks
  const [currAuthUserId, setCurrAuthUserId] = useState<string | undefined>(
    undefined
  )
  const [formData, setFormData] = useState({
    category: initialData?.category,
    body: initialData?.body,
    language: initialData?.language,
    status: initialData?.status
  })
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])
  const [supportedLanguageOptions, setSupportedLanguageOptions] = useState<
    string[]
  >([])
  const [approvalStatusOptions, setApprovalStatusOptions] = useState<string[]>(
    []
  )
  // Load Authenticated User Name
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const currAuthUserId = await GetCurrAuthUserId()
        setCurrAuthUserId(currAuthUserId)
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    })()
  })
  // Load Categories
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        // Send the requests
        const categoryOptionsRequest = API.graphql(
          graphqlOperation(ListEnumValues, {
            enumName: uncloggerPromptCategoryEnumName
          })
        )
        const supportedLanguageOptionsRequest = API.graphql(
          graphqlOperation(ListEnumValues, {
            enumName: supportedLanguageEnumName
          })
        )
        const approvalStatusOptionsRequest = API.graphql(
          graphqlOperation(ListEnumValues, {
            enumName: approvalStatusEnumName
          })
        )
        // collect responses
        const categoryOptionsResult = (await categoryOptionsRequest) as {
          data: AppSyncListEnumValuesResultData
        }
        const supportedLanguageOptionsResult = (await supportedLanguageOptionsRequest) as {
          data: AppSyncListEnumValuesResultData
        }
        const approvalStatusOptionsResult = (await approvalStatusOptionsRequest) as {
          data: AppSyncListEnumValuesResultData
        }
        // set the states
        setCategoryOptions(
          categoryOptionsResult.data.enum.enumValues.map(({ name }) => name)
        )
        setSupportedLanguageOptions(
          supportedLanguageOptionsResult.data.enum.enumValues.map(
            ({ name }) => name
          )
        )
        setApprovalStatusOptions(
          approvalStatusOptionsResult.data.enum.enumValues.map(
            ({ name }) => name
          )
        )
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    })()
  }, [categoryOptions])

  // functions
  const save = async (): Promise<void> => {
    try {
      setFormData(formData)
      await API.graphql(
        graphqlOperation(CreateUncloggerPrompt, {
          category: formData.category,
          body: formData.body,
          language: formData.language,
          creatorUserId: currAuthUserId
        })
      )
      onHide()
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }
  const reject = async (): Promise<void> => {
    try {
      setFormData(formData)
      // TODO: Implement Logic
      onHide()
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }
  const approve = async (): Promise<void> => {
    try {
      setFormData(formData)
      // TODO: Implement Logic
      onHide()
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }
  // render
  return (
    <Modal show={show} onHide={onHide}>
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
            <Form.Control as="select" readOnly={!isNew}>
              {categoryOptions.map((o: string) => (
                <option key={o}>{o}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Body */}
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              readOnly={!isNew}
              rows="3"
              placeholder="Enter Body"
              value={formData.body}
            />
          </Form.Group>
          {/* Language */}
          <Form.Group controlId="language">
            <Form.Label>Language</Form.Label>
            <Form.Control as="select" readOnly={!isNew}>
              {supportedLanguageOptions.map((c: string) => (
                <option key={c}>{c}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Status (visible if review) */}
          {!isNew ?? (
            <Form.Group controlId="status">
              <Form.Label>Language</Form.Label>
              <Form.Control as="select" value={formData.status} />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      {/* Modal Footer Actions */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {isNew ? (
          <Button variant="primary" onClick={save}>
            Save
          </Button>
        ) : (
          <>
            <Button variant="danger" onClick={reject}>
              Reject
            </Button>
            <Button variant="success" onClick={approve}>
              Approve
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default UpsertUncloggerPromptModal
