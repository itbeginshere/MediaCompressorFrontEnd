import axios, { Axios, AxiosPromise } from "axios";
import { ImageCompress } from "models/image/imageCompress";
import { ImageResize } from "models/image/imageResize";

export default class ImageHttpService {
    public static async compress(payload : ImageCompress) : AxiosPromise<Blob> {
        return await axios.post<Blob>(
            'http://localhost:5215/image/compress', 
            payload, 
            {
                responseType: 'blob'
            }
        );
    }

    public static  async resize(payload : ImageResize) : AxiosPromise<Blob> {
        return await axios.post(
            'http://localhost:5215/image/resize',
            payload, 
            {
                responseType: 'blob'
            }
        );
    }
}