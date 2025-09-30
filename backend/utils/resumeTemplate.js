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
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background: #fff;
    color: #333;
  }
  .container {
    width: 100%;
    max-width: 850px;
    margin: 0 auto;
    display: flex;
    border: 1px solid #ddd;
  }
  .left-column {
    width: 30%;
    background: #f4f6f9;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
  }
  .left-column h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  .contact-info {
    font-size: 14px;
    margin-top: 10px;
    text-align: left;
  }
  .contact-info div {
    margin-bottom: 5px;
  }
  .social-links {
    margin-top: 10px;
    font-size: 13px;
    text-align: left;
  }
  .social-links a {
    color: #2980b9;
    text-decoration: none;
    display: block;
    margin-bottom: 5px;
  }
  .section-title {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #2980b9;
    text-align: left;
  }
  .skills-list {
    list-style: none;
    padding: 0;
    margin-top: 10px;
    text-align: left;
  }
  .skills-list li {
    background: #2980b9;
    color: #fff;
    padding: 5px 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    display: inline-block;
  }
  .right-column {
    width: 70%;
    padding: 20px;
    box-sizing: border-box;
  }
  .name {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 5px;
  }
  .summary {
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
  }
  .section {
    margin-bottom: 20px;
  }
  .section h3 {
    font-size: 18px;
    color: #2980b9;
    margin-bottom: 10px;
    border-bottom: 2px solid #eee;
    padding-bottom: 4px;
  }
  .item {
    margin-bottom: 12px;
  }
  .item-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  .item-subtitle {
    font-size: 14px;
    color: #555;
  }
  .item-duration {
    font-size: 13px;
    color: #999;
  }
  .item-description {
    font-size: 13px;
    color: #444;
    margin-top: 5px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="left-column">
      <h2>${name}</h2>
      <div class="contact-info">
        ${email ? `<div>Email: ${email}</div>` : ''}
        ${phone ? `<div>Phone: ${phone}</div>` : ''}
        ${address ? `<div>Address: ${address}</div>` : ''}
      </div>
      <div class="social-links">
        ${github ? `<a href="${github}" target="_blank">GitHub</a>` : ''}
        ${linkedin ? `<a href="${linkedin}" target="_blank">LinkedIn</a>` : ''}
        ${portfolio ? `<a href="${portfolio}" target="_blank">Portfolio</a>` : ''}
      </div>
      ${skills.length ? `
        <div class="section-title">Skills</div>
        <ul class="skills-list">
          ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      ` : ''}
    </div>
    <div class="right-column">
      <div class="name">${name}</div>
      ${summary ? `<div class="summary">${summary}</div>` : ''}
      
      ${experience.length ? `
        <div class="section">
          <h3>Experience</h3>
          ${experience.map(exp => `
            <div class="item">
              <div class="item-title">${exp.role || ''} at ${exp.company || ''}</div>
              <div class="item-duration">${exp.duration || ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${education.length ? `
        <div class="section">
          <h3>Education</h3>
          ${education.map(edu => `
            <div class="item">
              <div class="item-title">${edu.degree || ''}</div>
              <div class="item-subtitle">${edu.institution || ''}</div>
              <div class="item-duration">${edu.duration || ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${projects.length ? `
        <div class="section">
          <h3>Projects</h3>
          ${projects.map(proj => `
            <div class="item">
              <div class="item-title">${proj.name || ''}</div>
              <div class="item-description">${proj.description || ''}</div>
              ${proj.link ? `<a href="${proj.link}" target="_blank">${proj.link}</a>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

${achievements.length ? `
  <div class="section">
    <h3>Achievements</h3>
    ${achievements.map(ach => `
      <div class="item">
        <div class="item-title">${ach.title || ""}</div>
        <div class="item-description">${ach.description || ""}</div>
      </div>
    `).join('')}
  </div>
` : ''}

${socialEngagement.length ? `
  <div class="section">
    <h3>Social Engagement</h3>
    ${socialEngagement.map(se => `
      <div class="item">
        <div class="item-title">${se.title || ""}</div>
        <div class="item-description">${se.description || ""}</div>
      </div>
    `).join('')}
  </div>
` : ''}

    </div>
  </div>
</body>
</html>
`;
}
