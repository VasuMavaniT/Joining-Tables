import React, { memo, useState } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';
import { Modal, Typography } from 'antd';
import './overview.css'

function CustomNode({ id, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setElements, getConnectableEdges } = useReactFlow();
    const store = useStoreApi();

    const onNodeClick = () => {
        // Step 4: Trigger the modal toggle function when a custom node is clicked
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

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
      <div className="custom-node__header" onClick={onNodeClick}>
        <strong>{id}</strong>
      </div>

      {/* <div className="custom-node__body" onClick={onNodeClick}>
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
                  <span
                  key={idx}
                //   style={{ color: 'red'}}
                  style={{ color: value == 'id' ? 'red' : 'inherit' }}
                >
                {value}{' '}
                </span>
                ))}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div> */}

<div className="custom-node__body" onClick={onNodeClick}>
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
          {Object.entries(column).map(([key, value], idx) => (
            <span
              key={idx}
              style={{ color: key === 'id' ? 'red' : 'inherit' }}
            >
              {key === 'Query' ? '' : value}{' '}
            </span>
          ))}
          <br />
        </div>
      ))}
    </div>
  </div>
</div>


        {/* {isidMerge() ?
      <Modal title="Data" open={isModalOpen} onOk={closeModal} onCancel={closeModal} footer={null}> */}
          {/* <div>
            {Object.keys(data).map((key) => (
              <div key={key} className="modal__text">
                {key}: {data[key]}
              </div>
            ))}
          </div> */}
          {/* <div className="custom-node__text">
            {getColumnKeys().map((key) => (
              <span key={key}>
                {key}{' '}
              </span>
            ))}
            <br />
            {data.map((column, index) => (
              <div key={index} className="custom-node__text">
                {Object.values(column).map((value, idx) => (
                  <span
                  key={idx} }
                 style={{ color: 'red'}}
                //   style={{ color: value == 'id' ? 'red' : 'inherit' }}
                // >
                // {value}{' '}
                // {console.log("value:", value)}
                {/* </span>
                ))}
                <br />
              </div>
            ))}
            </div>
        </Modal> : false} */}

{/* {isidMerge() && (
  <Modal title="Data" visible={isModalOpen} onOk={closeModal} onCancel={closeModal} footer={null}>
    <div className="custom-node__text">
        {console.log("data:", data)}
        {data.map((column, index) => (
        <div key={index} className="custom-node__text">
          {Object.entries(column).map(([key, value], idx) => (
            <span
              key={idx}
              style={{ color: key === 'query' ? 'red' : 'inherit' }}
            >
              {value}{' '}
            </span>
          ))}
          <br />
        </div>
      ))}
    </div>
  </Modal>
)} */}

<Modal title="Data" open={isModalOpen} onOk={closeModal} onCancel={closeModal} footer={null}>
  <div className="custom-node__text">
    {console.log("Modal data:", data)}
    {data.map((column, index) => (
      <div key={index} className="custom-node__text">
        {column.Query ? (
          <span style={{ color: 'red' }}>{column.Query}</span>
        ) : null}
        <br />
      </div>
    ))}
  </div>
</Modal>



      <div className="custom-node__body" onClick={onNodeClick}>
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
