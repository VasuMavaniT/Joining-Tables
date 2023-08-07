import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { Modal } from 'antd';
import { fetch_product_data, fetch_sales_data, fetch_output_data, fetch_join_data, fetch_query_data } from './Data/Scripts';
import jsondata from './Data/data.json';

const fetchDataFromBackend = () => {
  console.log("Fetching data from backend");
}

const { query_data } = jsondata["query"];

import { nodes as initialNodes, edges as initialEdges, errorNodes } from './Nodes/initial-elements';
import CustomNode from './Nodes/CustomNode';

import 'reactflow/dist/style.css';
import './Nodes/overview.css';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

// const product_data = fetch_product_data();
// const sales_data = fetch_sales_data();
// const output_data = fetch_output_data(product_data, sales_data);

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [product_data, setProductData] = useState([]);
  const [sales_data, setSalesData] = useState([]);
  const [output_data, setOutputData] = useState([]);
  const [join_data, setJoinData] = useState([]);
  const [query_data, setQueryData] = useState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // useEffect(() => {
  //   console.log("Fetching data from backend");
  //   fetch_product_data().then((data) => {
  //     console.log("product_data:", data);
  //     // setProductData(data);
  //   });
  //   fetch_sales_data().then((data) => {
  //     console.log("sales_data:", data);
  //     // setSalesData(data);
  //   }
  //   );
  //   fetch_output_data().then((data) => {
  //     console.log("output_data:", data);
  //     // setOutputData(data);
  //   }
  //   );
  //   fetch_join_data().then((data) => {
  //     console.log("join_data:", data);
  //     // setJoinData(data);
  //   }
  //   );
  //   fetch_query_data().then((data) => {
  //     console.log("query_data:", data);
  //     // setQueryData(data);
  //   }
  //   );

  //   console.log("Fetching data from backend complete");
  //   // Modify the existing nodes based on current data

  //   const updatedNodes = nodes.map((node) => {
  //     if (node.id === 'product_table') {
  //       node.data = product_data;
  //       console.log("Updating product table data");
  //     }
  //     else if (node.id === 'sales_table') {
  //       node.data = sales_data;
  //       console.log("Updating sales table data");
  //     }
  //     else if (node.id === 'output_table') {
  //       node.data = output_data;
  //       console.log("Updating output table data");
  //     }
  //     else if (node.id === 'Merge') {
  //       node.data = join_data;
  //       console.log("Updating join table data");
  //     }

  //     return node;
  //   });

  //   setNodes(updatedNodes);

  // }, []);

  // Inside OverviewFlow component

useEffect(() => {
  console.log("Fetching data from backend");

  // Fetch all the necessary data using Promise.all
  Promise.all([
    fetch_product_data(),
    fetch_sales_data(),
    fetch_output_data(),
    fetch_join_data(),
    fetch_query_data()
  ]).then(([productData, salesData, outputData, joinData, queryData]) => {
    console.log("product_data:", productData);
    console.log("sales_data:", salesData);
    console.log("output_data:", outputData);
    console.log("join_data:", joinData);
    console.log("query_data:", queryData);

    // Update the state with the fetched data
    setProductData(productData);
    setSalesData(salesData);
    setOutputData(outputData);
    setJoinData(joinData);
    setQueryData(queryData);

    console.log("Fetching data from backend complete");

    // Modify the existing nodes based on the current data
    const updatedNodes = nodes.map((node) => {
      if (node.id === 'product_table') {
        node.data = productData;
        console.log("Updating product table data");
      } else if (node.id === 'sales_table') {
        node.data = salesData;
        console.log("Updating sales table data");
      } else if (node.id === 'output_table') {
        node.data = outputData;
        console.log("Updating output table data");
      } else if (node.id === 'Merge') {
        node.data = joinData;
        console.log("Updating join table data");
      }

      return node;
    });

    setNodes(updatedNodes);
  });
}, []);


  
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  const handleNodeClick = useCallback((event, node) => {
    if (node.id === 'Merge') {
      setIsModalOpen(true);
      setSelectedNodeId(node.id);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderModal = () => {
    if (!isModalOpen) return null;
    console.log("Inside render Modal function")
    // Use Ant Design Modal component directly here
    return (
      <Modal title="Data" open={isModalOpen} onOk={closeModal} onCancel={closeModal} footer={null}>
        <div>
          {Object.keys(query_data).map((key) => (
            <div key={key} className="modal__text">
              {key}: {query_data[key]}
            </div>
          ))}
        </div>
      </Modal>
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;
