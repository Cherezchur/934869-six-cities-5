import { Expose } from 'class-transformer';

export class UploadPreviewImageRdo {
  @Expose()
  public filePath: string;
}
