const fs = require('fs');

function convertToMarkdown(transcript, guestName) {
  const speakers = {
    'Speaker 1': 'Robbie Wagner',
    'Speaker 2': 'Chuck Carpenter',
    'Speaker 3': guestName,
  };

  const lines = transcript.split('\n');
  let markdown = '';

  for (const line of lines) {
    const match = /^(\d+:\d+:\d+) - (Speaker \d+)$/.exec(line);
    if (match) {
      const timestamp = match[1];
      const speaker = speakers[match[2]];

      markdown += `**${speaker}:** [${timestamp}]\n`;
    } else {
      markdown += `${line}\n`;
    }
  }

  return markdown.trim();
}

// Read the transcript from an external file specified as an argument
const filePath = process.argv[2];
const transcript = fs.readFileSync(filePath, 'utf-8');

// Get the guest name and Markdown filename from the command line arguments
const guestName = process.argv[3];
const markdownFilename = process.argv[4]
  ? `${process.argv[4]}.md`
  : 'transcriptConverted.md';

const markdown = convertToMarkdown(transcript, guestName);

// Save the markdown to a file
fs.writeFileSync(markdownFilename, markdown);
