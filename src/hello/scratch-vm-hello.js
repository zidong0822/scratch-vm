const ScratchVM = require("scratch-vm");
const ScratchRender = require("scratch-render");
const ScratchStorage = require("scratch-storage");
const ScratchAudio = require("scratch-audio");
const ScratchBlocks = require("scratch-blocks");

const canvas = document.getElementById('scratch-stage');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');

const vm = new ScratchVM();
const renderer = new ScratchRender(canvas);
const storage = new ScratchStorage();
const audioEngine = new ScratchAudio();

const workspace = ScratchBlocks.inject('blocks', {
        media: './media/',
        zoom: {
            controls: true,
            wheel: true,
            startScale: 0.75
        },
        colours: {
            workspace: '#334771',
            flyout: '#283856',
            scrollbar: '#24324D',
            scrollbarHover: '#0C111A',
            insertionMarker: '#FFFFFF',
            insertionMarkerOpacity: 0.3,
            fieldShadow: 'rgba(255, 255, 255, 0.3)',
            dragShadowOpacity: 0.6
        }
    });
//
// Assets Setting
//
const ASSET_SERVER = 'https://cdn.assets.scratch.mit.edu/';
const PROJECT_SERVER = 'https://cdn.projects.scratch.mit.edu/';
const getProjectUrl = function (asset) {
    const assetIdParts = asset.assetId.split('.');
    const assetUrlParts = [PROJECT_SERVER, 'internalapi/project/', assetIdParts[0], '/get/'];
    if (assetIdParts[1]) {
        assetUrlParts.push(assetIdParts[1]);
    }
    return assetUrlParts.join('');
};

const getAssetUrl = function (asset) {
    const assetUrlParts = [
        ASSET_SERVER,
        'internalapi/asset/',
        asset.assetId,
        '.',
        asset.dataFormat,
        '/get/'
    ];
    return assetUrlParts.join('');
};
storage.addWebSource([storage.AssetType.Project], getProjectUrl);
storage.addWebSource([storage.AssetType.ImageVector, storage.AssetType.ImageBitmap, storage.AssetType.Sound], getAssetUrl);
vm.attachStorage(storage);


//
// Render Setting
//
vm.attachRenderer(renderer);


//
// Audio Setting
//
vm.attachAudioEngine(audioEngine);


//
// START & Download
//
vm.start();
vm.downloadProjectId("119615668");

startButton.onclick = function() {
    vm.greenFlag();
};

stopButton.onclick = function() {
    vm.stopAll();
};
