export async function POST(request: Request) {
    const url = new URL(request.url);
    const uuid = url.searchParams.get("uuid") || "";
    const ids = url.searchParams.get("ids") || "";
  
    if (!uuid || !ids) {
      return new Response("Missing parameters.", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }
  
    try {
      // Forward the request to the Azure Function
      const azureResponse = await fetch(
        `https://mp3functions.azurewebsites.net/api/RemoveHTTP?uuid=${uuid}&ids=${ids}`,
        {
          method: "POST",
        }
      );
  
      if (!azureResponse.ok) {
        // Forward the Azure Function's HTTP status to the client
        return new Response(await azureResponse.text(), {
          status: azureResponse.status,
          headers: {
            "Content-Type":
              azureResponse.headers.get("Content-Type") || "text/plain",
          },
        });
      }
  
      // Send the response from the Azure Function back to the client
      return new Response(await azureResponse.text(), {
        status: azureResponse.status,
        headers: {
          "Content-Type":
            azureResponse.headers.get("Content-Type") || "text/plain",
        },
      });
    } catch (error) {
      console.error("Error calling the Azure Function:", error);
      return new Response("Internal server error", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }
  