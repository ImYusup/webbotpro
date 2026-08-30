// src/app/api/meta/investing.xml/route.ts

import { investmentProjects } from "@/data/investing";

const BASE_URL = "https://webbotpro.com";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>

<title>WebBotPro Investing Opportunities</title>
<link>${BASE_URL}/investing</link>
<description>Transparent investment projects with profit sharing by WebBotPro</description>

${investmentProjects
  .map(
    (project) => `
<item>
  <g:id>${project.id}</g:id>

  <g:title><![CDATA[
${project.name}
  ]]></g:title>

  <g:description><![CDATA[
${project.description}

Business: ${project.businessName}
Category: ${project.category}
Status: ${project.status}
Duration: ${project.projectDuration}
Risk Level: ${project.riskLevel}
Target Profit Sharing: ${project.targetProfitSharing}
Minimum Investment: Rp ${project.minimumInvestment.toLocaleString("id-ID")}

Price shown in this catalog is for listing purposes only.
Final participation depends on project availability and agreement terms.
Contact us for more details.

⚠️ Investment involves risk. Profit sharing depends on verified business results and actual project performance. Returns are not guaranteed.
  ]]></g:description>

  <g:link>
${BASE_URL}/investing/${project.id}
  </g:link>

  <g:image_link>
${BASE_URL}${project.image}
  </g:image_link>

  <g:availability>in stock</g:availability>
  <g:condition>new</g:condition>
  <g:price>1 IDR</g:price>
  <g:brand>WebBotPro</g:brand>
  <g:product_type>${project.category}</g:product_type>
</item>
`
  )
  .join("")}

</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}