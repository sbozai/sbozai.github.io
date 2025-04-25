
// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Section Animation (Three.js) ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), antialias: true });
    renderer.setSize(window.innerWidth, 400);
    renderer.setClearColor(0x003366);

    const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
    const material = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(vUv.x * 10.0 + uTime) * 0.15;
            pos.z += cos(vUv.y * 10.0 + uTime * 1.2) * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vec3 color1 = vec3(0.1, 0.4, 0.8);
            vec3 color2 = vec3(0.3, 0.7, 0.95);
            vec3 color = mix(color1, color2, sin(vUv.x * 10.0 + uTime * 1.5) * 0.5 + 0.5);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        uniforms: {
            uTime: { value: 0.0 }
        },
        wireframe: true
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        material.uniforms.uTime.value = performance.now() / 1000;
        plane.rotation.x = performance.now() / 3000;
        plane.rotation.y = performance.now() / 2000;
        renderer.render(scene, camera);
    }
    animate();


    // --- Hero Section Animation (Anime.js) ---
    anime.timeline({ loop: true })
      .add({
        targets: '.hero-title',
        opacity: [0,1],
        translateY: [-50, 0],
        duration: 1000,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.hero-subtitle',
        opacity: [0,1],
        translateY: [-30, 0],
        duration: 800,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.hero-tagline',
        opacity: [0,1],
        translateY: [-20, 0],
        duration: 600,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.cta-button',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .6)',
        offset: '-=500'
      });

      // --- Project Details ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.projectId;
            displayProjectDetails(projectId);
        });
    });

    function displayProjectDetails(projectId) {
        // In a real application, you would fetch the project details from a server
        // or from a local data source.  For this example, we'll just use some
        // hardcoded data.
        let projectDetails = {};
        if (projectId === 'project-1') {
            projectDetails = {
                title: 'Portfolio Optimization Dashboard',
                description: 'Developed an interactive dashboard to optimize portfolio allocation and assess risk using modern portfolio theory.',
                visuals: '<iframe src="https://your-tableau-dashboard-1.com" width="100%" height="400px"></iframe>', // Replace with actual embedded dashboard
                kpis: [
                    'Sharpe Ratio: 1.2',
                    'Annualized Return: 15%',
                    'Volatility: 10%'
                ],
                technologies: ['Python', 'Pandas', 'Tableau', 'React']
            };
        } else if (projectId === 'project-2') {
            projectDetails = {
                title: 'Market Trend Analysis Tool',
                description: 'Designed a tool to identify and visualize emerging market trends using time series analysis and machine learning techniques.',
                visuals: '<div id="market-trend-chart"></div>', // Placeholder for a chart
                kpis: [
                  "Accuracy of trend prediction: 92%",
                  "Time to identify new trend: 2 hours",
                  "Number of trends identified: 15"
                ],
                technologies: ['Python', 'NumPy', 'Scikit-learn', 'Matplotlib', 'JavaScript', 'D3.js']
            };
        }

        // Create a modal or a separate page to display the project details.  For
        // simplicity, we'll just update the existing content.
        const mainContent = document.querySelector('main');
        mainContent.innerHTML = `
            <section class="project-details">
                <h2>${projectDetails.title}</h2>
                <p>${projectDetails.description}</p>
                <div class="project-visuals">
                    ${projectDetails.visuals}
                </div>
                <div>
                    <h3>Key Performance Indicators</h3>
                    <ul>
                        ${projectDetails.kpis.map(kpi => `<li>${kpi}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3>Technologies Used</h3>
                    <ul>
                        ${projectDetails.technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
                <a href="#portfolio" class="back-to-portfolio">Back to Portfolio</a>
            </section>
        `;

        if (projectId === 'project-2') {
          // Render the chart.
          renderMarketTrendChart();
        }
    }

    function renderMarketTrendChart() {
      // Placeholder for chart rendering using D3.js
      const chartContainer = document.getElementById('market-trend-chart');
      if (chartContainer) {
        chartContainer.innerHTML = '<svg width="800" height="400"></svg>';
        const svg = d3.select(chartContainer).select('svg');

        const data = [
          { date: '2024-01', value: 100 },
          { date: '2024-02', value: 110 },
          { date: '2024-03', value: 125 },
          { date: '2024-04', value: 115 },
          { date: '2024-05', value: 130 },
          { date: '2024-06', value: 145 },
          { date: '2024-07', value: 140 },
          { date: '2024-08', value: 155 },
          { date: '2024-09', value: 165 },
          { date: '2024-10', value: 160 },
          { date: '2024-11', value: 175 },
          { date: '2024-12', value: 180 }
        ];

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        const parseDate = d3.timeParse("%Y-%m");
        data.forEach(d => {
          d.date = parseDate(d.date);
          d.value = +d.value;
        });

        x.domain(d3.extent(data, d => d.date));
        y.domain([0, d3.max(data, d => d.value)]);

        const line = d3.line()
          .x(d => x(d.date))
          .y(d => y(d.value));

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y));
      }
    }
});

console.log('Hello, welcome to my site!');
