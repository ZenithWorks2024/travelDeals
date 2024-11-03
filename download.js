import fs from 'fs';
import archiver from 'archiver';
import path from 'path';

const output = fs.createWriteStream('project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', () => {
  console.log(`Archive created: ${archive.pointer()} total bytes`);
  console.log('Project has been zipped successfully!');
});

archive.on('error', (err) => {
  throw err;
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.pipe(output);

// Add files recursively
const addDirectoryToArchive = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    
    // Skip node_modules, .git, and the zip file itself
    if (file === 'node_modules' || file === '.git' || file === 'project.zip') {
      return;
    }
    
    if (fs.statSync(fullPath).isDirectory()) {
      archive.directory(fullPath, path.relative('.', fullPath));
    } else {
      archive.file(fullPath, { name: path.relative('.', fullPath) });
    }
  });
};

addDirectoryToArchive('.');

archive.finalize();