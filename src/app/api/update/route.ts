export async function POST(request: Request) {
  if (!request.body) {
    return new Response(JSON.stringify({ error: "Request body is empty" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Forward the request to the Azure Function
    const azureResponse = await fetch(
      `https://mp3functions.azurewebsites.net/api/GetAlbumsHTTP`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request.body),
      }
    );

    if (!azureResponse.ok) {
      // Forward the Azure Function's HTTP status to the client
      const errorResponse = await azureResponse.text(); // Use text first to avoid JSON parse error
      try {
        const errorJson = JSON.parse(errorResponse);
        return new Response(errorJson, {
          status: azureResponse.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch {
        return new Response(
          JSON.stringify({
            error: "Error updating metadata with Azure Function.",
          }),
          {
            status: azureResponse.status,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    // Send the response from the Azure Function back to the client
    const data = await azureResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error calling the Azure Function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
