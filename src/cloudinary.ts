import cloudinary, {UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';

export function uploads(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, {
            public_id,
            resource_type: 'auto',
            overwrite,
            invalidate
        }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if(error) reject(error);

            resolve(result);
        }) 
    })
}

export function uploadVideo(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, {
            public_id,
            resource_type: 'video',
            chunk_size: 50024, // 50MB
            overwrite,
            invalidate
        }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if(error) reject(error);

            resolve(result);
        }) 
    })
}