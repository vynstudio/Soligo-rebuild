exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    
    const ghlPayload = {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      phone: data.phone || "",
      email: data.email || "",
      customField: {
        service: data.service || "General Inquiry",
        issue: data.issue || "",
        city: data.city || "",
        acBrand: data.acBrand || ""
      },
      tags: ["website-lead", data.service ? data.service.toLowerCase().replace(/\s+/g, "-") : "general"]
    };

    const response = await fetch(
      "https://services.leadconnectorhq.com/hooks/fhCCjAaqiUe9nSGlIhIU/webhook-trigger/b8e21b84-c9db-4f77-a2c0-7e9c8c8a5f1a",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ghlPayload)
      }
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
