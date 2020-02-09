import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ListEnumValues } from '../../graphql/Introspection'
import {
  CreateUncloggerPrompt,
  UpdateUncloggerPromptContent,
  UpdateUncloggerPromptReview
} from '../../graphql/UncloggerPrompt'
import {
  uncloggerPromptCategoryEnumName,
  supportedLanguageEnumName
} from '../../utils/appsyncConstants'
import { UncloggerPromptModalPropType } from '../../types/prop'
import { AppSyncListEnumValuesResultData } from '../../types/appsync/introspection'
import {
  uncloggerPromptDeclinedStatus,
  uncloggerPromptAcceptedStatus,
  uncloggerPromptImmutableStatuses
} from '../../utils/constants'
import { GetCurrAuthUserId } from '../../utils/functions'

const UpsertUncloggerPromptModal: React.FC<UncloggerPromptModalPropType> = (
  props: UncloggerPromptModalPropType
) => {
  // Hooks
  const [headerText, setHeaderText] = useState<string>('')
  const [currAuthUserId, setCurrAuthUserId] = useState<string | undefined>(
    undefined
  )
  const [isEdited, setIsEdited] = useState<boolean>(false)

  const [category, setCategory] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [language, setLanguage] = useState<string>('')
  const [reviewNote, setReviewNote] = useState<string>('')

  const [categoryOptions, setCategoryOptions] = useState<string[]>([])
  const [supportedLanguageOptions, setSupportedLanguageOptions] = useState<
    string[]
  >([])

  // Load Authenticated User, Select Options and Intitial Values
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        // Load Authenticated User Name
        setCurrAuthUserId(await GetCurrAuthUserId())

        if (
          !categoryOptions ||
          !categoryOptions.length ||
          !supportedLanguageOptions ||
          !supportedLanguageOptions.length
        ) {
          // Collect enum values
          const [
            categoryOptionsResult,
            supportedLanguageOptionsResult
          ] = await Promise.all([
            API.graphql(
              graphqlOperation(ListEnumValues, {
                enumName: uncloggerPromptCategoryEnumName
              })
            ) as Promise<{
              data: AppSyncListEnumValuesResultData
            }>,
            API.graphql(
              graphqlOperation(ListEnumValues, {
                enumName: supportedLanguageEnumName
              })
            ) as Promise<{
              data: AppSyncListEnumValuesResultData
            }>
          ])
          // set the states
          setCategoryOptions(
            categoryOptionsResult.data.enum.enumValues.map(({ name }) => name)
          )
          setSupportedLanguageOptions(
            supportedLanguageOptionsResult.data.enum.enumValues.map(
              ({ name }) => name
            )
          )
        }

        if (props.show) {
          // When modal is shown
          setHeaderText(
            props.isNew ? 'New Unclogger Prompt' : 'Edit Unclogger Prompt'
          )
          setCategory(props?.initialData?.category ?? '')
          setBody(props?.initialData?.body ?? '')
          setLanguage(props?.initialData?.language ?? '')
          setReviewNote(props?.initialData?.reviewNote ?? '')
        }
      } catch (err) {
        console.log(err)
      }
    })()
    // Cleanup
    if (props.show) {
      return (): void => {
        setHeaderText('')
        setCategory('')
        setBody('')
        setLanguage('')
        setReviewNote('')
      }
    }
  }, [categoryOptions, props, supportedLanguageOptions])

  // functions
  const onCategoryChange = (e: React.SyntheticEvent): void => {
    setIsEdited(true) // Mark as edited
    const { value } = e.target as HTMLInputElement
    setCategory(value)
  }
  const onBodyChange = (e: React.SyntheticEvent): void => {
    setIsEdited(true) // Mark as edited
    const { value } = e.target as HTMLInputElement
    setBody(value)
  }
  const onLanguageChange = (e: React.SyntheticEvent): void => {
    setIsEdited(true) // Mark as edited
    const { value } = e.target as HTMLInputElement
    setLanguage(value)
  }
  const onReviewNoteChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement
    setReviewNote(value)
  }

  // Actions
  const create = async (): Promise<void> => {
    try {
      await API.graphql(
        graphqlOperation(CreateUncloggerPrompt, {
          category: category,
          body: body,
          language: language,
          creatorUserId: currAuthUserId
        })
      )
      await props.onTriggerReload()
      props.onHide()
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }
  const reject = async (): Promise<void> => {
    try {
      // Content Update, if any
      if (isEdited) {
        await API.graphql(
          graphqlOperation(UpdateUncloggerPromptContent, {
            id: props?.initialData?.id,
            category: category,
            body: body,
            language: language,
            reviewNote
          })
        )
      }
      // Review Update
      await API.graphql(
        graphqlOperation(UpdateUncloggerPromptReview, {
          id: props?.initialData?.id,
          reviewerUserId: currAuthUserId,
          status: uncloggerPromptDeclinedStatus,
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
          graphqlOperation(UpdateUncloggerPromptContent, {
            id: props?.initialData?.id,
            category: category,
            body: body,
            language: language,
            reviewNote
          })
        )
      }
      // Review Update
      await API.graphql(
        graphqlOperation(UpdateUncloggerPromptReview, {
          id: props?.initialData?.id,
          reviewerUserId: currAuthUserId,
          status: uncloggerPromptAcceptedStatus,
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
              as="select"
              name="category"
              onChange={onCategoryChange}
            >
              <option></option>
              {categoryOptions.map((c: string) => (
                <option key={c}>{c}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Body */}
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter Body"
              value={body}
              name="body"
              onChange={onBodyChange}
            />
          </Form.Group>
          {/* Language */}
          <Form.Group controlId="language">
            <Form.Label>Language</Form.Label>
            <Form.Control
              value={language}
              as="select"
              name="language"
              onChange={onLanguageChange}
            >
              <option></option>
              {supportedLanguageOptions.map((l: string) => (
                <option key={l}>{l}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Review Note (visible if review) */}
          {!props.isNew ?? (
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
          )}
        </Form>
      </Modal.Body>
      {/* Modal Footer Actions */}
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {props.isNew ? (
          <Button variant="primary" onClick={create}>
            Create
          </Button>
        ) : !uncloggerPromptImmutableStatuses.includes(
            props?.initialData?.status ?? ''
          ) ? (
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

export default UpsertUncloggerPromptModal
