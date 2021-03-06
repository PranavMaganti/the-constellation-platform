import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import Topic from "../../models/Topic";
import BaseCard from "./BaseCard";

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard(props: TopicCardProps) {
  const { topic } = props;
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/topics/${topic.id}`);
  }, [router, topic.id]);

  return (
    <BaseCard onClick={onClick} className="justify-center">
      <h4 className="text-4xl">{topic.title}</h4>
      <p className="text-xl mt-2 text-gray-800">{topic.description}</p>
      {/* 
      <div className="flex flex-col justify-center items-center ml-6">
        <p className="text-4xl">3</p>
        <p className="text-xl">posts</p>
      </div> */}
    </BaseCard>
  );
}
