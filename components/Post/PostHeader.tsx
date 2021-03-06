import { useRouter } from "next/dist/client/router";
import React from "react";
import Avatar from "../Avatar/Avatar";
import dayjs from "dayjs";
import LinkedPost from "../../models/LinkedPost";
import { ChipList } from "../Buttons/Chip";

interface PostHeaderProps {
  post?: LinkedPost;
  onAvatarClick?: () => void;
  buttons?: React.ReactNode;
}

export function PostHeader(props: PostHeaderProps) {
  const { post, buttons } = props;
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <Avatar
          className="w-16 h-16 mr-4"
          avatarUrl={post?.author?.avatar_url}
          name={post?.author?.full_name}
          onClick={() => router.push(`/profile/${post?.user_id}`)}
        />
        <div className="flex flex-col">
          <p className="text-4xl font-medium">{post?.title}</p>
          <p className="text-xl font-normal">
            {post?.views} {((post?.views || 0) == 1 ? "view" : "views") + " | "}
            Posted {dayjs.utc(post?.created_at).from(dayjs.utc())} by{" "}
            {post?.author?.full_name}
          </p>

          <ChipList tags={post?.tags ?? []} searchOnClick={true} />
        </div>
      </div>

      <>{buttons}</>
    </div>
  );
}
