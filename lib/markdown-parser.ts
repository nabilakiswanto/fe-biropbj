export function enhanceMarkdownContent(markdown: string): string {
  if (!markdown) return ""

  let content = markdown

  // Remove leading spaces
  content = content.replace(/^( {4,})/gm, "")

  // VIDEO EMBED - Safe MP4 video player
  content = content.replace(/\[video\]([\s\S]*?)\[\/video\]/g, '{{VIDEO_START}}$1{{VIDEO_END}}')
  
  // DOCUMENT DOWNLOAD CARDS
  content = content.replace(/\[doc\]([\s\S]*?)\[\/doc\]/g, '{{DOC_START}}$1{{DOC_END}}')
  content = content.replace(/\[docx\]([\s\S]*?)\[\/docx\]/g, '{{DOCX_START}}$1{{DOCX_END}}')
  content = content.replace(/\[xls\]([\s\S]*?)\[\/xls\]/g, '{{XLS_START}}$1{{XLS_END}}')
  content = content.replace(/\[xlsx\]([\s\S]*?)\[\/xlsx\]/g, '{{XLSX_START}}$1{{XLSX_END}}')
  content = content.replace(/\[ppt\]([\s\S]*?)\[\/ppt\]/g, '{{PPT_START}}$1{{PPT_END}}')
  content = content.replace(/\[pptx\]([\s\S]*?)\[\/pptx\]/g, '{{PPTX_START}}$1{{PPTX_END}}')

  // IFRAME for PDFs and embeds
  content = content.replace(/\[iframe\]([\s\S]*?)\[\/iframe\]/g, '{{IFRAME_START}}$1{{IFRAME_END}}')
  content = content.replace(/\[pdf\]([\s\S]*?)\[\/pdf\]/g, '{{PDF_START}}$1{{PDF_END}}')
  content = content.replace(/\[iframe\s+height="(\d+)"\]([\s\S]*?)\[\/iframe\]/g, '{{IFRAME_HEIGHT_START}}$1||$2{{IFRAME_HEIGHT_END}}')

  // TEXT ALIGNMENT
  content = content.replace(/\[center\]([\s\S]*?)\[\/center\]/g, '{{CENTER_START}}$1{{CENTER_END}}')
  content = content.replace(/\[right\]([\s\S]*?)\[\/right\]/g, '{{RIGHT_START}}$1{{RIGHT_END}}')
  content = content.replace(/\[left\]([\s\S]*?)\[\/left\]/g, '{{LEFT_START}}$1{{LEFT_END}}')
  content = content.replace(/\[justify\]([\s\S]*?)\[\/justify\]/g, '{{JUSTIFY_START}}$1{{JUSTIFY_END}}')

  // DON'T normalize formatting here - it interferes with markdown processing
  // We'll handle it in parseMarkdown instead

  // Fix lists and headers spacing
  content = content.replace(/([^\n])(\n\* |\n\d+\. )/g, "$1\n$2")
  content = content.replace(/([^\n])(\n#+ )/g, "$1\n$2")

  return content
}

export function parseMarkdown(markdown: string): string {
  if (!markdown) return "";

  let html = markdown;

  const processDocUrl = (url: string): string => {
    url = url.trim();
    
    if (url.startsWith("/uploads") || url.startsWith("uploads")) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
      url = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
    
    return url;
  }

  const getFileName = (url: string): string => {
    const parts = url.split('/');
    let fileName = parts[parts.length - 1] || 'document';
    fileName = decodeURIComponent(fileName);
    return fileName;
  }

  // --- VIDEO PLAYER (MP4) ---
  html = html.replace(/\{\{VIDEO_START\}\}([\s\S]*?)\{\{VIDEO_END\}\}/g, (match, url) => {
    url = processDocUrl(url);
    const fileName = getFileName(url);
    
    return `<div class="my-6 not-prose">
      <div class="border-2 border-purple-200 dark:border-purple-800 rounded-lg overflow-hidden shadow-lg bg-black">
        <video controls class="w-full max-h-[600px]" controlsList="nodownload">
          <source src="${url}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
        <div class="bg-purple-50 dark:bg-purple-900/20 p-3 flex items-center justify-between border-t border-purple-200 dark:border-purple-800">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
            </svg>
            <span class="text-sm font-medium text-purple-900 dark:text-purple-100">${fileName}</span>
          </div>
          <a href="${url}" download class="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium">
            Download ⬇
          </a>
        </div>
      </div>
    </div>`;
  });

  // --- WORD DOCUMENTS ---
  const createWordCard = (url: string, fileType: string) => {
    url = processDocUrl(url);
    const fileName = getFileName(url);
    
    return `<div class="my-6 not-prose">
      <div class="border-2 border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
        <div class="flex items-center gap-4 p-6">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
              </svg>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">${fileName}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Dokumen Microsoft Word (.${fileType.toUpperCase()})</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2">
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Buka
            </a>
            <a href="${url}" download class="inline-flex items-center justify-center px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-md border border-blue-600 dark:border-blue-400 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>
    </div>`;
  };

  // --- EXCEL SPREADSHEETS ---
  const createExcelCard = (url: string, fileType: string) => {
    url = processDocUrl(url);
    const fileName = getFileName(url);
    
    return `<div class="my-6 not-prose">
      <div class="border-2 border-green-200 dark:border-green-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-gray-900">
        <div class="flex items-center gap-4 p-6">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">${fileName}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Dokumen Microsoft Excel (.${fileType.toUpperCase()})</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2">
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Buka
            </a>
            <a href="${url}" download class="inline-flex items-center justify-center px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-green-600 dark:text-green-400 text-sm font-medium rounded-md border border-green-600 dark:border-green-400 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>
    </div>`;
  };

  // PROCESS DOCUMENT MARKERS FIRST
  html = html.replace(/\{\{DOC_START\}\}([\s\S]*?)\{\{DOC_END\}\}/g, (match, url) => createWordCard(url, 'doc'));
  html = html.replace(/\{\{DOCX_START\}\}([\s\S]*?)\{\{DOCX_END\}\}/g, (match, url) => createWordCard(url, 'docx'));
  html = html.replace(/\{\{XLS_START\}\}([\s\S]*?)\{\{XLS_END\}\}/g, (match, url) => createExcelCard(url, 'xls'));
  html = html.replace(/\{\{XLSX_START\}\}([\s\S]*?)\{\{XLSX_END\}\}/g, (match, url) => createExcelCard(url, 'xlsx'));

  // --- PDF VIEWERS ---
  html = html.replace(/\{\{PDF_START\}\}([\s\S]*?)\{\{PDF_END\}\}/g, (match, url) => {
    url = processDocUrl(url);
    return `<div class="my-6 w-full pdf-embed-container not-prose">
      <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-t-lg flex items-center justify-between border border-red-200 dark:border-red-800">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm font-medium text-red-900 dark:text-red-100">Dokumen PDF</span>
        </div>
        <div class="flex gap-2">
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">Buka di Tab Baru ↗</a>
          <a href="${url}" download class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">Download ⬇</a>
        </div>
      </div>
      <div class="rounded-b-lg overflow-hidden shadow-lg border-x border-b border-red-200 dark:border-red-800">
        <iframe src="${url}" width="100%" height="800" frameborder="0" class="w-full" loading="lazy"></iframe>
      </div>
    </div>`;
  });

  // --- IFRAMES ---
  html = html.replace(/\{\{IFRAME_START\}\}([\s\S]*?)\{\{IFRAME_END\}\}/g, (match, url) => {
    url = processDocUrl(url);
    return `<div class="my-6 w-full rounded-lg overflow-hidden shadow-lg iframe-container not-prose"><iframe src="${url}" width="100%" height="600" frameborder="0" allowfullscreen class="w-full" loading="lazy"></iframe></div>`;
  });

  html = html.replace(/\{\{IFRAME_HEIGHT_START\}\}(\d+)\|\|([\s\S]*?)\{\{IFRAME_HEIGHT_END\}\}/g, (match, height, url) => {
    url = processDocUrl(url);
    return `<div class="my-6 w-full rounded-lg overflow-hidden shadow-lg iframe-container not-prose"><iframe src="${url}" width="100%" height="${height}" frameborder="0" allowfullscreen class="w-full" loading="lazy"></iframe></div>`;
  });

  // --- CODE BLOCKS (must come before other formatting) ---
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="not-prose"><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="not-prose">$1</code>');

  // --- IMAGES ---
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    src = src.trim().replace(/^['"]|['"]$/g, "");
    if (src.startsWith("/uploads") || src.startsWith("uploads")) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
      src = src.startsWith("/") ? `${baseUrl}${src}` : `${baseUrl}/${src}`;
    }
    return `<img src="${src}" alt="${alt || ""}" class="rounded-md my-4 max-w-full h-auto" />`;
  });

  // --- HEADINGS (before other formatting) ---
  html = html.replace(/^###### (.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^##### (.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // --- BOLD (before italic) ---
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // --- ITALIC ---
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\b_(.+?)_\b/g, "<em>$1</em>");

  // --- UNDERLINE ---
  html = html.replace(/<u>(.+?)<\/u>/g, "<u>$1</u>");

  // --- STRIKETHROUGH ---
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // --- LINKS (before lists) ---
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>');

  // --- BLOCKQUOTES ---
  html = html.replace(/^&gt;(.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">$1</blockquote>');
  html = html.replace(/^>(.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">$1</blockquote>');

  // --- LISTS ---
  html = html.replace(/^\* (.+)$/gm, "<li>$1</li>");
  html = html.replace(/^\- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  html = html.replace(/(<li>.*?<\/li>\n?)+/g, (match) => {
    return /^\d+\./.test(match) ? `<ul class="list-disc list-inside my-4">${match}</ul>` : `<ul class="list-disc list-inside my-4">${match}</ul>`;
  });

  // --- TEXT ALIGNMENT ---
  html = html.replace(/\{\{CENTER_START\}\}([\s\S]*?)\{\{CENTER_END\}\}/g, '<div class="text-center my-4">$1</div>');
  html = html.replace(/\{\{RIGHT_START\}\}([\s\S]*?)\{\{RIGHT_END\}\}/g, '<div class="text-right my-4">$1</div>');
  html = html.replace(/\{\{LEFT_START\}\}([\s\S]*?)\{\{LEFT_END\}\}/g, '<div class="text-left my-4">$1</div>');
  html = html.replace(/\{\{JUSTIFY_START\}\}([\s\S]*?)\{\{JUSTIFY_END\}\}/g, '<div class="text-justify my-4">$1</div>');

  // Clean up extra newlines
  html = html.replace(/\n{3,}/g, "\n\n");

  // --- PARAGRAPHS (last step) ---
  html = html.replace(/^(?!<[^>]+>)(.+)$/gm, (match, line) => {
    const trimmed = line.trim();
    if (
      !trimmed ||
      trimmed.startsWith('<') ||
      trimmed.includes('class="') ||
      trimmed.includes('not-prose') ||
      trimmed.includes('border-') ||
      trimmed.includes('container') ||
      trimmed.includes('href=') ||
      trimmed.includes('src=')
    ) {
      return match;
    }
    return `<p class="my-2">${trimmed}</p>`;
  });

  return html;
}
