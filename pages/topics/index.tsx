import React from "react";
import TopicCard from "../../components/Cards/TopicsCard";
import ErrorDataLayout from "../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import { useTopics } from "../../utils/supabase/db";

export default function TopicsPage() {
  const { topics, error } = useTopics();

  return (
    <PageScaffold title="Topics">
      <ErrorDataLayout error={error} data={topics}>
        <div className="grid grid-cols-1 auto-rows-fr gap-x-8 gap-y-6 md:grid-cols-2">
          {topics?.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </ErrorDataLayout>
    </PageScaffold>
  );
}
