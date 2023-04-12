// var _boxeverq = _boxeverq || [];

//             // Define the Boxever settings
//             var _boxever_settings = {
//                 client_key: 'sndbxus09k4lf0wq2f6b9p25ckpuqo8i', // Replace with your client key
//                 target: 'https://api-us.boxever.com/v1.2', // Replace with your API target endpoint specific to your data center region
//                 cookie_domain: '', // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
//                 javascriptLibraryVersion: '1.4.9', // Replace with the latest Boxever JavaScript Library version"
//                 pointOfSale: 'pointb.com', // Replace with the same point of sale configured in system settings"
//                 web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net', // Replace with path for the Amazon CloudFront CDN for Sitecore Personalize"
//                 web_flow_config: { async: false, defer: false } // Customize the async and defer script loading attributes
//             };
//             // Import the Boxever JavaScript Library asynchronously
            
//             (function() {
//                 var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
//                 s.src = 'https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.9.min.js';
//                 var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
//             })();
        
//             _boxeverq.push(() => {
//                 // Create a "VIEW" event object
//                 const viewEvent = {
//                     browser_id: Boxever.getID(),
//                     channel: "WEB",
//                     type: "VIEW",
//                     language: "EN",
//                     currency: "USD",
//                     page: "HOME",
//                     pos: "pointb.com"

//                 };

//                 // Send the event data to the server
//                 Boxever.eventCreate(
//                     viewEvent,
//                     () => {},
//                     "json"
//                 );

//                 // Log the browser ID to the console
//                 console.log("Copy-paste the following line into Sitecore CDP, Customer Data, Guests, Search field:");
//                 console.log(`bid: ${Boxever.getID()}`);
//             });

//             function callMethod (page)  
//             {
//                 window.alert('this is the custom event for ' + page);
//                 _boxeverq.push(() => {
//                     // Create a "VIEW" event object
//                     const viewEvent = {
//                         browser_id: Boxever.getID(),
//                         channel: "WEB",
//                         type: "pointb:SEARCH_CLICKED",
//                         language: "EN",
//                         currency: "USD",
//                         page: page,
//                         pos: "pointb.com",
//                         showResults: "true"
    
//                     };
    
//                     // Send the event data to the server
//                     Boxever.eventCreate(
//                         viewEvent,
//                         () => {},
//                         "json"
//                     );
    
//                     // Log the browser ID to the console
//                     console.log("Copy-paste the following line into Sitecore CDP, Customer Data, Guests, Search field:");
//                     console.log(`bid: ${Boxever.getID()}`);
//                 });

//             }

//           //  export { callMethod };


// Initialize the engage variable
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
        cookieDomain: "",
        cookieExpiryDays: 365,
        forceServerCookieMode: false,
        includeUTMParameters: true,
        webPersonalization: "true",
        web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net'
    };
    engage = await window.Engage.init(settings);

    // Send a VIEW event
    // ...

    // VIEW event object
var eventData = {
    channel: "WEB",
    language: "EN",
    currency: "USD",
    page: "NEW HOME",
    pointOfSale: "pointb.com"
};

// Send a VIEW event
engage.pageView(eventData);
console.log(eventData);

});


