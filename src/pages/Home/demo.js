export const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom',
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      background: 'transparent',
      foreColor: '#cbd5e1',
      fontFamily: 'inherit',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5,
      colors: ['#f43f5e', '#10b981', '#06b6d4']
    },
    markers: {
      size: 0,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#e2e8f0',
        fontFamily: 'inherit'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.15,
        stops: [0, 50, 100],
        colorStops: [
          {
            offset: 0,
            color: '#f43f5e',
            opacity: 0.8
          },
          {
            offset: 50,
            color: '#10b981',
            opacity: 0.6
          },
          {
            offset: 100,
            color: '#06b6d4',
            opacity: 0.3
          }
        ]
      },
    },
    colors: ['#f43f5e', '#10b981', '#06b6d4'],
    grid: {
      borderColor: '#1e293b',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
          fontFamily: 'inherit'
        }
      },
      title: {
        text: 'Price',
        style: {
          color: '#cbd5e1',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'inherit'
        }
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
          fontFamily: 'inherit'
        }
      },
      axisBorder: {
        color: '#334155'
      },
      axisTicks: {
        color: '#334155'
      }
    },
    tooltip: {
      shared: false,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'inherit'
      },
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0)
        }
      },
      marker: {
        show: true
      },
      fillSeriesColor: true
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      floating: false,
      fontSize: '12px',
      fontFamily: 'inherit',
      fontWeight: 500,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: '#cbd5e1',
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      }
    }
  };


