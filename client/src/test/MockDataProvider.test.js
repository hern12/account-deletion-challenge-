import React from 'react'
import { shallow, mount, render } from 'enzyme';
import TransferOwnershipModal from '../components/TransferOwnershipModal.react'
import MockDataProvider from '../views/MockDataProvider'
import TerminateModalFlow from '../components/TerminateModalFlow.react'
import WorkspaceGroupRows from '../components/WorkspaceGroupRows.react'
import AssignOwnership from '../components/AssignOwnership.react'

describe('<AssignOwnership /> Test Suite', () => {
    const tempData = [
        {
          "spaceId": "workspace1",
          "displayName": "Lightning strike",
          "transferableMembers": [
            {
              "_id": "user2",
              "name": "Ryan Lynch"
            },
            {
              "_id": "user3",
              "name": "Riker Lynch"
            },
            {
              "_id": "user4",
              "name": "Rydel Lynch"
            }
          ]
        },
        {
          "spaceId": "workspace2",
          "displayName": "Time machine",
          "transferableMembers": [
            {
              "_id": "user5",
              "name": "Edward Bayer",
              "workspaceId": "workspace3"
            },
            {
              "_id": "user6",
              "name": "Eli Brook",
              "workspaceId": "workspace3"
            }
          ]
        }
      ]
    
   const assignOwnership = shallow(<AssignOwnership workspace={tempData} />)
    it('test', () => {
        expect(assignOwnership.find('div')).toHaveLength(1);
    })

})