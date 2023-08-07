import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';


function MergeNode({ id, data }) {

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

      {/* Showing elements like license, desc, name, dob from data.json file */}
      <div className="custom-node__body">
        <div className="custom-node__content">
          {Object.keys(data).map((key) => (
            <div key={key} className="custom-node__text">
              {key}: {data[key]}
            </div>
          ))}
        </div>
      </div>

      <div className="custom-node__body">
        <Handle type="source" position={Position.Right} id="output" onConnect={onConnect} />
      </div>

    </>
  );
}

export default memo(MergeNode);
