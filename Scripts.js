const timeinterval = 60000;

// export const fetch_table_data = (table1, table2) => {
//     // Construct the URL with the provided tableName
//     const url = `http://127.0.0.1:7777/chatgpt?table1=${table1}&table2=${table2}`;
  
//     return new Promise((resolve, reject) => {
//       // Simulate the asynchronous behavior of fetching data
//       setTimeout(() => {
//         // Assuming you have an API call here that returns data asynchronously
//         fetch(url)
//           .then((response) => response.json())
//           .then((data) => {
//             resolve(data); // Resolve the Promise with the data
//           })
//           .catch((error) => {
//             reject(error); // Reject the Promise with the error, if any
//           });
//       }, timeinterval); // Simulate a delay before the data is returned
//     });
//   };

export const fetch_table_data = async (table1, table2) => {
    console.log("Fetching data"); 
    const url = `http://127.0.0.1:7777/jsonify?table1=${table1}&table2=${table2}`;
    
    const response = await fetch(url);
    return await response.json();
};
  

export const fetch_product_data = () => {
    return new Promise((resolve, reject) => {
      // Simulate the asynchronous behavior of fetching data
      setTimeout(() => {
        const product = [
          {
            "column_name": "id",
            "column_type": "integer",
            "nullable": "YES"
          },
          {
            "column_name": "product_name",
            "column_type": "string",
            "nullable": "NO"
          },
          {
            "column_name": "product_price",
            "column_type": "string",
            "nullable": "NO"
          },
          {
            "column_name": "product_in_stock",
            "column_type": "boolean",
            "nullable": "NO"
          }
        ];
        resolve(product); // Resolve the Promise with the data
      }, timeinterval); // Simulate a 1-second delay before the data is returned
    });
  };
  
  export const fetch_sales_data = () => {
    return new Promise((resolve, reject) => {
      // Simulate the asynchronous behavior of fetching data
      setTimeout(() => {
        const sales = [
          {
            "column_name": "id",
            "column_type": "integer",
            "nullable": "YES"
          },
          {
            "column_name": "product_id",
            "column_type": "integer",
            "nullable": "NO"
          },
          {
            "column_name": "total_sales",
            "column_type": "integer",
            "nullable": "NO"
          },
        ];
        resolve(sales); // Resolve the Promise with the data
      }, timeinterval); // Simulate a 1.5-second delay before the data is returned
    });
  };
  

  export const fetch_join_data = () => {
    return new Promise((resolve, reject) => {
      // Simulate the asynchronous behavior of fetching data
      setTimeout(() => {
        const join = [
          {
            "table_name": "product_table",
            "column_name": "id"
          },
          {
            "table_name": "sales_table",
            "column_name": "product_id"
          }
        ];
        resolve(join); // Resolve the Promise with the data
      }, timeinterval); // Simulate a 1-second delay before the data is returned
    });
  };

export const fetch_output_data = () => {
    return new Promise((resolve, reject) => {
      // Simulate the asynchronous behavior of fetching data
      setTimeout(() => {
        const output = [
          {
            "column_name": "product_name",
            "column_type": "string",
            "nullable": "NO"
          },
          {
            "column_name": "total_sales",
            "column_type": "integer",
            "nullable": "NO"
          }
        ];
        resolve(output); // Resolve the Promise with the data
      }, timeinterval); // Simulate a 2-second delay before the data is returned
    });
  };
  

export const fetch_query_data = () => {
    return new Promise((resolve, reject) => {
      // Simulate the asynchronous behavior of fetching data
      setTimeout(() => {
        const query =
          "SELECT p.product_name, s.total_sales FROM product_table p JOIN sales_table s ON p.id = s.product_id;";
        resolve(query); // Resolve the Promise with the data
      }, timeinterval); // Simulate a 0.5-second delay before the data is returned
    });
  };
  