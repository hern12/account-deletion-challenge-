import PropTypes from 'prop-types'
import React from 'react'

import * as LoadState from './LoadState'

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
        email: 'ross@example.com'
      },

      currentWorkspace: {
        spaceId: 'workspace1',
        displayName: 'Lightning strike',
      },

      loading: true,

      requiredTransferWorkspaces: [],

      deleteWorkspaces: [],

      transferableMembers: [],

      fetchRelatedWorkspaces: () => {
        // Resemble fetching requiredTransferWorkspaces, deleteWorkspaces, and transferableMembers from the server
        /*
        window.fetch('/api/fetch-related-workspaces', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: this.state.user._id }),
        }).then((data) => {
          this.setState({
            loading: false,
            requiredTransferWorkspaces: data.requiredTransferWorkspaces,
            deleteWorkspaces: data.deleteWorkspaces,
            terminateAccountStatus: LoadState.handleLoaded(this.state.terminateAccountStatus)
          })
        }).catch(() => {
          this.setState({
            terminateAccountStatus: LoadState.handleLoadFailedWithError('Error deleting account')(this.state.terminateAccountStatus)
          })
        })
        */

        // Simulate fetching requiredTransferWorkspaces, deleteWorkspaces, and transferableMembers from the server
        setTimeout(() => {
          this.setState({
            loading: false,
            requiredTransferWorkspaces: [
              {
                spaceId: 'workspace1',
                displayName: 'Lightning strike',
                transferableMembers: [
                  {
                    _id: 'user2',
                    name: 'Ryan Lynch'
                  },
                  {
                    _id: 'user3',
                    name: 'Riker Lynch'
                  },
                  {
                    _id: 'user4',
                    name: 'Rydel Lynch'
                  }
                ]
              },
              {
                spaceId: 'workspace2',
                displayName: 'Time machine',
                transferableMembers: [
                  {
                    _id: 'user5',
                    name: 'Edward Bayer',
                    workspaceId: 'workspace3'
                  },
                  {
                    _id: 'user6',
                    name: 'Eli Brook',
                    workspaceId: 'workspace3'
                  }
                ]
              }
            ],
            deleteWorkspaces: [
              {
                spaceId: 'workspace3',
                displayName: 'Moon landing'
              }
            ]
          })
        }, 1500)
      },

      transferOwnershipStatus: {
        workspaceId: null,
        toUserId: null,
        ...LoadState.pending,
      },

      transferOwnership: (user, workspace) => {
        this.setState({
          transferOwnershipStatus: {
            workspaceId: workspace._id,
            toUserId: this.state.user._id,
            ...LoadState.loading
          }
        }, () => {
          // Resemble sending transferOwnershipStatus to the server
          /*
          window.fetch('/api/check-transfer-ownership', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              workspaceId: workspace._id,
              fromUserId: this.state.user._id,
              toUserId: user._id
            }),
          }).then(() => {
            this.setState({
              transferOwnershipStatus: {
                workspaceId: workspace._id,
                toUserId: user._id,
                ...LoadState.completed
              }
            })
          }).catch(() => {
            this.setState({
              transferOwnershipStatus: {
                workspaceId: workspace._id,
                toUserId: user._id,
                ...LoadState.error
              }
            })
          })
          */

          // Simulate sending transferOwnershipStatus to the server
          // Note that there is 30% chance of getting error from the server
          setTimeout(() => {
            this.setState({
              transferOwnershipStatus: {
                workspaceId: workspace._id,
                fromUserId: this.state.user._id,
                toUserId: user._id,
                ...(Math.random() < 0.3 ? LoadState.error : LoadState.completed)
              }
            })
          }, 1000)
        })
      },

      terminateAccount: (payload) => {
        // Resemble sending payload to the server
        /*
        window.fetch('/api/terminate-account', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
        }).then(() => {
          this.setState({
            terminateAccountStatus: LoadState.handleLoaded(this.state.terminateAccountStatus)
          })
        }).catch(() => {
          this.setState({
            terminateAccountStatus: LoadState.handleLoadFailedWithError('Error deleting account')(this.state.terminateAccountStatus)
          })
        })
        */

        // Simulate sending payload to the server
        // Note that there is 30% chance of getting error from the server
        this.setState({
          terminateAccountStatus: LoadState.handleLoadRequested(this.state.terminateAccountStatus)
        }, () => {
          setTimeout(() => {
            if (Math.random() < 0.3) {
              this.setState({
                terminateAccountStatus: LoadState.handleLoaded(this.state.terminateAccountStatus)
              })
            } else {
              this.setState({
                terminateAccountStatus: LoadState.handleLoadFailedWithError('Error deleting account')(this.state.terminateAccountStatus)
              })
            }
          }, 5000)
        })
      },

      terminateAccountError: (error) => {
        this.setState({
          terminateAccountStatus: LoadState.handleLoadFailedWithError(error)(this.state.terminateAccountStatus)
        })
      },

      terminateAccountStatus: {},
      resetTerminateAccountStatus: () => {
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