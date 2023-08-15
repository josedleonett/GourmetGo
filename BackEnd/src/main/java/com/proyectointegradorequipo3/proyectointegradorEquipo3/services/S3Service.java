package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.vm.Asset;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class S3Service {

    private final static String BUCKET =  "gourmetgo/images";

    @Autowired
    private AmazonS3 s3Client;

    //===================Save image===================//
    public String putObject(MultipartFile multipartFile) {
        String extension = StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());
        assert extension != null;
        String format = getFormatForImageIO(extension);
        String key = String.format("%s.%s", UUID.randomUUID(), extension);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(multipartFile.getContentType());

        try {
            ByteArrayInputStream resizedImageStream = resizeImage(multipartFile, format);
            metadata.setContentLength(resizedImageStream.available());
            PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET, key, resizedImageStream, metadata);
            s3Client.putObject(putObjectRequest);
            return key;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String getFormatForImageIO(String extension) {
        return switch (extension.toLowerCase()) {
            case "jpeg", "jpg" -> "jpg";
            case "png" -> "png";
            case "gif" -> "gif";
            default -> throw new IllegalArgumentException("Unsupported file format: " + extension);
        };
    }

    public ByteArrayInputStream resizeImage(MultipartFile file, String format) throws Exception {
        InputStream in = new ByteArrayInputStream(file.getBytes());
        BufferedImage originalImage = ImageIO.read(in);

        BufferedImage resizedImage = Scalr.resize(originalImage, Scalr.Method.QUALITY, Scalr.Mode.FIT_EXACT, 1280 , 800);

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, format, os);
        return new ByteArrayInputStream(os.toByteArray());
    }



    //===================Get image===================//

    public Asset getObject(String key){
        S3Object s3Object = s3Client.getObject(BUCKET, key);
        ObjectMetadata metadata = s3Object.getObjectMetadata();

        try {
            S3ObjectInputStream inputStream = s3Object.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(inputStream);

            return new Asset(bytes, metadata.getContentType());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //===================delete image===================//

    public void deleteObject(String key){
        s3Client.deleteObject(BUCKET, key);
    }

    //===================Url image===================//


    public String getObjectUrl(String key){
        return String.format("https://%s.s3.amazonaws.com/%s", BUCKET, key);
    }

}
