import { CabinData } from "../data/dto/cabins";
import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("Cabins error: ", error);
    throw new Error(error.message);
  }

  return data;
}

export async function upsertCabin(newCabin: CabinData, id: string) {
  const hasImagePath = newCabin.image.startsWith(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query;
  if (id === "") {
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log("Create new cabin error: ", error);
    throw new Error("Cabin could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete cabin if storage error
  // TO DO: USE ROLLBACK TRANSACTION IS THAT POSSIBLE VIA SUPABASE?
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.log("Image upload error", storageError);
    throw new Error(storageError.message);
  }

  return data;
}

export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Delete error: ", error);
    throw new Error(error.message);
  }

  return data;
}
