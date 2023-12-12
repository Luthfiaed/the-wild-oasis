import supabase from "./supabase";

export async function signupApi({
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: "",
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// todo check if this is safe to pass password like this
export async function loginApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // eslint-disable-next-line
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log("login res data: ", data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
