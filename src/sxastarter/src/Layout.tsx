/**
 * This Layout is needed for Starter Kit.
 */
import React from "react";
import Head from "next/head";
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  Field,
} from "@sitecore-jss/sitecore-jss-nextjs";
import Scripts from "src/Scripts";
import Script from "next/script";
//import { callMethod } from 'public/cdpSettings.js';
import { useEffect } from "react";
import { init } from "@sitecore/engage";


// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const engageSettings = {
  clientKey: "sndbxus09k4lf0wq2f6b9p25ckpuqo8i",
  targetURL: "https://api-engage-us.sitecorecloud.io", //"https://api-us.boxever.com"
  pointOfSale: "pointb.com",
  // cookieDomain: "localhost",
  // cookieExpiryDays: 365,
  forceServerCookieMode: false,
  includeUTMParameters: true,
  webPersonalization: "true",
  web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net'
};

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {

  // const loadEngage = async () => {
  //   // Load Engage API
  //   const engage = await init(engageSettings);  
  
  //   // Send VIEW events
  //   engage.pageView({
  //     channel: "WEB",
  //     currency: "USD",
  //     pos:"pointb.com"
  //   });

    
  //   console.log("Copy-paste the following line into Sitecore CDP&Personalize, Guests, Search field:");
  //   console.log("bid:", engage);
  // };
  
  const sendCustomEvent = async () => {
    // Load Engage API
    const engage = await init(engageSettings);  
  
    
    // Send VIEW events
    engage.event({
      type:"pointb:SEARCH_CLICKED", 
      channel: "WEB",
      currency: "USD",
      pos:"pointb.com",            
    });

    console.log("Copy-paste the following line into Sitecore CDP&Personalize, Guests, Search field:");
    console.log("bid:", engage);
  };
    
  useEffect(() => {
    //loadEngage();
  }, []);


  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? "editing-mode" : "prod-mode";
  console.log("layoutDataa", layoutData);

  const handleClick = (e: any) => {    
    console.log(e);
    sendCustomEvent();
    //callMethod(layoutData.sitecore.route?.name);
  };
  return (
    <>
      <Script
        src={`${publicUrl}/cdpSettings.js`}

        //onLoad={() => callMethod(layoutData.sitecore.route?.name)    }
      />

      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || "Page"}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      {/* <button onClick={handleClick}>Search</button> */}
      <div className={mainClassPageEditing}>
        <header>
          <div id="header">
            {route && <Placeholder name="headless-header" rendering={route} />}
          </div>
        </header>
        <main>
          <div id="content">
            {route && <Placeholder name="headless-main" rendering={route} />}
          </div>
        </main>
        <footer>
          <div id="footer">
            {route && <Placeholder name="headless-footer" rendering={route} />}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
