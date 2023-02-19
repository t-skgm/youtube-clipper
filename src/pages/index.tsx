import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { trpc } from "../infrastructure/trpc/trpc";

type Props = {
  // feed: PostProps[];
};

const Blog: React.FC<Props> = () => {
  const { data, isLoading } = trpc.feed.useQuery();
  console.log("process.env", process.env);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {data?.posts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
