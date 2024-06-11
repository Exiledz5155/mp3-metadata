import { Octokit } from "@octokit/rest";

export async function GET(request: Request) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });
  const repo = "mp3-metadata";
  const owner = "Exiledz5155";

  try {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/stats/contributors",
      {
        owner,
        repo,
      }
    );

    const contributorsData = await Promise.all(
      response.data.map(async (contributor: any) => {
        const userResponse = await octokit.request("GET /users/{username}", {
          username: contributor.author.login,
        });

        return {
          login: contributor.author.login,
          name: userResponse.data.name || contributor.author.login,
          avatar_url: contributor.author.avatar_url,
          html_url: contributor.author.html_url,
          contributions: contributor.total,
          stats: {
            totalCommits: contributor.total,
            totalInsertions: contributor.weeks.reduce(
              (sum: number, week: any) => sum + week.a,
              0
            ),
            totalDeletions: contributor.weeks.reduce(
              (sum: number, week: any) => sum + week.d,
              0
            ),
          },
        };
      })
    );

    return new Response(JSON.stringify(contributorsData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error calling Github REST API:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
