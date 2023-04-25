import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import * as plugins from 'temp/middleware-plugins';
import { EngageServer } from '@sitecore/engage';


export interface MiddlewarePlugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A middleware to be called, it's required to return @type {NextResponse} for other middlewares
   */
  exec(req: NextRequest, res?: NextResponse, ev?: NextFetchEvent): Promise<NextResponse>;
}

export default async function middleware(
  req: NextRequest,
  ev: NextFetchEvent
): Promise<NextResponse> {
  const response = NextResponse.next();

  console.log('MDW1');
  const engageSettings = {
    clientKey: "sndbxus09k4lf0wq2f6b9p25ckpuqo8i",
    targetURL: "https://api-engage-us.sitecorecloud.io",
    pointOfSale: "pointb.com",
    cookieDomain: "localhost",
    cookieExpiryDays: 365,
    forceServerCookieMode: false,
    includeUTMParameters: true,
    webPersonalization: "true",
    web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net'
    
  };
  console.log('MDW2')
  //const engageServer = init(engageSettings);
  await EngageServer.handleEngageCookie(req, response, engageSettings);
  console.log('MDW3')
  
  return (Object.values(plugins) as MiddlewarePlugin[])
    .sort((p1, p2) => p1.order - p2.order)
    .reduce((p, plugin) => p.then((res) => plugin.exec(req, res, ev)), Promise.resolve(response));
}
