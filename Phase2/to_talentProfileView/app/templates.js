Ember.TEMPLATES["talentProfileView"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content content--readable pad--sm--n pad--sm--tm\">\n        <div class=\"panel mar--sm--bm js-panel\">\n            <div class=\"panel__top\">\n                <div class=\"js-view-buttons\">\n                    <button type=\"button\" class=\"button button--primary float--right mar--sm--ls\">\n                        <span class=\"juicon juicon-download\"></span>\n                        Import from LinkedIn\n                    </button>\n                    <button type=\"button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickEdit", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"button button--secondary float--right js-edit-page\">\n                        <span class=\"juicon juicon-pencil\"></span>\n                    </button>\n                </div>\n                <h2 class=\"panel__heading\">\n                    Talent Profile\n                </h2>\n            </div>\n            <section id=\"identity\" style=\"display: block;\">\n                <div class=\"panel__body\">\n                    <div class=\"part__left--fixed pad--sm--n\">\n                        <div class=\"img-container img-container--lg\"><img src=\"https://c.na24.content.force.com/profilephoto/005/F\">\n                        </div>\n                    </div>\n                    <div class=\"part__body width--full pad--sm--lm pad--sm--rm\">\n                        <h5 class=\"mar--sm--n relatedPerson\"><a href=\"#\">Jane Aaron</a></h5>\n                        <h5 class=\"text-faded mar--sm--n\">\n                            Director of Sales (Midwest)\n                        </h5>\n                    </div>\n                </div>\n            </section>\n            <section id=\"summary\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Summary</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <p class=\"mar--sm--tn\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Summary__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    </p>\n                </div>\n            </section>\n            <section id=\"projects\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Projects</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3>TalentObjects 1.0 release</h3>\n                        <small class=\"text-faded\">Oct 2014 to Mar 2015</small>\n                        <p>\n                            Responsible for the user experience design (UI concepts and task flows) of a recruiting module for a world-class workforce engagement solution.\n                        </p>\n                        <i>\n                            Skills: User Experience Design, Interaction Design, Product Design\n                        </i>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3>ASU Online redesign</h3>\n                        <small class=\"text-faded\">Jul 2008 to Feb 2009</small>\n                        <p>\n                            Redesigned ASU Online to focus on increasing prospective student enrollments. Implemented ongoing SEO and content strategy plan to continually increase conversions and brand trust.\n                        </p>\n                        <i>\n                            Skills: User Experience Design, Interaction Design, Product Design\n                        </i>\n                    </article>\n                </div>\n            </section>\n            <section id=\"recognition\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Recognition</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3><a href=\"#\">Force.com MVP 2014 (Renewed)</a></h3>\n                        <small class=\"text-faded block\">Salesforce.com</small>\n                        <small class=\"text-faded\">Jan 1, 2014</small>\n                        <p>\n                            The Force.com MVP Program recognizes outstanding contributors and technological leaders in the Force.com cloud platform ecosystems. These Force.com MVPs are being called out for willingly sharing their expertise with others, demonstrating stewardship of the community in which they play an integral part, advancing the community body of knowledge and strengthening the developer network.\n                        </p>\n                        <i>\n                            Skills: Salesforce.com, Force.com, Peer Training, Community Stewardship\n                        </i>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3><a href=\"#\">Force.com MVP 2013 (Renewed)</a></h3>\n                        <small class=\"text-faded block\">Salesforce.com</small>\n                        <small class=\"text-faded\">Jan 6, 2013</small>\n                        <p>\n                            The Force.com MVP Program recognizes outstanding contributors and technological leaders in the Force.com cloud platform ecosystems. These Force.com MVPs are being called out for willingly sharing their expertise with others, demonstrating stewardship of the community in which they play an integral part, advancing the community body of knowledge and strengthening the developer network.\n                        </p>\n                        <i>\n                            Skills: Salesforce.com, Force.com, Peer Training, Community Stewardship\n                        </i>\n                    </article>\n                </div>\n            </section>\n            <section id=\"performanceRatings\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Performance Ratings</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3>Exceeds Expectations (4)</h3>\n                        <small class=\"text-faded\">Feb 15, 2015 ● Architect</small>\n                        <div class=\"card mar--sm--tm\">\n                            <div class=\"card__body\">\n                                <p class=\"mar--sm--n\">\n                                    “Ross has made significant progress recently, especially in the size and complexity of challenges he has tackled. I’m looking for continued great work throughout the year.”\n                                </p>\n                                <div class=\"text-right\">\n                                    <a href=\"#\" class=\"block\">\n                                        Ray Chambers\n                                    </a>\n                                    VP of Engineering\n                                </div>\n                            </div>\n                        </div>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3>Meets Expectations (3)</h3>\n                        <small class=\"text-faded\">Aug 14, 2014 ● Architect</small>\n                        <div class=\"card mar--sm--tm\">\n                            <div class=\"card__body\">\n                                <p class=\"mar--sm--n\">\n                                    “Ross has made significant progress recently, especially in the size and complexity of challenges he has tackled. I’m looking for continued great work throughout the year.”\n                                </p>\n                                <div class=\"text-right\">\n                                    <a href=\"#\" class=\"block\">\n                                        Ray Chambers\n                                    </a>\n                                    VP of Engineering\n                                </div>\n                            </div>\n                        </div>\n                    </article>\n                </div>\n            </section>\n            <section id=\"traning\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Training and Development</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3><a href=\"#\">Managing Product Definition and Design</a></h3>\n                        <small class=\"text-faded block\">Cooper U</small>\n                        <small class=\"text-faded\">Jun 1, 2015</small>\n                        <p>\n                            Students walk away knowing how to: communicate business and customer goals in clear, actionable, memorable ways; use narrative to craft a compelling product vision; ensure cross-functional teams understand that vision and how to make decisions in service of it; generate product requirements that are grounded in the best user experience.\n                        </p>\n                        <i>\n                            Skills: Product Vision, Collaboration, Requirements Management\n                        </i>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3><a href=\"#\">Cranky Talk Workshop for New Speakers</a></h3>\n                        <small class=\"text-faded block\">Dan Willis et. al.</small>\n                        <small class=\"text-faded\">Aug 22, 2013</small>\n                        <p>\n                            Cranky Talk is an intense, day-long workshop for people intent on being exceptional public speakers.\n                        </p>\n                        <i>\n                            Skills: Public Speaking, Presentations, Communication\n                        </i>\n                    </article>\n                </div>\n            </section>\n            <section id=\"otherSkills\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Other Skills</h4>\n                </div>\n                <div class=\"panel__body\">\n                    Apex; CSS; HTML; Javascript\n                </div>\n            </section>\n            <section id=\"publications\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Publications</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3><a href=\"#\">UX Design on the Salesforce1 Platform</a></h3>\n                        <small class=\"text-faded\">May 14, 2015 ● Peachpit Press</small>\n                        <p>\n                            A short book on how to design compelling experiences for enterprise apps using the Salesforce1 Platform.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3><a href=\"#\">Design Is a Job</a></h3>\n                        <small class=\"text-faded\">April 10, 2012 ● A Book Apart</small>\n                        <p>\n                            Ross Belmont wants to help you do your job better. From contracts to selling design, from working with clients to working with each other, you’ll learn why navigating the business of design is just as important as the craft of it. Cultivated from his own experience, Ross packs this brief book with knowledge you can’t afford not to know.\n                        </p>\n                    </article>\n                </div>\n            </section>\n            <section id=\"patents\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Patents</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3><a href=\"#\">Security device for computers</a></h3>\n                        <small class=\"text-faded block\">US5016758 A (USPTO)</small>\n                        <small class=\"text-faded\">Feb 7, 2011 (Granted)</small>\n                        <p>\n                            A security device for computing devices wherein a strong flexible cable is fastened at one end to a lock, carried on a hanger, or to a bar on a clothing stand, which cable passes through part of the housing and the other end of the cable is detachably secured in the lock to releasably secure the machine.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                </div>\n            </section>\n            <section id=\"recommendations\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Recommendations</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <div class=\"card mar--sm--tm\">\n                            <div class=\"card__body\">\n                                <p class=\"mar--sm--n\">\n                                    “Ross is a talented UX designer, writer, speaker and workshop facilitator. He is also an authentic, generous and thoughtful human being who gives himself fully to the things he is passionate about. As a speaker and writer, his ideas are insightful and his prose is clean, clear and engaging. As a workshop facilitator I’ve never seen anyone better.”\n                                </p>\n                                <div class=\"text-right\">\n                                    <a href=\"#\" class=\"block\">\n                                        Dave Gray\n                                    </a>\n                                    Co-founder at Boardthing.com\n                                </div>\n                            </div>\n                        </div>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <div class=\"card mar--sm--tm\">\n                            <div class=\"card__body\">\n                                <p class=\"mar--sm--n\">\n                                    “Ross is a highly talented and thoughtful User Experience Designer. He’s able to easily tackle complex information architecture problems, creating user experiences that are intuitive, fun and creative. His humor and collaborative attitude make him a pleasure to work with. I’d be happy to work with him again, given the opportunity.”\n                                </p>\n                                <div class=\"text-right\">\n                                    <a href=\"#\" class=\"block\">\n                                        John Devoy\n                                    </a>\n                                    Assistant Vice Provost Digital Marketing Strategy @ ASU Online\n                                </div>\n                            </div>\n                        </div>\n                    </article>\n                </div>\n            </section>\n            <section id=\"certifications\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Certifications</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3>Force.com Developer</h3>\n                        <small class=\"text-faded block\">Salesforce.com (DEV 401)</small>\n                        <small class=\"text-faded\">July 2009 to Present</small>\n                        <i>\n                            Skills: Salesforce.com, Force.com Development\n                        </i>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3>ASU Online redesign</h3>\n                        <small class=\"text-faded\">Jul 2008 to Feb 2009</small>\n                        <p>\n                            Redesigned ASU Online to focus on increasing prospective student enrollments. Implemented ongoing SEO and content strategy plan to continually increase conversions and brand trust.\n                        </p>\n                        <i>\n                            Skills: User Experience Design, Interaction Design, Product Design\n                        </i>\n                    </article>\n                </div>\n            </section>\n            <section id=\"employment\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Employment</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3>Chief Experience Designer</h3>\n                        <small class=\"text-faded block\">Appiphony, LLC</small>\n                        <small class=\"text-faded\">May 2010 to Present</small>\n                        <p>\n                            I am extremely proud to have formalized a design-driven development practice for our ISV clients. My goal in doing so is to bring the best design thinking anywhere to software on the Force.com platform. Appiphony’s leadership and developers understand the benefits good design can bring, and we are doing the best work in our market.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3>Architect</h3>\n                        <small class=\"text-faded block\">EDL Consulting</small>\n                        <small class=\"text-faded\">July 2009 - May 2010</small>\n                        <p>\n                            EDL Consulting is a national technology services firm specializing in the intelligent integration of eCommerce, CRM and business intelligence solutions to improve business performance. EDL solves the complex systems integration issues behind state-of-the-art technology solutions to make organizations more successful. The solutions EDL builds generate revenue, result in cost savings, promote differentiation and make it easier for clients to do business with their customers.\n                        </p>\n                    </article>\n                </div>\n            </section>\n            <section id=\"educations\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Education</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3>University of Illinois at Urbana-Champaign</h3>\n                        <small class=\"text-faded block\">BS, MIS</small>\n                        <small class=\"text-faded\">1996-2000</small>\n                    </article>\n                </div>\n            </section>\n            <section id=\"languages\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Languages</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <ul class=\"mar--sm--tn\">\n                        <li>English (Native or bilingual proficiency)</li>\n                        <li>Japanese (Elementary proficiency)</li>\n                        <li>Spanish (Limited working proficiency)</li>\n                    </ul>\n                </div>\n            </section>\n            <section id=\"volunteering\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Volunteering</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3>CASA of Kane County</h3>\n                        <small class=\"text-faded\">Board Member</small>\n                        <p>\n                            CASA Kane County recruits, trains and supervises community volunteers who serve as Court Appointed Special Advocates (CASAs) for children in court due to abuse, neglect or private guardianship.\n                        </p>\n                    </article>\n                </div>\n            </section>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});