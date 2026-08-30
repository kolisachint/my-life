// Sachin_Koli_OnePager.docx — the editable twin of Sachin_Koli_OnePager.pdf.
// One page, first person, for a referrer forwarding him to a hiring manager.
const S = require('./style');
const { Paragraph, TextRun, BorderStyle, ShadingType } = S.docx;

// The numbered claims on the one-pager are the load-bearing part: a big teal
// numeral, a claim in a sentence, then the evidence. Rendered here as a
// heading-plus-paragraph pair rather than a list, so he can edit either half.
function claim(n, title, body) {
  return [
    new Paragraph({
      keepNext: true,
      spacing: { before: 130, after: 10, line: 240 },
      children: [
        new TextRun({ text: n + '   ', bold: true, size: S.pt(12), color: S.TEAL, font: S.FONT }),
        new TextRun({ text: title, bold: true, size: S.pt(10.5), color: S.INK, font: S.FONT }),
      ],
    }),
    S.para(body, { indent: { left: 300 }, after: 40 }),
  ];
}

module.exports = function onePager() {
  const c = [];

  c.push(S.name('Sachin Koli'));
  c.push(S.subtitle('Solution Architect — Cloud Data & AI Platforms', { size: S.pt(11.5) }));
  c.push(S.subtitle('Google Cloud Certified — Professional Data Engineer',
    { size: S.pt(9.5), color: '35424A', after: 0 }));
  c.push(S.contact([
    'Pune, India', '+91 95522 36200', 'kolisachint@gmail.com',
    'linkedin.com/in/kolisachint', 'github.com/kolisachint',
  ], { size: S.pt(9.5) }));

  c.push(S.heading('What I do', { before: 80 }));
  c.push(S.para('I architect enterprise data platforms on Google Cloud. Right now that means the batch and real-time streaming platform for a **UK tier-1 retail bank** — event-driven ingestion on **Confluent Kafka**, orchestration across **Cloud Composer** and a legacy enterprise scheduler, modelling in **BigQuery and dbt**, the whole estate provisioned with **Terraform** and deployed through CI/CD.', { size: S.pt(10.5), after: 80 }));
  c.push(S.para('The hard part is not the tools. It is making a modern cloud stack and a twenty-year-old on-premise estate agree with each other, reliably, every night.'));

  c.push(S.heading('Three things worth knowing'));
  claim('1', 'I have taken real money out of real systems.',
    'A customer preference API I designed on GCP — App Engine, Pub/Sub, DataFlow, BigQuery — served millions of customers and **removed $600,000 a year** in operating cost. I also migrated an enterprise data lake from **Teradata to BigQuery** and replaced licensed tooling with cloud-native across five stacks.').forEach((p) => c.push(p));
  claim('2', 'Award-winning payments work.',
    'Before the data platform I spent four years on digital cards at the same bank. The self-serve fraud journey I architected won at the **Banking Tech Awards 2024** and the **Card & Payments Awards 2025** — it took fraud reporting out of the call-centre queue and gave it to the customer.').forEach((p) => c.push(p));
  claim('3', 'I ship applied AI in the open.',
    '**hoocode**, a deterministic terminal coding agent **published to npm**, with a unified LLM API across 25+ providers. Underneath it, Rust: **embeddingsearchtools** — ONNX inference, an **HNSW index written from scratch** and BM25 fusion for hybrid retrieval — plus offline speech recognition and token-efficient web retrieval.  `github.com/kolisachint`').forEach((p) => c.push(p));

  c.push(S.heading('The stack'));
  c.push(S.para('GCP (BigQuery, Cloud Composer, DataFlow, Pub/Sub, App Engine)  ·  Confluent Kafka  ·  Apache Airflow  ·  dbt  ·  Terraform  ·  Python, SQL  ·  AWS  ·  microservices and API architecture  ·  Teradata, Oracle, Greenplum', {
    size: S.pt(9.5),
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: S.WASH },
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: S.TEAL, space: 6 } },
    after: 40,
  }));

  c.push(S.heading('What I am looking for'));
  c.push(S.para('A **Solution / Data / Cloud Architect** role where the **data platform is the product** rather than the delivery vehicle — product companies, payments businesses, GCCs. Pune or Bengaluru, or remote. Especially interested in teams putting ML or retrieval on top of a serious data platform — that is the layer I already build for myself.'));

  c.push(S.heading('Background'));
  c.push(S.para('18 years, all in enterprise data  ·  **Google Cloud Certified Professional Data Engineer**  ·  BE Computer Science & Engineering, Walchand College of Engineering, Sangli  ·  Currently **Tata Consultancy Services**; previously Sears, Cognizant, Mahindra Satyam  ·  Clients: **Lloyds Banking Group, Sears Holdings, Saudi Telecom, Barclays, Telstra**',
    { size: S.pt(9.5), color: '4A545C' }));

  return S.makeDoc({
    children: c,
    title: 'Sachin Koli — One Pager',
    description: 'Editable Word copy of Sachin_Koli_OnePager.pdf.',
    margin: { top: 800, right: 850, bottom: 800, left: 850 },
  });
};
