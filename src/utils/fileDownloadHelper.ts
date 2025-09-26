import { AxiosResponse } from "axios";

export default class FileDownloadHelper {

    public static downloadBlob(response: AxiosResponse<Blob>): void {

        const contentDisposition = response.headers['content-disposition'] as string | null;
        const contentType = response.headers['content-type'] as string | null;

        let filename = `downloaded_file.${contentType?.split('/')[1] ?? 'bin'}`;

        // Extracting the file name from the content disposition header
        if (contentDisposition) {

            let filenameMatch = contentDisposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);

            if (filenameMatch && filenameMatch[1]) {
                filename = decodeURIComponent(filenameMatch[1]);
            } else {
                filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }
        }

        const objectURL = URL.createObjectURL(response.data);

        // Create a download link
        const link = document.createElement('a');
        link.href = objectURL;
        link.download = filename; // Specify a desired filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the object URL when it's no longer needed to release memory
        URL.revokeObjectURL(objectURL);

    }
}