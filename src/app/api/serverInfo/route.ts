// src/app/api/serverInfo/route.ts
import { NextResponse } from "next/server";

// 💡 Create a global memory cache variable outside the request handler
let cachedServerCountry: string | null = null;

export async function GET() {
  try {
    // 1. If we already looked up the country before, return it instantly!
    if (cachedServerCountry) {
      return NextResponse.json({ 
        country: cachedServerCountry 
    });
    }

    const ipResponse = await fetch('https://api.ipify.org?format=json');
    if (!ipResponse.ok) 
        throw new Error("Failed to contact ipify");

    const { ip } = await ipResponse.json();
    
    const geoResponse = await fetch(`https://ipapi.co/${ip}/country/`);
    
    if (!geoResponse.ok) {
      console.warn(`ipapi.co rate limited or blocked request (Status: ${geoResponse.status}). Using fallback.`);
      return NextResponse.json({ 
        country: "ipapi rate exceeded" 
    });
    }
    
    const data = await geoResponse.json();

    if (data.error) {
      console.warn("ipapi.co returned an error payload:", data.reason);
      return NextResponse.json({ 
        country: "Offline Node Grid" 
    });
    }

    cachedServerCountry = data.country_name || "Unknown Region";

    return NextResponse.json({ country: cachedServerCountry });
  } catch (error) {
    console.error("Backend serverInfo configuration failure:", error);
    return NextResponse.json({ 
        country: "Fallback Node" 
    }, { status: 200 });
  }
}
