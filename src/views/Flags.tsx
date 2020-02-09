import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Pagination from 'react-bootstrap/Pagination'
import {
  flagStatuses,
  allFlagStatusesText,
  tableItemsPerPageOptions
} from '../utils/constants'
import { ListFlags, CountFlags } from '../graphql/Flag'
import TafalkAdminUpdateFlagModal from '../components/flag/UpdateFlagModal'
import {
  AppSyncFlag,
  AppSyncListFlagsResultData,
  AppSyncCountFlagsResultData
} from '../types/appsync/flag'

const FlagsView: React.FC = () => {
  // Hooks
  const [isUpdateDialogVisible, setIsUpdateDialogVisible] = useState<boolean>(
    false
  )
  const [updateDialogInitialData, setUpdateDialogInitialData] = useState({
    id: '',
    contentType: '',
    contentId: '',
    category: '',
    type: '',
    detail: '',
    reviewNote: '',
    status: ''
  })
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [tablePage, setTablePage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [flags, setFlags] = useState<AppSyncFlag[]>([])
  const [totalFlagCount, setTotalFlagCount] = useState<number>(0)

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const [result, countResult] = await Promise.all([
          API.graphql(
            graphqlOperation(ListFlags, {
              limit: itemsPerPage,
              offset: tablePage - 1,
              searchText,
              status:
                statusFilter && statusFilter !== allFlagStatusesText
                  ? statusFilter
                  : undefined
            })
          ) as Promise<{
            data: AppSyncListFlagsResultData
          }>,
          API.graphql(
            graphqlOperation(CountFlags, {
              searchText,
              status:
                statusFilter && statusFilter !== allFlagStatusesText
                  ? statusFilter
                  : undefined
            })
          ) as Promise<{
            data: AppSyncCountFlagsResultData
          }>
        ])
        setTotalFlagCount(countResult.data.countFlags ?? 0)
        setFlags(result.data.listFlags ?? [])
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    })()
  }, [itemsPerPage, searchText, statusFilter, tablePage])

  // Constants
  const flagTableHeaders = [
    { text: 'Id', value: 'id' },
    { text: 'Review Status', value: 'status' },
    { text: 'Category', value: 'category' },
    { text: 'Type', value: 'type' },
    { text: 'Detail', value: 'detail' },
    { text: 'Content Type', value: 'contentType' },
    { text: 'Content Id', value: 'contentId' },
    { text: 'Flagger User Id', value: 'flaggerUserId' }
  ]

  // Functions
  const pageCount = (): number => {
    return totalFlagCount > 0 ? Math.ceil(totalFlagCount / itemsPerPage) : 0
  }
  const tablePageChanged = (p: number): void => {
    setTablePage(p)
  }
  const itemsPerPageChanged = async (
    e: React.SyntheticEvent
  ): Promise<void> => {
    const currTarget = e.currentTarget as HTMLInputElement
    setItemsPerPage(parseInt(currTarget.value))
  }
  const statusFilterChanged = async (
    e: React.SyntheticEvent
  ): Promise<void> => {
    const currTarget = e.currentTarget as HTMLInputElement
    setStatusFilter(currTarget.value)
  }
  const searchTextChanged = async (e: React.SyntheticEvent): Promise<void> => {
    const currTarget = e.currentTarget as HTMLInputElement
    setSearchText(currTarget.value)
  }
  const onEditClicked = (id: string): void => {
    const flag = flags.find(p => p.id === id)
    setUpdateDialogInitialData({
      id,
      contentType: flag?.contentType ?? '',
      contentId: flag?.contentId ?? '',
      category: flag?.category ?? '',
      type: flag?.type ?? '',
      detail: flag?.detail ?? '',
      status: flag?.status ?? '',
      reviewNote: flag?.reviewNote ?? ''
    })
    setIsUpdateDialogVisible(true)
  }

  const refreshCurrentData = async (): Promise<void> => {
    try {
      const result = (await API.graphql(
        graphqlOperation(ListFlags, {
          limit: itemsPerPage,
          offset: tablePage - 1,
          searchText,
          status:
            statusFilter && statusFilter !== allFlagStatusesText
              ? statusFilter
              : undefined
        })
      )) as {
        data: AppSyncListFlagsResultData
      }
      setFlags(result.data.listFlags ?? [])
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }

  // Render
  return (
    <Container fluid>
      <Row>
        <Col sm={6}>
          {/* Title */}
          <Breadcrumb>
            <Breadcrumb.Item active>Flags</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      {/* Filters */}
      <Row>
        <Col sm={{ span: 4, offset: 4 }}>
          {/* Status */}
          <FormControl
            as="select"
            aria-label="StatusFilter"
            aria-describedby="statusFilterLabel"
            onChange={async (e): Promise<void> => await statusFilterChanged(e)}
          >
            <option>{allFlagStatusesText}</option>
            {flagStatuses.map((o: string) => (
              <option key={o}>{o}</option>
            ))}
          </FormControl>
        </Col>
        <Col sm={{ span: 4 }}>
          {/* Search */}
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="searchLabel"
            value={searchText}
            onChange={async (e: React.SyntheticEvent): Promise<void> => {
              await searchTextChanged(e)
            }}
          ></FormControl>
        </Col>
      </Row>
      <Row className="mt-3">
        {/* Table */}
        <Table striped hover responsive="sm">
          <thead>
            <tr>
              {flagTableHeaders.map((headerObj, index) => (
                <th key={index}>{headerObj.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flags.map((p: AppSyncFlag) => (
              <tr
                key={p.id}
                style={{ cursor: 'pointer' }}
                onClick={(): void => onEditClicked(p.id)}
              >
                <td>{p.id}</td>
                <td>{p.status}</td>
                <td>{p.category}</td>
                <td>{p.type}</td>
                <td>{p.detail}</td>
                <td>{p.contentType}</td>
                <td>{p.contentId}</td>
                <td>{p.flaggerUserId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row className="d-flex justify-content-end">
        {/* Items per Page */}
        <Col sm="6" md="3">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="itemsPerPageLabel">
                Items per Page
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="select"
              aria-label="ItemsPerPage"
              aria-describedby="itemsPerPageLabel"
              onChange={async (e): Promise<void> =>
                await itemsPerPageChanged(e)
              }
            >
              {tableItemsPerPageOptions.map((o: number) => (
                <option key={o}>{o}</option>
              ))}
            </FormControl>
          </InputGroup>
        </Col>
        {/* Page */}
        <Pagination>
          {Array.from({ length: pageCount() }, (_, i) => i + 1).map(
            (p: number) => (
              <Pagination.Item
                key={p}
                active={p === tablePage}
                onClick={(): void => tablePageChanged(p)}
              >
                {p}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </Row>
      {/* Upsert Dialog */}
      <TafalkAdminUpdateFlagModal
        show={isUpdateDialogVisible}
        onHide={(): void => setIsUpdateDialogVisible(false)}
        onTriggerReload={async (): Promise<void> => await refreshCurrentData()}
        initialData={updateDialogInitialData}
      />
    </Container>
  )
}

export default FlagsView
