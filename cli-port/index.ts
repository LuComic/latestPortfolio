import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const args = process.argv;
const myArgs = args.slice(2);
const words = myArgs.filter((arg) => !arg.startsWith('-'));

function createFile(words: string[]) {
	const title = words.join(' ');
	let slug = title.toLowerCase().replaceAll(' ', '-');
	[':', ';', '.', ',', '?', '!'].forEach((char) => {
		slug = slug.replaceAll(char, '');
	});
	const file = slug + '.md';
	const now = new Date(Date.now());
	const date = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(
		2,
		'0'
	)}.${now.getFullYear()}`;

	const outputDir = path.join(os.homedir(), 'Documents/GitHub/pro-portfolio/static/thoughts');
	const outputFilePath = path.join(outputDir, file);

	fs.writeFile(outputFilePath, '# ' + title, 'utf8', (err) => {
		if (err) {
			console.error('Error writing file:', err);
			return;
		}
		console.log('Markdown file written successfully!');
	});

	const dataFilePath = path.join(process.cwd(), 'src/lib/data.ts');
	const dataFile = fs.readFileSync(dataFilePath, 'utf8');

	const newThoughtEntry = `\t{\n\t\thref: '${slug}',\n\t\tdate: '${date}',\n\t\tcontent: '${file}'\n\t}`;
	const updatedDataFile = dataFile.replace(
		/(export const thoughts: thoughtType\[\] = \[[\s\S]*?)(\n\];)/,
		`$1,\n${newThoughtEntry}$2`
	);

	fs.writeFile(dataFilePath, updatedDataFile, 'utf8', (err) => {
		if (err) {
			console.error('Error writing data file:', err);
			return;
		}
		console.log('Thought added to src/lib/data.ts');
	});
}

if (words.length > 0) {
	createFile(words);
} else {
	console.log('type the name of the thought');
}
