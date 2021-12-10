(function() {
 const messages = JSON.parse("{\"UYU7IA\":\"Daily recurring\",\"uDaRhg\":\"Due today ({0}−{1} seats, no {2, plural, one {1 day} other {# day}} trial)\",\"X9rL5g\":\"First instalment due today ({0, plural, one {# seat} other {# seats}}, no {1, plural, one {1 day} other {# day}} trial)\",\"JMPknQ\":\"{0, date, long}\",\"Mcl4tQ\":\"Monthly recurring\",\"t4/ORQ\":\"By subscribing, you agree to <a href=\\\"{0}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">Canva Pro terms of use</a> and <a href=\\\"{1}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">Automatic renewal service</a>.\",\"c1udhg\":\"{0}/{1}\",\"SVNLHw\":\"First {0, plural, one {# day} other {# days}} free, then {1} /{2}\",\"ssaGVQ\":\"Due today ({0}−{1} seats)\",\"su9oDg\":\"{0} additional seats\",\"tIdwhA\":\"Due today ({0, plural, one {# seat} other {# seats}}, no {1, plural, one {1 day} other {# day}} trial)\",\"i7SZsA\":\"Due {0, date, long}\",\"nCxJmw\":\"{0, plural, one {1x member} other {#x members}}\",\"p2hi2A\":\"Trial ends\",\"36R0sA\":\"An error occurred while trying to subscribe. Try again in a few moments and <a href=\\\"{0}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">contact support</a> if the problem persists.\",\"bKZb9g\":\"Total cost\",\"wFQJFg\":\"First instalment due {0, date, long} ({1, plural, one {# seat} other {# seats}})\",\"5RRLUQ\":\"Includes tax of\",\"PFhivQ\":\"{0, date} - {1, date}\",\"dUyo7A\":\"{0} seat plan\",\"Lu/K8g\":\"By subscribing, you agree to <a href=\\\"{0}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">Terms of Use</a>.\",\"ph1X8Q\":\"Due today (no {0, plural, one {1 day} other {# day}} trial)\",\"J6pMGQ\":\"Prorated means you only get charged for the remainder of the month, instead of the total month.\",\"wovkZQ\":\"Plan ends\",\"/fz6qQ\":\"month\",\"XAXqpg\":\"Your credit card was declined. Please check the details and try again.\",\"TIbuTw\":\"day\",\"1aILqA\":\"Due {0, date, long} ({1, plural, one {# seat} other {# seats}})\",\"NeRchQ\":\"There was an error processing your payment. Please check the details and try again.\",\"QQ53wA\":\"Due today *(prorated total)\",\"aQgpBg\":\"Due {0, date, long} ({1}−{2} seats)\",\"VHRTXQ\":\"There was an error with processing your credit card. Try again in a few moments and <a href=\\\"{0}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">contact support</a> if the problem persists.\",\"fla9+A\":\"First payment\",\"GrYkOg\":\"By subscribing, you agree to <a href=\\\"{0}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">Canva for Business terms of use</a> and <a href=\\\"{1}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">Automatic renewal service</a>.\",\"AU4rQg\":\"First instalment due {0, date, long} ({1}−{2} seats)\",\"DNSIiA\":\"Due today <DarkGreen>({0, plural, one {1 day} other {# days}} free)</DarkGreen>\",\"qnTkyg\":\"{0}-{1} seat plan\",\"WKdJiA\":\"Due today\",\"8+6WKQ\":\"First instalment due today ({0, plural, one {# seat} other {# seats}})\",\"hM1CZQ\":\"Yearly recurring\",\"Bbc3Ig\":\"First instalment due {0, date, long}\",\"buPfEg\":\"year\",\"mSSFjA\":\"{0, date, long}\",\"uBoRFw\":\"Period\",\"Ds+98g\":\"By subscribing, you agree to <a data-anchor-id=\\\"terms-of-use\\\">Canva for Business terms of use</a> and <a data-anchor-id=\\\"automatic-renewal-terms-of-use\\\">Automatic renewal service</a>.\",\"9wyqSQ\":\"First instalment due today\",\"OIDhEw\":\"We couldn't recognise the postcode you entered. Please <a href=\\\"{0}\\\" target=\\\"_blank\\\" data-anchor-id=\\\"supportLink\\\" rel=\\\"noopener\\\">contact support</a>.\",\"kV0ytw\":\"Retry\",\"+y8dpQ\":\"Prorated means you only get charged for the remainder of the year, instead of the total year.\",\"bqgs0g\":\"Yearly total (12 month instalments)\",\"QHFR9g\":\"Due today ({0, plural, one {# seat} other {# seats}})\",\"mG4QFQ\":\"By subscribing, you agree to <a data-anchor-id=\\\"terms-of-use\\\">Terms of Use</a>.\",\"1vPhWA\":\"First instalment due today (no {0, plural, one {1 day} other {# day}} trial)\"}");
 const cmsg = window["cmsg"] = window["cmsg"] || {};
 const strings = cmsg["strings"] = cmsg["strings"] || {};
 strings["en-GB"] = strings["en-GB"] ? Object.assign(strings["en-GB"], messages) : messages;
})();