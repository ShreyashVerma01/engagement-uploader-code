// script.js
const imageInput = document.getElementById('image-input');
const uploadBtn = document.getElementById('upload-btn');
const outputDiv = document.getElementById('output');

uploadBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const files = imageInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
            // Create a new Google Drive API client
            const driveClient = await getDriveClient();

            // Upload the file to Google Drive
            await uploadFileToDrive(file, driveClient);
            outputDiv.textContent += `Uploaded ${file.name} to Google Drive`;
        } catch (error) {
            console.error(error);
        }
    }
});

async function getDriveClient() {
    const auth = new google.auth.GoogleAuth();
    return auth.getClient();
}

async function uploadFileToDrive(file, driveClient) {
    try {
        // Create a new file in Google Drive
        await driveClient.files.create({
            body: {
                name: file.name,
                mimeType: 'image/jpeg',
                content: await file.arrayBuffer(),
            },
        });
    } catch (error) {
        console.error(error);
    }
}
