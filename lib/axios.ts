import axios from "axios";

const instance = axios.create({
  baseURL: `/api/`,
  withCredentials: true,
});

export async function get(route, params = {}) {
  return await instance
    .get(`${route}`, { params })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export function post(route: string, body = {}) {
  return instance
    .post(`${route}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function getLastListed() {
  return await get("getLastListed");
}

export async function getLatestListings() {
  return await get("getListings");
}

export async function searchListings(nameAsset) {
  return await get("searchListings", { nameAsset });
}

export async function getListingsUser(address) {
  return await get("getListingsUser", { address });
}

export async function addListing(newListing) {
  return await post("addListing", { newListing });
}

export async function updateListing(updatedListing) {
  return await post("updateListing", { updatedListing });
}

export async function deleteListing(unit) {
  return await post("deleteListing", { unit });
}

export async function getDetailAsset(unitId) {
  return await get("getDetailAsset", { unitId });
}

export async function getUsername(address) {
  return await get("getUsername", { address });
}

export async function getAddress(username) {
  return await get("getAddress", { username });
}

export async function getProfile(username) {
  return await get("getProfile", { username });
}

export async function addUser(newUser) {
  return await post("addUser", { newUser });
}

export async function updateUser(updatedUser) {
  return await post("updateUser", { updatedUser });
}
