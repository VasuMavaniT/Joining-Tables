import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { fetch_table_data, fetch_product_data, fetch_sales_data, fetch_output_data, fetch_join_data, fetch_query_data } from './Data/Scripts';
// import jsondata from './Data/data.json';

const proOptions = { hideAttribution: true };

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

  useEffect(() => {
    // Fetch all the necessary data using Promise.all
    const str1 = "product_table";
    const str2 = "sales_table";
    fetch_table_data(str1, str2)
    .then((data) => {
      console.log("data fetched from function is:", data);
      // Update the state with the fetched data

      const productdata = data.product_table;
      const salesdata = data.sales_table;
      const outputdata = data.output_table;
      const joindata = data.joins_list;
      const querydata = data.query;
      
      // setProductData(data.table1);
      // setSalesData(data.table2);
      // setOutputData(data.output_table);
      // setJoinData(data.joins_list);
      // setQueryData(data.query);
      console.log("product_data:", productdata);
      console.log("sales_data:", salesdata);
      console.log("output_data:", outputdata);
      console.log("join_data:", joindata);
      console.log("query_data:", querydata);

      // Modify the existing nodes based on the current data
      const updatedNodes = nodes.map((node) => {
        if (node.id === 'product_table') {
          node.data = productdata;
        } else if (node.id === 'sales_table') {
          node.data = salesdata;
        } else if (node.id === 'Output') {
          node.data = outputdata;
        } else if (node.id === 'Merge') {
          // Concat data of join and query
          // node.data = joinData.concat(queryData);
          node.data = joindata;
          const queryDataObject = {
            "Query": querydata
          };
          node.data.push(queryDataObject);
          // node.data["query"] = querydata;
          {console.log("Value of node.data is:", node.data)}
          setJoinData(node.data);
        }

        return node;
      });

      setNodes(updatedNodes);
    });
  }, []);


  
  // const edgesWithUpdatedTypes = edges.map((edge) => {
  //   if (edge.sourceHandle) {
  //     const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
  //     edge.type = edgeType;
  //   }

  //   return edge;
  // });

  // const edgesWithUpdatedTypes = edges.map((edge) => {
  //   console.log("Value of join data is:", join_data);
  //   if (join_data.length != 0) 
  //   {
  //     if (edge.id === 'Custom_1-Merging') {
  //       edge.label = join_data[0]["column_name"];
  //     } else if (edge.id === 'Custom_2-Merging') {
  //       edge.label = join_data[1]["column_name"];
  //     }
  // }

  //   return edge;
  // });

  const edgesWithUpdatedTypes = edges.map((edge) => {
    console.log("Value of join data is:", join_data);
    if (join_data.length !== 0) {
      if (edge.id === 'Custom_1-Merging') {
        const custom1Columns = join_data
          .filter((item) => item.table_name === 'product_table')
          .map((item) => item.column_name)
          .join(', ');
        edge.label = custom1Columns;
      } else if (edge.id === 'Custom_2-Merging') {
        const custom2Columns = join_data
          .filter((item) => item.table_name === 'sales_table')
          .map((item) => item.column_name)
          .join(', ');
        edge.label = custom2Columns;
      }
    }
    return edge;
  });
  

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
        proOptions={proOptions}
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
