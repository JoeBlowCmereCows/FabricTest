import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import express from 'express';


const app = express();

const manifestDir = path.join(import.meta.dirname, '../manifest');
const manifestName = path.join(manifestDir, 'Org.MyWorkload.1.0.0.nupkg');

const buildDir = path.join(import.meta.dirname, '../build');

const port = 60006;

app.use(morgan('dev'));
app.use(cors());

app.options('/manifests_new', (req, res) => {

  res.sendStatus(204);

});

app.get('/manifests_new', (req, res) => { 
    
    res.header({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="ManifestPackage.1.0.0.nupkg"`,
    });

    res.sendFile(manifestName);

});

 app.get('/manifests_new/metadata', (req, res) => {

    res.header({
        'Content-Type': 'application/json',
    });

    const devParameters = {
        name: 'Org.MyWorkload',
        url: 'http://127.0.0.1:60006',
        devAADFEAppConfig: {
            appId: 'b2ee1e43-d3cd-40ea-96c1-936d2fc56b64',
        },
        devAADAppConfig: {
            appId: '',
            audience: '',
            redirectUri: null
        },
        devSandboxRelaxation: false
    };

    res.end(JSON.stringify({ extension: devParameters }));

 });

app.use(express.static(buildDir));

app.get(['/', '/myItem-editor', '/close'], (req, res) => {
    res.sendFile(path.join(buildDir, 'index.html'));
});

// 404
app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.url} - no matching route`);
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`FE dev server running on http://localhost:${port}`);
});