import supabase from "./supabase";

export async function getAllGuests() {
  let { data: guests, error } = await supabase.from("guests").select("*");
  if (error) throw new Error(error.message);
  return guests;
}
