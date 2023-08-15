package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.vm.Asset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private final static String BUCKET =  "gourmetgo/images";

    @Autowired
    private AmazonS3 s3Client;

    //===================Save image===================//
    public String putObject(MultipartFile multipartFile) {
        String extension = StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());
        String key = String.format("%s.%s", UUID.randomUUID(), extension);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(multipartFile.getContentType());

        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET, key, multipartFile.getInputStream(), metadata);
            s3Client.putObject(putObjectRequest);
            return key;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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

