import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Trash2 } from 'lucide-react';
import { deleteAdminPost, fetchAdminPosts, type AdminPost } from '@/lib/adminPosts';

function formatAdminDate(date: string | null) {
  if (!date) return 'Not scheduled';

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function AdminPosts() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPosts = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const nextPosts = await fetchAdminPosts();
      setPosts(nextPosts);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load posts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const handleDelete = async (post: AdminPost) => {
    const confirmed = window.confirm(`Delete "${post.title}"?`);
    if (!confirmed) return;

    try {
      await deleteAdminPost(post.id);
      setPosts((currentPosts) => currentPosts.filter((item) => item.id !== post.id));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete post.');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <div className="mb-10 flex flex-col gap-5 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              to="/admin"
              className="mb-5 inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.16em] text-black/45 transition-colors hover:text-ocean"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <span className="mb-3 block font-body text-sm uppercase tracking-[0.18em] text-ocean">
              Admin
            </span>
            <h1 className="font-display text-5xl text-black md:text-6xl">
              Posts
            </h1>
          </div>

          <Link to="/admin/posts/new" className="btn-ocean justify-center">
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </div>

        {errorMessage && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <p className="font-body text-sm uppercase tracking-[0.18em] text-black/45">
            Loading posts...
          </p>
        ) : posts.length === 0 ? (
          <div className="border border-black/10 bg-cream p-8">
            <h2 className="mb-3 font-display text-3xl text-black">
              No posts yet
            </h2>
            <p className="mb-6 font-body text-base leading-relaxed text-black/60">
              Create the first database-backed draft and it will appear here.
            </p>
            <Link to="/admin/posts/new" className="btn-ocean">
              Create first post
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden border border-black/10">
            <div className="hidden grid-cols-[1.4fr_0.7fr_0.7fr_0.4fr] gap-4 border-b border-black/10 bg-cream px-5 py-3 font-body text-xs uppercase tracking-[0.16em] text-black/45 md:grid">
              <span>Title</span>
              <span>Status</span>
              <span>Published</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-black/10">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="grid gap-4 px-5 py-5 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.4fr] md:items-center"
                >
                  <div>
                    <h2 className="font-display text-2xl text-black">
                      {post.title}
                    </h2>
                    <p className="mt-1 font-body text-sm text-black/45">
                      /blog/{post.slug}
                    </p>
                  </div>

                  <span className="w-fit bg-ocean/10 px-3 py-1 font-body text-xs uppercase tracking-[0.14em] text-ocean">
                    {post.status}
                  </span>

                  <p className="font-body text-sm text-black/55">
                    {formatAdminDate(post.published_at)}
                  </p>

                  <div className="flex items-center gap-3 md:justify-end">
                    <Link
                      to={`/admin/posts/${post.id}/edit`}
                      className="text-black/50 transition-colors hover:text-ocean"
                      aria-label={`Edit ${post.title}`}
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleDelete(post)}
                      className="text-black/45 transition-colors hover:text-red-700"
                      aria-label={`Delete ${post.title}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
