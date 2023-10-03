---
title: Salesforce Code Analyzer
permalink: /
redirect_from: /en/v3.x/
lang: en
---

<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-text-heading_small slds-theme_info" role="alert">
  <span class="slds-assistive-text">success</span>
    We're constantly improving Salesforce Code Analyzer. Tell us what you think!
    &nbsp;&nbsp;
    <a href="https://research.net/r/SalesforceCA" target="_blank"><button class="slds-button slds-button_brand">Give Feedback</button></a>
</div>
<br>

<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-text-heading_small slds-text-align_center slds-theme_success" role="alert">
  <span class="slds-assistive-text">success</span>
  	Salesforce Code Analyzer (v{{ site.data.versions-v3.scanner }}) is available. Release date: {{ site.data.versions-v3.releasedon }} &nbsp;&nbsp;<a href="./en/v3.x/release-information/">Release Information</a>
</div>
<br>

<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-text-heading_small slds-text-align_center slds-theme_success" role="alert">
  <span class="slds-assistive-text">success</span>
  	Salesforce Code Analyzer Visual Studio Code Extension (v{{ site.data.versions-v3.extension }}) is available. Requires Code Analyzer v{{ site.data.versions-v3.extensioncompatiblescanner }} or later. Release date: {{ site.data.versions-v3.extensionreleasedon }}
</div>
<br>


## Salesforce Code Analyzer

Salesforce Code Analyzer (Code Analyzer) is a unified tool for source code analysis. Code Analyzer analyzes multiple languages. It relies on a consistent command-line interface and produces a results file of rule violations. Use the results to review and improve your code.

If you’re listing a managed package on AppExchange, it must pass security review. You’re also required to upload your Salesforce Code Analyzer scan reports. Attach your Code Analyzer reports to your submission in the AppExchange Security Review Wizard. For more info, read about the [AppExchange Security Review](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide/security_review_overview.htm) and [Scan Your Code with Salesforce Code Analyzer](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide/security_review_code_analyzer_scan.htm).

Code Analyzer currently supports the [PMD rule engine](https://pmd.github.io/), [PMD Copy Paste Detector](https://pmd.github.io/latest/pmd_userdocs_cpd.html), [ESLint](https://eslint.org/), [RetireJS](https://retirejs.github.io/retire.js/), and [Salesforce Graph Engine](./en/v3.x/salesforce-graph-engine/introduction/).

Integrate Code Analyzer into your Continuous Integration/Continuous Development (CI/CD) process to enforce rules that you define and to produce high-quality code.

## Bugs, Feedback, and Feature Requests

To report Code Analyzer issues, create a [bug on GitHub](https://github.com/forcedotcom/sfdx-scanner/issues/new?template=Bug_report.md). To suggest a feature enhancement, create a [request on GitHub](https://github.com/forcedotcom/sfdx-scanner/issues/new?template=Feature_request.md) or provide feedback [here](https://www.research.net/r/SalesforceCA).

## See Also

- [Github Repository](https://github.com/forcedotcom/sfdx-scanner)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev)
- [Trailhead: Get Started with Salesforce DX](https://trailhead.salesforce.com/trails/sfdx_get_started)
