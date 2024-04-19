import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import back from '../images/nav-Vector_bplam.svg';

const MultiLevelPieChart1 = ({ data }) => {
    const [selectedData, setSelectedData] = useState(data);
    const [levelData, setLevelData] = useState("Level 1");
    const filteredData = selectedData.filter(item => item.value !== 0 && item.label != 'Others');
    const [prevLevelData, setPrevLevelData] = useState(null);
    const [selectedLevel2, setSelectedLevel2] = useState(null);
    const [selectedLevel3, setSelectedLevel3] = useState(null);

    const handleItemClick = (item) => {
        if (item && item.level2) {
            setLevelData("Level 2");
            console.log(item.level2)
            setPrevLevelData(data);
            setSelectedData(item.level2);
            setSelectedLevel2(item.label)
        }
        else if (item && item.level3) {
            setLevelData("Level 3");
            console.log(item.level3)
            setPrevLevelData(selectedData);
            setSelectedData(item.level3);
            setSelectedLevel3(item.label)
        }
    };
    const fixedColors = [
        "#045DE9","#675dff","#63A4FF","#CD53AE","#0080bf",
        "#8900C5", "#BC01FF", "#D182FF", "#CD53AE", "rgba(135, 116, 255, 1)", "#6961B2",
        "rgba(76, 221, 239, 1)", "rgba(135, 116, 255, 1)", "rgba(22, 91, 170, 1)", "rgba(161, 85, 185, 1)", "rgba(46, 156, 220, 1)", "rgba(116, 123, 169, 0.3)",
        "#f5f5f5",
        "#eeeeee",
        "#e0e0e0",
        "#bdbdbd",
        "#9e9e9e",
        "#7f7f7f",
        "#696969",
        "#434343",
        "#262626",
        "#1a1a1a"
    ];

    const getCustomColor = (index) => {
        // Add your custom color logic here
        // You can use any method to generate colors dynamically
        // Example: return 'rgba(255, 0, 0, 0.7)' for red color
        // return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
        return fixedColors[index % fixedColors.length];
    };

    const chartData = {
        datasets: [
            {
                data: filteredData.map((item) => item.value),
                backgroundColor: filteredData.map((_, index) => getCustomColor(index)),
            },
        ],
        labels: filteredData.map((item) => item.label),
    };
    const truncate = (text, maxLength) => {
        if (chartData.datasets[0].data.length > 4) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
        }
        return text;
    };
    const handlePrevLevelClick = () => {
        if (levelData === "Level 2") {
            setSelectedData(data);
            setLevelData("Level 1");
            // setPrevLevelData(null);
        } else if (levelData === "Level 3") {
            setSelectedData(prevLevelData);
            setLevelData("Level 2");
            // setPrevLevelData(null);
        }
    };

    return (
        <div style={{ marginTop: "10px", minHeight:"80vh" }}>
            <div style={{display:"flex"}}>
                <p className='bplam-header-barchart'>Ticket Count by {levelData} Business Process</p>
                {/* <button className='clear-bplam-pie'>Clear</button> */}
                {prevLevelData && (
                    <div style={{display:'flex', flexDirection:'row', marginTop: '30px', marginLeft : '-250px',height:'20px'}}>
                        <div><img src={back} className='bplam-back' onClick={handlePrevLevelClick} title='Back to previous level' style={{display: levelData === "Level 1" ? 'none' : true , marginLeft: '-15px',marginTop:'-10px'}}/></div>
                        <div>
                     {levelData === "Level 2" && (
                        <div>
                        <p style={{fontSize:'12px'}}>Selected Level 2: {selectedLevel2}</p>
                        </div>
                    )}
                    {levelData === "Level 3" && (
                        <div>                    
                        <p style={{fontSize:'12px'}}>Selected Level 3: {selectedLevel3}</p>
                        </div>
                    )}
                    </div>
                  </div> 
                )}
            </div>
            <div style={{ marginTop:"10px"}}>
                <Pie
                    data={chartData}
                    height={350} // Set the desired height
                    width={300} // Set the desired width
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        onClick: (_, elements) => {
                            if (elements.length > 0) {
                                const dataIndex = elements[0].index;
                                const item = selectedData[dataIndex];
                                handleItemClick(item);
                            }
                        },
                        elements: {
                            arc: {
                                borderColor: "#FFFFFF",
                                borderWidth:'0.5',
                            }
                        },
                        datasets: {
                            pie: {
                                backgroundColor: "#FFFFFF",
                                borderAlign: "inner"
                            }
                        },
                        plugins: {
                            datalabels: {
                                labels: {
                                    value: {
                                        color: '#FFFFFF',
                                        //   backgroundColor: '#fff',
                                        //   borderColor: '#fff',
                                        //   borderWidth: 2,
                                        //   borderRadius: 4,
                                        padding: 0,
                                        align: 'bottom',
                                    },

                                },
                                formatter: (value, context) => {

                                    const label = context.chart.data.labels[context.dataIndex];
                                    let sum = 0;
                                    let dataArr = context.chart.data.datasets[0].data;
                                    dataArr.map(data => {
                                      sum += data;
                                    });
                                    let percentage = (value * 100 / sum).toFixed(0);
                                    return value !== 0 ? `${value} \n (${percentage}%)` : null;
                                    // return `${breakLabel(label)}: ${value} (${percentage}%)`;
                                    // return `${label}: ${value}%`; // Customize the output as needed
                                  },
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Customize background color
                                borderColor: 'rgba(255, 255, 255, 0.8)', // Customize border color
                                borderWidth: 1,
                                borderRadius:5,
                                padding: 2,
                                cursor: "pointer",
                                display: true,
                                color: "#FFFFFF",
                                align: "start",
                                anchor: 'end',
                                offset: 0,
                                textAlign: 'center',
                            },
                            legend: {
                                display: true,
                                position: 'right',
                                align: 'center',
                                // marginTop: '50px',
                                labels: {
                                    generateLabels: (chart) => {
                                        const originalLabels = chartData.labels; // access data.labels directly
                                        const truncatedLabels = originalLabels.map((label, index) => {
                                            return {
                                                text: truncate(label, 10),
                                                fontColor: "#FFFFFF",
                                                color: "#FFFFFF",
                                                font: {
                                                    size: 16
                                                },
                                                strokeStyle: "transparent",
                                                fillStyle: chartData.datasets[0].backgroundColor[index],
                                                ...chart.options.plugins.legend.labels.generateLabels[0],
                                            };
                                        });
                                        return truncatedLabels;
                                    },
                                    boxWidth: 15,
                                    // color: 'rgb(255, 99, 132)',
                                    align: "left",
                                    padding: levelData === "Level 1" ? 35:35,
                                    // layout: {
                                        // padding: {
                                        //   left: 10,
                                        //   right: 20,
                                        //   top: 35,
                                        //   bottom: 5,
                                        // },
                                    //   },
                                    
                                },
                                position: 'bottom',
                            },
                        }
                    }}
                //   plugins={[htmlLegendPlugin]}
                />
               
            </div>
        </div>
    );
};

export default MultiLevelPieChart1;
