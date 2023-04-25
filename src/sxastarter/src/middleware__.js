import { NextResponse } from 'next/server';
import { initServer} from '@sitecore/engage';

export async function middleware___(request) {

  console.log('MDX W JS')
  const response = NextResponse.next();

  const engageSettings = {
    clientKey: "sndbxus09k4lf0wq2f6b9p25ckpuqo8i",
    targetURL: "https://api-engage-us.sitecorecloud.io",
    pointOfSale: "pointb.com",
    cookieDomain: "localhost",
    cookieExpiryDays: 365,
    forceServerCookieMode: true//,
    //includeUTMParameters: true,
    //webPersonalization: true
    //web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net'
    
  };

  const engageServer = initServer(engageSettings);
  await engageServer.handleCookie(request, response);

  return response;
};