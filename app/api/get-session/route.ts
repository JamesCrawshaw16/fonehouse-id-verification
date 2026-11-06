export const dynamic = "force-dynamic";

export async function GET() {
  const apiKeyId = process.env.IDMISSION_API_KEY_ID;
  const apiKeySecret = process.env.IDMISSION_API_KEY_SECRET;

  if (!apiKeyId || !apiKeySecret) {
    return Response.json(
      {
        error:
          "IDMission API Key ID or API Key Secret is missing.",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const response = await fetch(
      "https://portal-api.idmission.com/portal.sessions.v1.SessionsService/CreateSession",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key_id: apiKeyId,
          api_key_secret: apiKeySecret,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("IDMission session creation failed:", {
        status: response.status,
        response: data,
      });

      return Response.json(
        {
          error: "IDMission could not create a session.",
          details: data,
        },
        {
          status: 502,
        }
      );
    }

    const sessionId = data?.session?.id;

    if (!sessionId) {
      console.error(
        "IDMission response did not contain session.id:",
        data
      );

      return Response.json(
        {
          error:
            "IDMission created an unexpected session response.",
        },
        {
          status: 502,
        }
      );
    }

    return Response.json(
      {
        id: sessionId,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("IDMission request failed:", error);

    return Response.json(
      {
        error: "Unable to contact IDMission.",
      },
      {
        status: 502,
      }
    );
  }
}