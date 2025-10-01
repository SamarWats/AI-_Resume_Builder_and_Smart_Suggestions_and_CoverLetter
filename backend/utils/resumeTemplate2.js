export default function generateResumeHTML(resume) {
    const { details = {} } = resume;
    const {
        name = 'Your Name',
        summary = '',
        email = '',
        phone = '',
        address = '',
        github = '',
        linkedin = '',
        portfolio = '',
        skills = [],
        experience = [],
        education = [],
        projects = [],
        achievements = [],
        socialEngagement = []
    } = details;


    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Resume</title>
            <style>
                body {
                    font-family: "Times New Roman", serif;
                    margin: 40px;
                    padding: 0;
                    background: #fff;
                    color: #000;
                    line-height: 1.6;
                }
                h1 {
                    font-size: 28px;
                    text-align: center;
                    margin-bottom: 5px;
                }       
                .contact {
                    text-align: center;
                    font-size: 14px;
                    margin-bottom: 20px;
                }
                .contact a {
                    color: #000;
                    text-decoration: none;
                    margin: 0 8px;
                }
                h2 {
                    font-size: 18px;
                    margin-top: 25px;
                    margin-bottom: 5px;
                    border-bottom: 1px solid #000;
                    text-transform: uppercase;
                }
                .section {
                    margin-bottom: 15px;
                }
                .item {
                  margin-bottom: 12px;
                }
                .item-title {
                  font-weight: bold;
                  font-size: 15px;
                }
                .item-subtitle {
                  font-style: italic;
                  font-size: 14px;
                  color: #444;
                }
                .item-duration {
                  float: right;
                  font-size: 13px;
                  color: #666;
                }
                ul {
                  margin: 5px 0 0 20px;
                  padding: 0;
                  font-size: 14px;
                }
                ul li {
                  margin-bottom: 4px;
                }
            </style>

            </head>
<body>
  <h1>${name}</h1>
  <div class="contact">
    ${linkedin ? `<a href="${linkedin}" target="_blank">LinkedIn</a>` : ''}
    ${github ? `<a href="${github}" target="_blank">GitHub</a>` : ''}
    ${email ? `<a href="mailto:${email}">${email}</a>` : ''}
    ${phone ? `<span>${phone}</span>` : ''}
    ${portfolio ? `<a href="${portfolio}" target="_blank">Portfolio</a>` : ''}
  </div>

  ${education.length ? `
    <div class="section">
      <h2>Education</h2>
      ${education.map(edu => `
        <div class="item">
          <div class="item-title">${edu.institution || ''} 
            ${edu.duration ? `<span class="item-duration">${edu.duration}</span>` : ''}
          </div>
          <div class="item-subtitle">${edu.degree || ''}</div>
          ${edu.description ? `<div>${edu.description}</div>` : ''}
        </div>
      `).join('')}
    </div>
    
    `: ''}

    ${projects.length ? `
    <div class="section">
      <h2>Projects</h2>
      ${projects.map(proj => `
        <div class="item">
          <div class="item-title">${proj.name || ''}
            ${proj.link ? `<a href="${proj.link}" target="_blank"> [Link]</a>` : ''}
          </div>
          ${proj.details && proj.details.length ? `
            <ul>
              ${proj.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
  ` : ''}

  ${achievements.length ? `
    <div class="section">
      <h2>Achievements</h2>
      <ul>
        ${achievements.map(ach => `<li>${ach}</li>`).join('')}
      </ul>
    </div>
  ` : ''}

  ${positions.length ? `
    <div class="section">
      <h2>Positions of Responsibility</h2>
      ${positions.map(pos => `
        <div class="item">
          <div class="item-title">${pos.title || ''}</div>
          <div class="item-subtitle">${pos.organization || ''}</div>
          ${pos.description ? `<div>${pos.description}</div>` : ''}
        </div>
      `).join('')}
    </div>
  ` : ''}

</body>
</html>
`;
}