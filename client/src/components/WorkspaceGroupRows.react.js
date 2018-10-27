import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

const WorkspaceGroupRows = props =>
  !props.shouldDisplay ? null : (
    <div>
      <h3>{props.groupTitle}</h3>
      <div>
        {_.map(props.workspaces, workspace => (
          <div key={workspace.spaceId} style={{ marginTop: '1rem' }}>
            <span>Workspace: {workspace.displayName} {workspace.spaceId === 'workspace1' ? <div style={{color:'red'}}>{props.canSelect}</div> : null}</span>
            <span>
              {React.Children.count(props.children) === 0
                ? null
                : React.cloneElement(props.children, { workspace })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
WorkspaceGroupRows.propTypes = {
  groupTitle: PropTypes.string,
  workspaces: PropTypes.array.isRequired,
  children: PropTypes.node,
  shouldDisplay: PropTypes.bool,
}

export default WorkspaceGroupRows

