import React, { useState } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

function PieChartWithPaddingAngle(props)  {
  const [value, setValue] = useState(props.count);
  const data = [
      { name: 'Group A', value: value },
      { name: 'Group B', value: 100-value-10 },
    ];
    const COLORS = ['#8884d8', '#282c34'];

    const style = {
      backgroundColor: '#8884d8',
      color: '#282c34',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
    };
  return (
    <>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
  <Label
    value={`${value}`}
    position="center"
    style={{ fontSize: 50 }}
  />
  <Label
    value={`/100`}
    position="center"
    dy={30}
    style={{ fontSize: 15 }}
  />
      </Pie>
    </PieChart>
    <button  style={style} onClick={() => setValue(value + 1)}>+</button>
    <button   style={style} onClick={() => setValue(value - 1)}>-</button>
    </>
  );
};

export default PieChartWithPaddingAngle;
