import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';


function CustomNode({ id, data }) {

    const isidOutput = () => {
        if (id === 'Output') {
            return true;
        }
        else {
            return false;
        }
    }

    const isidMerge = () => {
        if (id === 'Merge') {
            return true;
        }
        else {
            return false;
        }
    } 

    const getColumnKeys = () => {
        if (data.length === 0) {
          return [];
        }
        return Object.keys(data[0]);
      };

    const onConnect = (params) => {
        const { source, target, sourceHandle, targetHandle } = params;
        const sourceNodeId = source?.id;
        const targetNodeId = target?.id;
        const connectableEdges = getConnectableEdges({ type: 'smoothstep', sourceNodeId, targetNodeId, sourceHandle, targetHandle });
        const edgeType = connectableEdges?.[0]?.type;
    
        if (edgeType) {
          setElements((els) =>
            els.concat({
              id: `${sourceNodeId}-${targetNodeId}-${sourceHandle}-${targetHandle}`,
              source: sourceNodeId,
              sourceHandle,
              target: targetNodeId,
              targetHandle,
              type: edgeType,
              animated: true,
            })
          );
        }
      };

  return (
    <>
      <div className="custom-node__header">
        <strong>{id}</strong>
      </div>

      <div className="custom-node__body">
        <div className="custom-node__content">
          <div className="custom-node__text">
            {getColumnKeys().map((key) => (
              <span key={key}>
                {key}{' '}
              </span>
            ))}
            <br />
            {data.map((column, index) => (
              <div key={index} className="custom-node__text">
                {Object.values(column).map((value, idx) => (
                  <span key={idx}>
                    {value}{' '}
                  </span>
                ))}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="custom-node__body">
        {isidOutput() ? false : <Handle type="source" position={Position.Right} id="output" onConnect={onConnect} />}
            {/* <Handle type="source" position={Position.Right} id="output" onConnect={onConnect} /> */}
        {isidOutput() ? <Handle type="target" position={Position.Left} id="input" onConnect={onConnect}/> : false}
            {/* <Handle type="target" position={Position.Left} id="input" onConnect={onConnect}/> */}
        {isidMerge() ? <Handle type="source" position={Position.Right} id="output" onConnect={onConnect} /> : false}
        {isidMerge() ? <Handle type="target" position={Position.Left} id="input" onConnect={onConnect}/> : false}
      </div>

    </>
  );
}

export default memo(CustomNode);
