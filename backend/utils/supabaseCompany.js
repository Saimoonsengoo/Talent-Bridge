import supabase from "./supabase.js";

export const uploadCompanyLogo = async (file, companyId) => {
  if (!file) return null;

  const { originalname, buffer, mimetype } = file;
  const filePath = `company-logos/${Date.now()}-${originalname}`;

  const { error } = await supabase.storage
    .from("Company") // bucket name
    .upload(filePath, buffer, {
      contentType: mimetype,
      upsert: true,
    });

  if (error) throw error;

  const { data } =supabase.storage
    .from("Company")
    .getPublicUrl(filePath);

  return data.publicUrl;
};
