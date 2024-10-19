package com.example.be.core.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class sgdg {

    @ResponseBody
    @GetMapping
    public String sgdg(){
        return "sgdg";
    }
}
