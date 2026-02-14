export async function getIpInfo() {
  // Set endpoint and your access key
  const accessKey = "ca82a46b-d23e-45f3-ad16-7744b2e0ba51";

  //
  const ipCheckRequest = `https://apiip.net/api/check?&accessKey=${accessKey}`;

  // Make a request and store the response
  const localLocationResponse = await fetch(ipCheckRequest);

  // Decode JSON response:
  const result = await localLocationResponse.json();

  // Retunn the result
  return result;
}

export async function getCountryFlag(countryCode) {
  const apiKey = "wuB666yJFlAMg0p7YF9oEP0OGPqFxr6hfMjcVuYJ";

  const url = `https://api.api-ninjas.com/v1/countryflag?country=${countryCode}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch country flag");
    }

    const result = await response.json();
    return result; // { flag: "base64..." }
  } catch (error) {
    console.error("Country flag error:", error);
    return null;
  }
}

export async function getAllCountries() {
  const url = "https://restcountries.com/v3.1/all?fields=name,cca2,flags";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();

    // normalize structure for UI
    return data
      .map((c) => ({
        name: c.name.common,
        code: c.cca2,
        flag: c.flags?.svg || "",
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}
