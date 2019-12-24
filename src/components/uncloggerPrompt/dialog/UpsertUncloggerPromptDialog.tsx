import React, { useState, useEffect } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const UpsertUncloggerPromptDialog: React.FC = () => {
  // Hooks

  // Render
  return (
    <div>
      <Modal open={open} onClose={this.close}>
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Content Here</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default UpsertUncloggerPromptDialog
