import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">새 포스트 등록</h1>
      <PostForm />
    </div>
  );
}
