package mql.dominators.brico.controller;

import mql.dominators.brico.entities.Handyman;
import mql.dominators.brico.entities.Service;
import mql.dominators.brico.entities.Skill;
import mql.dominators.brico.request.FilterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import mql.dominators.brico.jwt.api.filter.JwtFilter;
import mql.dominators.brico.request.BecomeHandymanRequest;
import mql.dominators.brico.response.MessageResponse;
import mql.dominators.brico.security.CustomUserDetails;
import mql.dominators.brico.service.FileService;
import mql.dominators.brico.service.HandymanService;
import mql.dominators.brico.service.ServiceService;
import mql.dominators.brico.service.UserService;
import mql.dominators.brico.shared.HandymanDTO;
import mql.dominators.brico.utils.Utils;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.websocket.server.PathParam;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/handyman")
public class HandymanController {

	@Autowired
	FileService fileService;

	@Autowired
	UserService userService;
	
	

	@Autowired
	HandymanService handymanService;

	@Autowired
	private JwtFilter jwtFilter;

	@PostMapping(path = "/become_handyman")
	public ResponseEntity<MessageResponse> switchToHandyman(@RequestBody BecomeHandymanRequest handymanRequest) {
		HandymanDTO handymanDTO = Utils.copyProperties(userService.getUserByUsername(jwtFilter.getUsername()),
				new HandymanDTO());
		handymanDTO.setDescription(handymanRequest.getDescription());
		handymanDTO.setJobTitle(handymanRequest.getJobTitle());

		if (handymanService.switchToHandyman(handymanDTO))
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Updated successfully"));
		else
			return ResponseEntity.status(HttpStatus.OK)
					.body(new MessageResponse("contact data and job title are obligatory"));
	}

	@PostMapping("/filter")
	public ResponseEntity<List<Handyman>> getHandymenByFilter(@RequestBody FilterRequest filterRequest){
		return ResponseEntity.status(HttpStatus.OK).body(handymanService.getAllByFilter(filterRequest));
	}
	
	
	@PostMapping("/bindService/{title}")
	public ResponseEntity<?> bindService(@PathVariable String title,@AuthenticationPrincipal CustomUserDetails customUserDetails){
		if(customUserDetails.getUser() instanceof Handyman) {
			handymanService.bindService(((Handyman) customUserDetails.getUser()),title);
		}
		
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@GetMapping("/services/{username}")
	public ResponseEntity<Set<Service>> getServices(@PathVariable String username){
		Handyman handyman = handymanService.getByUsername(username);
		return ResponseEntity.status(HttpStatus.OK).body(handyman.getServices());
	}

}
