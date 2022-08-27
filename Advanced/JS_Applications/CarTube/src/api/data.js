import { get, post, put, del } from "./api.js";

export async function getAllCarListings() {
  return get("/data/cars?sortBy=_createdOn%20desc");
}

export async function createListing(car) {
  return post("/data/cars", car);
}

export async function getListingsById(id) {
  return get("/data/cars/" + id);
}

export async function deleteListing(id) {
  return del("/data/cars/" + id);
}

export async function editListing(id, car) {
  return put("/data/cars/" + id, car);
}

export async function searchListing(query) {
  return get(`/data/cars?where=year%3D${query}`);
}

export async function getListingsByUser(userId) {
  return get(
    `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}
