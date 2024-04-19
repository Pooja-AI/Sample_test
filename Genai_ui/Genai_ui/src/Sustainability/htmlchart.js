import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import Chart from 'chart.js/auto';

const SustainabilityReport = ({ responseHtml }) => {
  const [scriptError, setScriptError] = useState(null);

  useEffect(() => {
    const scriptContent = extractScriptContent(responseHtml);

    if (scriptContent) {
      if (typeof Chart !== 'undefined') {
        // Delay script execution by 100 milliseconds
        setTimeout(() => {
          try {
            // Execute the script
            new Function(scriptContent)();
          } catch (error) {
            // Handle script execution error
            console.error('Script execution error:', error);
            setScriptError(error.message);
          }
        }, 100);
      }
    } else {
      console.log('No script tags found in the HTML content.');
    }
  }, [responseHtml]);

  function extractScriptContent(responseHtml) {
    const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
    const matches = responseHtml.match(scriptRegex);

    if (matches) {
      const scriptContent = matches[0].replace(/<script>([\s\S]*?)<\/script>/, '$1');
      return scriptContent;
    }

    return null; // No script tags found
  }

  return (
    <div className='sus-html'>
      <Helmet>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </Helmet>
      {parse(responseHtml)}
     
    </div>
  );
};

export default SustainabilityReport;
