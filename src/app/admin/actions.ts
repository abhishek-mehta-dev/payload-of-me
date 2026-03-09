'use server';

import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function loginAction(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: 'Admin password not configured on server.' };
  }

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  }

  return { error: 'Invalid password' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin');
}

export async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.has('admin_session');
}

export async function getBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data;
}

export async function deleteBlog(id: number) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase.from('blogs').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/blogs');
  return { success: true };
}

export async function saveBlog(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
}) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase.from('blogs').insert([data]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/blogs');
  return { success: true };
}

export async function togglePublishBlog(id: number, currentStatus: boolean) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('blogs')
    .update({ published: !currentStatus })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/blogs');
  return { success: true };
}
