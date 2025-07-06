import asyncHandler from 'express-async-handler';
import User from "../models/user.model.js";
import {clerkClient, getAuth} from "@clerk/express";
import { Notification } from '../models/notification.model.js';


export const getUserProfile = asyncHandler(async (req, res) => {
    const {username} = req.params;
    const user = await User.findOne({username})

    if(!user) return res.status(404).json({message: "User not found"});
    res.status(200).json({user});
})
export const updateProfile = asyncHandler(async (req, res) => {
    const {userId} = getAuth(req);
    const user = await User.findOneAndUpdate({clerkId: userId}, req.body, {new :true});
    if(!user) return res.status(404).json({message: "User not found"});
    res.status(200).json({user});
})
export const syncUser = asyncHandler(async (req, res) => {
    const {userId} = getAuth(req);
    const existingUser = await User.findOne({clerkId: userId});
    if(existingUser) {
        return res.status(200).json({user: existingUser, message: "User already exists"});
    }
    
    //create a new user from clerk data
    const clearkUser = await clerkClient.users.getUser(userId);

    const userData = {
        clerkId: userId,
        email: clearkUser.emailAddresses[0]?.emailAddress,
        firstName: clearkUser.firstName,
        lastName: clearkUser.lastName,
        username: clearkUser.emailAddresses[0]?.emailAddress.split('@')[0],
        profilePicture: clearkUser.imageUrl || "",
    }

    const newUser = await User.create(userData);
    res.status(201).json({user: newUser, message: "User created successfully"});
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    const {userId} = getAuth(req);
    const user = await User.findOne({clerkId: userId});
    if(!user) return res.status(404).json({message: "User not found"});
    res.status(200).json({user});
})

export const followUser = asyncHandler(async (req, res) => {
    const {userId} = getAuth(req);
    const {targetUserId} = req.params;

    if(userId === targetUserId) {
        return res.status(400).json({message: "You cannot follow yourself"});
    }

    const user = await User.findOne({clerkId: userId});
    const targetUser = await User.findOne({clerkId: targetUserId});

    if(!targetUser || !user) {
        return res.status(404).json({message: "User not found"});
    }

   const isFollowing = user.following.includes(targetUser._id);
   if(isFollowing){
    //unfollow the user
    await User.findByIdAndUpdate(user._id, {$pull: {following: targetUser._id}}, {new: true});
    await User.findByIdAndUpdate(targetUser._id, {$pull: {followers: user._id}}, {new: true});
    return res.status(200).json({message: "Successfully unfollowed the user", user: targetUser});
   }else {
    //follow the user
    await User.findByIdAndUpdate(user._id, {$push: {following: targetUser._id}}, {new: true});
    await   User.findByIdAndUpdate(targetUser._id, {$push: {followers: user._id}}, {new: true});

    //create a notification for the target user
    await Notification.create({
        from: user._id,
        to: targetUser._id,
        type: "follow",
       })
   }

   
})