const PptxGenJS = require('pptxgenjs');

async function createPresentation() {
  let pptx = new PptxGenJS();
  
  // Presentation Properties
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Antigravity IDE';
  pptx.company = 'NNMV';
  pptx.title = 'NNMV Dashboard Native Presentation';
  
  // Theme Setup
  const themeColors = {
    primary: '0F3D6E', // Deep Blue
    secondary: '087E8B', // Teal
    accent: '159957', // Green
    danger: 'D32F2F', // Red
    text: '333333',
    background: 'F4F6F8',
    white: 'FFFFFF',
    border: 'E2E8F0'
  };

  // ── Master Slide Definition (UI Shell) ──
  pptx.defineSlideMaster({
    title: 'DASHBOARD_UI',
    background: { fill: themeColors.background },
    objects: [
      // Sidebar
      { rect: { x: 0, y: 0, w: '20%', h: '100%', fill: { color: themeColors.primary } } },
      // Sidebar Title
      { text: { text: 'NNMV', options: { x: 0, y: '5%', w: '20%', h: '10%', color: 'FFFFFF', fontSize: 24, bold: true, align: 'center' } } },
      // Sidebar Menu Items
      { text: { text: 'Dashboard', options: { x: '5%', y: '20%', w: '15%', h: '5%', color: 'FFFFFF', fontSize: 14 } } },
      { text: { text: 'Works', options: { x: '5%', y: '27%', w: '15%', h: '5%', color: 'A0B2C6', fontSize: 14 } } },
      { text: { text: 'Analytics', options: { x: '5%', y: '34%', w: '15%', h: '5%', color: 'A0B2C6', fontSize: 14 } } },
      { text: { text: 'Reports', options: { x: '5%', y: '41%', w: '15%', h: '5%', color: 'A0B2C6', fontSize: 14 } } },
      // Header
      { rect: { x: '20%', y: 0, w: '80%', h: '10%', fill: { color: themeColors.white } } },
      { line: { x: '20%', y: '10%', w: '80%', h: 0, line: { color: themeColors.border, width: 1 } } }
    ]
  });

  // ── 1. Dashboard KPIs Slide ──
  let slide1 = pptx.addSlide({ masterName: 'DASHBOARD_UI' });
  slide1.addText('Dashboard Overview', { x: '22%', y: '2%', w: '40%', h: '6%', color: themeColors.primary, fontSize: 18, bold: true });
  
  // KPI Cards
  const kpiY = '15%';
  const kpiW = '17%';
  const kpiH = '15%';
  const kpis = [
    { title: 'Total Works', value: '50', icon: '📋', color: themeColors.primary, x: '22%' },
    { title: 'Sanctioned Amount', value: '₹4,50,00,000', icon: '💰', color: themeColors.accent, x: '41%' },
    { title: 'In Progress', value: '24', icon: '🚧', color: 'F59E0B', x: '60%' },
    { title: 'Delayed', value: '3', icon: '🔴', color: themeColors.danger, x: '79%' }
  ];

  kpis.forEach(kpi => {
    // Card Background
    slide1.addShape(pptx.ShapeType.rect, { 
      x: kpi.x, y: kpiY, w: kpiW, h: kpiH, 
      fill: { color: themeColors.white },
      line: { color: themeColors.border, width: 1 }
    });
    // KPI Title
    slide1.addText(kpi.title, { 
      x: kpi.x, y: '16%', w: kpiW, h: '5%', 
      color: '64748B', fontSize: 12, bold: true, align: 'center' 
    });
    // KPI Value
    slide1.addText(kpi.value, { 
      x: kpi.x, y: '22%', w: kpiW, h: '6%', 
      color: kpi.color, fontSize: 24, bold: true, align: 'center' 
    });
  });

  // Recent Activity Feed UI
  slide1.addShape(pptx.ShapeType.rect, { 
    x: '22%', y: '35%', w: '74%', h: '60%', 
    fill: { color: themeColors.white }, line: { color: themeColors.border, width: 1 }
  });
  slide1.addText('Recent Activity', { x: '24%', y: '37%', w: '40%', h: '5%', color: themeColors.primary, fontSize: 16, bold: true });
  
  const activities = [
    'Rajesh Kumar updated progress to 65% for Road Construction (Ward 12)',
    'Status changed to Completed for Pipeline Repair (Ward 5)',
    'New Work Assigned: Drainage System Setup to Suresh Sharma'
  ];
  
  activities.forEach((act, idx) => {
    slide1.addText(act, { 
      x: '24%', y: `${45 + (idx * 10)}%`, w: '70%', h: '5%', 
      color: themeColors.text, fontSize: 14, bullet: true 
    });
    slide1.addShape(pptx.ShapeType.line, {
      x: '24%', y: `${51 + (idx * 10)}%`, w: '70%', h: 0, line: { color: themeColors.border, width: 1 }
    });
  });


  // ── 2. Native Table Slide (Works Management) ──
  let slide2 = pptx.addSlide({ masterName: 'DASHBOARD_UI' });
  slide2.addText('Works Management', { x: '22%', y: '2%', w: '40%', h: '6%', color: themeColors.primary, fontSize: 18, bold: true });

  const tableData = [
    [
      { text: 'ID', options: { fill: themeColors.secondary, color: 'FFFFFF', bold: true } },
      { text: 'Work Name', options: { fill: themeColors.secondary, color: 'FFFFFF', bold: true } },
      { text: 'Ward', options: { fill: themeColors.secondary, color: 'FFFFFF', bold: true } },
      { text: 'Progress', options: { fill: themeColors.secondary, color: 'FFFFFF', bold: true } },
      { text: 'Status', options: { fill: themeColors.secondary, color: 'FFFFFF', bold: true } }
    ],
    ['NNMV-001', 'Main Road Construction', 'Ward 12', '75%', 'In Progress'],
    ['NNMV-002', 'Pipeline Repair', 'Ward 05', '100%', 'Completed'],
    ['NNMV-003', 'Street Light Setup', 'Ward 18', '20%', 'Delayed'],
    ['NNMV-004', 'Drainage Maintenance', 'Ward 02', '50%', 'In Progress'],
    ['NNMV-005', 'Park Renovation', 'Ward 25', '0%', 'Assigned']
  ];

  slide2.addTable(tableData, {
    x: '22%', y: '15%', w: '74%', h: '50%',
    colW: [1.5, 3.0, 1.0, 1.0, 1.5],
    border: { pt: 1, color: themeColors.border },
    fill: themeColors.white,
    fontSize: 14,
    align: 'left',
    valign: 'middle'
  });

  // ── 3. Analytics Charts Slide ──
  let slide3 = pptx.addSlide({ masterName: 'DASHBOARD_UI' });
  slide3.addText('Analytics & Insights', { x: '22%', y: '2%', w: '40%', h: '6%', color: themeColors.primary, fontSize: 18, bold: true });

  // Pie Chart (Works by Status)
  const pieData = [{
    name: 'Status',
    labels: ['Completed', 'In Progress', 'Delayed', 'Assigned'],
    values: [15, 25, 5, 5]
  }];
  
  slide3.addChart(pptx.charts.PIE, pieData, {
    x: '22%', y: '15%', w: '35%', h: '60%',
    chartColors: ['159957', '087E8B', 'D32F2F', 'A0B2C6'],
    dataLabelColor: 'FFFFFF',
    showLabel: true, showValue: true, showPercent: true,
    legendPos: 'b'
  });

  // Bar Chart (Works by Ward)
  const barData = [{
    name: 'Works per Ward',
    labels: ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'],
    values: [8, 12, 5, 10, 15]
  }];

  slide3.addChart(pptx.charts.BAR, barData, {
    x: '60%', y: '15%', w: '35%', h: '60%',
    chartColors: ['0F3D6E'],
    showTitle: true, title: 'Top Wards by Works Count',
    showValue: true, barDir: 'col'
  });

  // Save the presentation
  const fileName = 'NNMV_Native_UI_Mockup.pptx';
  await pptx.writeFile({ fileName: fileName });
  console.log(`Successfully generated ${fileName}`);
}

createPresentation().catch(err => {
  console.error("Error creating PPT:", err);
});
