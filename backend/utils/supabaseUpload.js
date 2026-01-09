import supabase from "./supabase.js";

export const uploadToSupabase = async (file, userId) => {
  if (!file) return null;

  const { originalname, buffer, mimetype } = file;

  const filePath = `${userId}/${Date.now()}-${originalname}`;

  const { error } = await supabase.storage
    .from("Bucket") // ✅ bucket name
    .upload(filePath, buffer, {
      contentType: mimetype,
      upsert: true,
    });

  if (error) throw error;

  // ✅ Signed URL 
  const { data } = supabase.storage
    .from("Bucket")
    .getPublicUrl(filePath); 

  return data.publicUrl;
};
