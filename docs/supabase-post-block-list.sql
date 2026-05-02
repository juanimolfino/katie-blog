-- What Katie Seas: allow list blocks in existing post_blocks table
-- Run this if docs/supabase-posts.sql was already run before list blocks existed.

alter table public.post_blocks
drop constraint if exists post_blocks_type_check;

alter table public.post_blocks
add constraint post_blocks_type_check
check (type in ('heading', 'paragraph', 'image', 'image-pair', 'divider', 'youtube', 'quote', 'link', 'list'));
