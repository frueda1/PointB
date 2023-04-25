import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import {
  RenderingType,
  SitecoreContext,
  ComponentPropsContext,
  handleEditorFastRefresh,
  EditingComponentPlaceholder,
  StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
// different componentFactory method will be used based on whether page is being edited
import { componentFactory, editingComponentFactory } from 'temp/componentFactory';
import { sitemapFetcher } from 'lib/sitemap-fetcher';

//import { init } from "@sitecore/engage";

// const engageSettings = {
//   clientKey: "sndbxus09k4lf0wq2f6b9p25ckpuqo8i",
//   targetURL: "https://api-engage-us.sitecorecloud.io", //"https://api-us.boxever.com"
//   pointOfSale: "pointb.com",
//   cookieDomain: "",
//   cookieExpiryDays: 365,
//   forceServerCookieMode: false,
//   includeUTMParameters: true,
//   webPersonalization: true,
//   web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net'
// };

const SitecorePage = ({ notFound, componentProps, layoutData }: SitecorePageProps): JSX.Element => {


  // const loadEngage = async () => {
  //   // Load Engage API
  //   const engage = await init(engageSettings);  
  
  //   // Send VIEW events
  //   engage.pageView({
  //     channel: "WEB",
  //     currency: "USD",
  //     pos:"pointb.com"
  //   });

  //   console.log("PATH: Copy-paste the following line into Sitecore CDP&Personalize, Guests, Search field:");
  //   console.log("bid:", engage);
  // };

  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    //cdp('CDP' + layoutData.sitecore.route.name);
    handleEditorFastRefresh();
  }, []);
  
if(typeof window !== "undefined")
{
  console.log('Before name',layoutData.sitecore.route.name);
  //loadEngage();
  cdp('CDP ' + layoutData.sitecore.route.name);
  console.log('After name',layoutData.sitecore.route.name);
}

  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  const isEditing = layoutData.sitecore.context.pageEditing;
  const isComponentRendering =
    layoutData.sitecore.context.renderingType === RenderingType.Component;

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={isEditing ? editingComponentFactory : componentFactory}
        layoutData={layoutData}
      >
        {/*
          Sitecore Pages supports component rendering to avoid refreshing the entire page during component editing.
          If you are using Experience Editor only, this logic can be removed, Layout can be left.
        */}
        {isComponentRendering ? (
          <EditingComponentPlaceholder rendering={layoutData.sitecore.route} />
        ) : (
          <Layout layoutData={layoutData}  />
        )}
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async (context) => {
  // Fallback, along with revalidate in getStaticProps (below),
  // enables Incremental Static Regeneration. This allows us to
  // leave certain (or all) paths empty if desired and static pages
  // will be generated on request (development mode in this example).
  // Alternatively, the entire sitemap could be pre-rendered
  // ahead of time (non-development mode in this example).
  // See https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';

  if (process.env.NODE_ENV !== 'development' && !process.env.DISABLE_SSG_FETCH) {
    try {
      // Note: Next.js runs export in production mode
      paths = await sitemapFetcher.fetch(context);
    } catch (error) {
      console.log('Error occurred while fetching static paths');
      console.log(error);
    }

    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  return {
    paths,
    fallback,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);

  // Check if we have a redirect (e.g. custom error page)
  if (props.redirect) {
    return {
      redirect: props.redirect,
    };
  }

  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
};

const cdp = (value:any) => {
  var engage = undefined;

// Create and inject the <script> tag into the HTML
var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = "https://d1mj578wat5n4o.cloudfront.net/sitecore-engage-v.1.1.0.min.js";
var x = document.querySelector("script");
x.parentNode.insertBefore(s, x);    

// Initialize the Engage JavaScript Library
s.addEventListener("load", async () => {
    var settings = {
        clientKey: "sndbxus09k4lf0wq2f6b9p25ckpuqo8i",
        targetURL: "https://api-engage-us.sitecorecloud.io",
        pointOfSale: "pointb.com",
        cookieDomain: "localhost",
        cookieExpiryDays: 365,
        forceServerCookieMode: false,
        includeUTMParameters: true,
        webPersonalization: true,
        //web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net'
    };
    engage = await window.Engage.init(settings);

    // Send a VIEW event
    // ...

    // VIEW event object
var eventData = {
    channel: "WEB",
    language: "EN",
    currency: "USD",
    page: value,
    pointOfSale: "pointb.com"
};

// Send a VIEW event
engage.pageView(eventData);
console.log(eventData);

});

}

export default SitecorePage;
