import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostItem } from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from "../infrastructure/prisma";
import { trpc } from "../infrastructure/trpc";

type Props = {};

const Drafts: React.FC<Props> = (props) => {
  const { data, isLoading } = trpc.drafts.useQuery();

  const { data: session } = useSession();

  if (isLoading || !data) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>Loading</div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {data.drafts.map((post) => (
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

export default Drafts;
