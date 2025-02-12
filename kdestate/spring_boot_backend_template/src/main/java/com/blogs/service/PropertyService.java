package com.blogs.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blogs.Exception.CustomException;
import com.blogs.dao.PropertyRepository;
import com.blogs.dao.UserRepository;
import com.blogs.dto.PropertyDto;
import com.blogs.pojos.Property;
import com.blogs.pojos.User;

@Service
@Transactional
public class PropertyService {

    @Autowired
    private PropertyRepository dao;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    ModelMapper mapper;

    /** Add a new property */
    public String addProperty(PropertyDto newProp) {
    	System.out.println("Received userId: " + newProp.getOwnerId());
    	User u = userRepo.findById(newProp.getOwnerId()).orElseThrow(()->
    	new CustomException("Resource Not Found"));
    	Property EntityProperty = mapper.map(newProp, Property.class);
    	System.out.println(EntityProperty.getPropertyId());
        u.addPropety(EntityProperty);
    	dao.save(EntityProperty);
        return "Property created successfully with ID: " + EntityProperty.getPropertyId();
    }

    /** Get all properties */
    public List<PropertyDto> getAllProperties() {
        List<Property> propertylist = dao.findAll();
        return propertylist.stream().map(property -> mapper.map(property, PropertyDto.class)).collect(Collectors.toList());
    }

    /** Get a property by ID */
    public PropertyDto getPropertyById(Long propertyId) {
        Property p = dao.findById(propertyId).orElse(null);
        PropertyDto propdto = mapper.map(p, PropertyDto.class);
        return propdto;
    }

    /** Update an existing property (replace entire object) */
    public String updateProperty(Long propertyId, Property updatedProperty) {
        return dao.findById(propertyId).map(existingProperty -> {
            updatedProperty.setPropertyId(propertyId); // Keep the same ID
            dao.save(updatedProperty);
            return "Property updated successfully with ID: " + propertyId;
        }).orElse("Property not found with ID: " + propertyId);
    }

    
    public String updateImageUrl(Long propertyId, String imageUrl) {
        Property property = dao.findById(propertyId).orElse(null);
        if (property == null) {
            return "Property not found with ID: " + propertyId;
        }
        property.setImagepath(imageUrl);
        dao.save(property); // Save the property with the new image URL
        return "Image URL updated successfully for property ID: " + propertyId;
    }
    /** Delete a property by ID */
    public String deleteProperty(Long propertyId) {
        if (dao.existsById(propertyId)) {
            Property property = dao.findById(propertyId).orElse(null);
            User u = property.getOwner();
            u.RemoveProperty(property);
            dao.deleteById(propertyId);
            return "Property deleted successfully with ID: " + propertyId;
        }
        return "Property not found with ID: " + propertyId;
    }
}
