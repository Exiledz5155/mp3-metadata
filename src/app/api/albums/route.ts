export async function GET(request: Request) {
  // changed from req because typescript typing

  const url = new URL(request.url);
  const uuid = url.searchParams.get("uuid") || ""; // search for uuid param

  if (!uuid) {
    return new Response(JSON.stringify({ error: "Missing uuid parameter." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Forward the request to the Azure Function
    const azureResponse = await fetch(
      `https://your-function-app.azurewebsites.net/api/GetAlbumsHTTP?uuid=${uuid}`,
      {
        method: "GET", // or 'POST', depending on what your Azure Function expects
      }
    );

    if (!azureResponse.ok) {
      // Forward the Azure Function's HTTP status to the client
      return new Response(await azureResponse.json(), {
        status: azureResponse.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Send the response from the Azure Function back to the client
    const data = await azureResponse.json();
    return new Response(data, {
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
