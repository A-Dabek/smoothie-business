package com.example.smoothie.api.smoothie;

import com.example.smoothie.api.smoothie.model.SmoothieDetailsUpdateRequestBody;
import com.example.smoothie.api.smoothie.model.SmoothieResponseBodyObject;
import com.example.smoothie.smoothie.Smoothie;
import com.example.smoothie.smoothie.SmoothieDetails;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SmoothieMapper {
    SmoothieMapper INSTANCE = Mappers.getMapper(SmoothieMapper.class);

    @Mapping(target = "carbs", source = "nutritions.carbs")
    @Mapping(target = "fat", source = "nutritions.fat")
    @Mapping(target = "protein", source = "nutritions.protein")
    SmoothieResponseBodyObject toSmoothieResponseBodyObject(Smoothie smoothie);

    List<SmoothieResponseBodyObject> toSmoothieResponseBodyObject(Iterable<Smoothie> smoothie);

    SmoothieDetails toSmoothieDetails(SmoothieDetailsUpdateRequestBody smoothieDetailsUpdateRequestBody);
}