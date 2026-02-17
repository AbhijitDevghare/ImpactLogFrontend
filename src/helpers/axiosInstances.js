import axios from 'axios';

export const authAxios = axios.create({
    baseURL: "https://api.impactlog.me/user/auth",
    withCredentials: true
});

export const userAxios = axios.create({
    baseURL: "https://api.impactlog.me/user/profile",
    withCredentials: true
});

export const chatAxios = axios.create({
    baseURL: "https://api.impactlog.me/chat",
    withCredentials: true
});

export const engagementAxios = axios.create({
    baseURL: "https://api.impactlog.me/engagement",
    withCredentials: true
});

export const eventAxios = axios.create({
    baseURL: "https://api.impactlog.me/events",
    withCredentials: true
});

export const registrationAxios = axios.create({
    baseURL: "https://api.impactlog.me/registration",
    withCredentials: true
});

export const postAxios = axios.create({
    baseURL: "https://api.impactlog.me/user-post/",
    withCredentials: true
});

export const rewardsAxios = axios.create({
    baseURL: "https://api.impactlog.me/rewards-badges",
    withCredentials: true
});

export const verificationAxios = axios.create({
    baseURL: "https://api.impactlog.me/verification",
    withCredentials: true
});