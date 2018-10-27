import PropTypes from 'prop-types'
import React from 'react'

import * as LoadState from '../helpers/LoadState'

export default class MockDataProvider extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      user: {
        _id: 'user1',
        name: 'Ross Lynch',
        email: 'ross@example.com',
      },

      loading: true,

      requiredTransferWorkspaces: [],

      deleteWorkspaces: [],

      transferableMembers: [],

      fetchRelatedWorkspaces: async () => {
        const response = await window.fetch(
          `https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/fetchWorkspaces?userId=${
            this.state.user._id
          }`,
          {
            mode: 'cors',
          }
        )
        const data = await response.json()
        if(data){
          this.setState({
            loading: false,
            requiredTransferWorkspaces: data.requiredTransferWorkspaces,
            deleteWorkspaces: data.deleteWorkspaces,
          })
        }
      },

      transferOwnershipStatus: {
        workspaceId: null,
        toUserId: null,
        ...LoadState.pending,
      },

      canSelect: '',

      transferOwnership: (user, workspace) => {
        this.setState(
          {
            transferOwnershipStatus: {
              workspaceId: workspace.spaceId,
              toUserId: this.state.user._id,
              ...LoadState.loading,
            },
          },
          async () => {
            const response = await window.fetch(
              'https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/checkOwnership',
              {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  workspaceId: workspace.spaceId,
                  fromUserId: this.state.user._id,
                  toUserId: user._id,
                }),
              }
            )
            if (response.status === 200) {
              this.setState({
                canSelect: '',
                transferOwnershipStatus: {
                  workspaceId: workspace.spaceId,
                  toUserId: user._id,
                  ...LoadState.completed,
                },
              })
            }
            else if(response.status === 409){
              this.setState({
                canSelect: 'This person is very busy please select other'
              })
            } 
            else {
              this.setState({
                canSelect: '',
                transferOwnershipStatus: {
                  workspaceId: workspace.spaceId,
                  toUserId: user._id,
                  ...LoadState.error,
                },
              })
            }
          }
        )
      },

      terminateAccount: async payload => {
        // Note that there is 30% chance of getting error from the server
        const response = await window.fetch(
          'https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/terminateAccount',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        )
        if (response.status === 200) {
          this.setState({
            terminateAccountStatus: LoadState.handleLoaded(
              this.state.terminateAccountStatus
            ),
          })
        }
        else {
          this.setState({
            terminateAccountStatus: LoadState.handleLoadFailedWithError(
              'Error deleting account please try again'
            )(this.state.terminateAccountStatus),
          })
        }
      },

      terminateAccountError: error => {
        this.setState({
          terminateAccountStatus: LoadState.handleLoadFailedWithError(error)(
            this.state.terminateAccountStatus
          ),
        })
      },

      terminateAccountStatus: {},
      resetTerminateAccountStatus: () => {
        this.setState({
          terminateAccountStatus: {},
        })
      },

      setPeddingTerminateAccoutStatus: () => {
        this.setState({
          terminateAccountStatus: LoadState.pending
        })
      },

      rediectToHomepage: () => {
        window.location = 'http://www.example.com/'
      },
    }
  }

  render() {
    return this.props.children(this.state)
  }
}
