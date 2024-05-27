export async function GET(request: Request) {
  const url = new URL(request.url);
  const uuid = url.searchParams.get("uuid") || "";
  const ids = url.searchParams.get("ids") || "";
  const azureAPI = process.env.AZURE_DOWNLOAD_API || "";

  if (!uuid || !ids) {
    return new Response("Missing parameters.", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }

  try {
    // Forward the request to the Azure Function
    const azureResponse = await fetch(`${azureAPI}uuid=${uuid}&ids=${ids}`, {
      method: "GET",
    });

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

    // Get the response body as a ReadableStream
    const body = azureResponse.body;

    // Set the appropriate headers for the response
    const headers = new Headers();
    const azureHeaders = Object.fromEntries(azureResponse.headers.entries());
    Object.entries(azureHeaders).forEach(([key, value]) => {
      headers.append(key, value);
    });

    // Send the response from the Azure Function back to the client
    return new Response(body, {
      status: azureResponse.status,
      headers: headers,
    });
  } catch (error) {
    console.error("Error calling the Azure Function:", error);
    return new Response("Internal server error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
