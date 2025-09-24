import axios, { Axios, AxiosPromise } from "axios";
import { CONTENT_TYPE_MULTI_PART_FORM_DATA } from "constants/http_constants";
import { ImageCompress } from "models/image/imageCompress";
import { ImageResize } from "models/image/imageResize";

export default class ImageHttpService {
    public static async compress(payload : ImageCompress) : AxiosPromise<Blob> {
        
        const formData = new FormData();
        formData.append("file", payload.file);
        formData.append("quality", payload.quality.toString());
        
        return await axios.post<Blob>(
            'http://localhost:5215/api/image/compress', 
            formData, 
            {
                responseType: 'blob',
                headers: {
                    'Content-Type': CONTENT_TYPE_MULTI_PART_FORM_DATA,
                }
            }
        );
    }

    public static  async resize(payload : ImageResize) : AxiosPromise<Blob> {
        
        const formData = new FormData();
        formData.append("file", payload.file);
        formData.append("width", payload.width.toString());
        formData.append("height", payload.height.toString());
        
        return await axios.post(
            'http://localhost:5215/api/image/resize',
            formData, 
            {
                responseType: 'blob',
                headers: {
                    'Content-Type': CONTENT_TYPE_MULTI_PART_FORM_DATA,
                }
            }
        );
    }
}