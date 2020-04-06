import {
     Tooltip,PieChart, Pie, Legend, Cell, CartesianGrid, Sector,
  } from 'recharts';
  
import React, { useState } from 'react';
import { inject, observer } from "mobx-react";
import { scaleOrdinal } from 'd3-scale';
import { schemeDark2 } from 'd3-scale-chromatic';
import { set } from 'mobx';

const colors = ['#EAC435','#ED1C24','#FE4E00','#F86624','#FFAE03','#EF8A17','#034732']

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#FE4E00">{`Sum ${value}`}</text>
      {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#FE4E00">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};
  
const PerProductChart = inject("generalStore")(
  observer(props => {
  
  const [activeIndex,setActiveIndex] = useState(0)

  const onPieEnter = (data, index) => {
    setActiveIndex(index)
  };



  return (
    <div id="pie-chart">
      
      
    <PieChart width={625} height={300} margin={{top: 0, right: 30, left: 20, bottom: 0}}>
    <Pie   activeIndex={activeIndex}
          activeShape={renderActiveShape} dataKey="number" isAnimationActive={true} data={props.data}  cx="30%" cy="50%" outerRadius={65} innerRadius={25} margin={{top: 0, right: 5, left: 20, bottom: 5,}} fill="#889E86" onMouseEnter={onPieEnter} >
    {
            props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))
          } 
      </Pie>
    {/* <Tooltip /> */}
    </PieChart>
    <h5>Number of orders per Product</h5>
    </div>
  );
}))
export default PerProductChart

