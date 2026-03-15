import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

type Contributor = {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string | null;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  contributions?: number;
};

export async function GET() {
  try {
    const owner = "Maxeuh";
    const repo = "Terraflow";

    // Utilise GITHUB_API ou GITHUB_TOKEN si disponible, sinon mode anonyme
    const octokit = new Octokit({ 
      auth: process.env.GITHUB_API || process.env.GITHUB_TOKEN 
    });

    const response = await octokit.rest.repos.listContributors({
      owner,
      repo,
    });

    const contributors: Contributor[] = response.data;

    return NextResponse.json(contributors);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(
        { message: error.message || "Erreur API GitHub" },
        { status: 500 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { message: "Une erreur inattendue s'est produite" },
      { status: 500 }
    );
  }
}