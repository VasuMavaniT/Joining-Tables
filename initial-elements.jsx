import React from 'react';
import { MarkerType, Position } from 'reactflow';
// import jsondata from '../Data/data.json'; 
// import product_data from '../Data/product_table.json';
// import sales_data from '../Data/sales_table.json';

// console.log("jsondata:", jsondata);
// const output_data = jsondata["output_table"];
// console.log("output_data:", output_data);

export const errorNodes = [
  {
    id: 'product_table',
    type: 'custom',
    data: [{
      data: 'NO DATA FOUND',
    }],
    position: { x: 50, y: 100 },
  },
  {
    id: 'sales_table',
    type: 'custom',
    data: [{
      data: 'NO DATA FOUND',
    }],
    position: { x: 50, y: 300 },
  }
]

export const nodes = [
  {
    id: 'Merge',
    type: 'custom',
    data: [{
      label: 'Merging Node',
    }],
    position: { x: 400, y: 250 },
    sourcePosition: Position.Right, 
    targetPosition: Position.Left, 
  },
  {
    id: 'product_table',
    type: 'custom',
    position: { x: 50, y: 100 },
    data: [{
      Label: 'Product Table',
    }],
  },
  {
    id: 'sales_table',
    type: 'custom',
    position: { x: 50, y: 300 },
    data: [{
      Label: 'Sales Table',
    }],
  },
  {
    id: 'Output',
    type: 'custom',
    style: {
      background: '#63B3ED',
      color: 'white',
      width: 200,
    },
    data: [
      {
        label: 'Output Node',
      }
    ],
    position: { x: 700, y: 250 },
    // sourcePosition: Position.Right,
    // targetPosition: Position.Left,
  },
];

export const edges = [
  { id: 'Custom_1-Merging', source: 'product_table', target: 'Merge', label: 'From Node 1' },
  { id: 'Custom_2-Merging', source: 'sales_table', target: 'Merge', label: 'From Node 2' },
  { id: 'Merging-Output', source: 'Merge', target: 'Output', label: 'To Output Node' },
];
