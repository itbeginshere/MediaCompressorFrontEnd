export default class FileDownloadHelper {

    public static downloadBlob(blob : Blob) : void {
        
        const objectURL = URL.createObjectURL(blob);

        // Create a download link
        const link = document.createElement('a');
        link.href = objectURL;
        link.download = 'downloaded_file.ext'; // Specify a desired filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the object URL when it's no longer needed to release memory
        URL.revokeObjectURL(objectURL);

    }
}