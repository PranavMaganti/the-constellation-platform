import { useRouter } from "next/dist/client/router";
import React from "react";
import PostCard from "../../components/Cards/PostCard";
import LoadingSpinner from "../../components/Loading";
import ErrorDataScaffold from "../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import { usePostsByTopic } from "../../utils/db";

export default function PostsByTopic() {
  const router = useRouter();
  const { id } = router.query;
  const { error, postsByTopic } = usePostsByTopic(id);

  return (
    <>
      <ErrorDataScaffold error={error} data={postsByTopic}>
        <PageScaffold title={postsByTopic?.topic}>
          {postsByTopic?.posts.length === 0 && (
            <p className="text-2xl">
              There are currently no posts for this topic
            </p>
          )}
          {postsByTopic?.posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </PageScaffold>
      </ErrorDataScaffold>
    </>
  );
}
