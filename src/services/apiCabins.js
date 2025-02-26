import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createCabin(params) {
  //upload/create a cabin
  let imagePath;
  let imageName;
  const image = params.image[0];
  if (params?.image[0].name) {
    imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-buckets/${imageName}`;
  } else {
    imagePath = params.image;
  }
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...params, image: imagePath }])
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }

  //upload image
  if (params?.image[0].name) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-buckets")
      .upload(imageName, image);
    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error(error.message);
    }
  }
  return data;
}

export async function editCabin(params) {
  let imagePath;
  let imageName;
  if (!params?.image[0].name) {
    imagePath = params.image;
  } else {
    const image = params.image[0];
    imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-buckets/${imageName}`;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...params, image: imagePath })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  //upload image
  if (params?.image[0].name) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-buckets")
      .upload(imageName, params.image[0]);
    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error(error.message);
    }
  }

  return data;
}
