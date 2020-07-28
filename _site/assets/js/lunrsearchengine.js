
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page not found!Please use the search bar from the bottom left or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "About",
    "body": "def greetings():  print( Hello, friend.  )greetings()How’re you doing? It won’t take too long. Call me Serge - just as my closest friends do - I’m a junior Data Scientist who loves Python, also a Telecommunications engineer (yeah, too much signals processing and transmission, statistics and Cisco stuff) graduated at Andres Bello Catholic University who moved abroad about 3 years ago and since then, I’ve been focused on building a meaninful career. After graduating from College, I worked for the biggest Telecommunications company at Venezuela, then for the most recognized IT auditing firm and finally and since the last 3 years, worked for one of the biggest banks in the world. Won’t reveal names, just for compliance reasons.  “People always told me growing up that it’s never about the destination. It’s about the journey. But what if the destination - is you? What if it’s always you? “ — Elliot Alderson, Mr. Robot. A life-long learner: Well, everybody would love to have a meaningful career. I particularly hold that you must learn as much as you can but also push yourself hard and harder everyday, otherwise, how could you stay above the mean? It’s all about cultivating yourself and working hard every waking hour, always chasing whatever you like to become. The Data Science Journey: We all know DS is a broad and vague term, that’s a fact. It’s kinda complex to understand every single sub-topic the career involves and every data scientist position is different. So, starting from there, how did I begin this long journey? Well, I promised not to take long. Let’s just say that during college I’ve deep contact with statistics, linear algebra and mathematics, like in all engineering careers. Those are obviously the foundations. Later on my professional career but most on my last job, I’ve got several needs to use DS skills (because of business requirements) to treat data and was there where the magic happened: deep love for data. Like all life-long learners, I felt the need to become an expert: tons of online courses, then the DS specialization at University of Michigan, several projects as a freelancer and finally, the need of the data scientist job: so here I am. Wanna check the latest projects? Check my repo!→ "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/contact",
    "title": "Contact",
    "body": "  Please send me your message. I'll reply as soon as possible!   "
    }, {
    "id": 4,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "                                                                                               A Flask web application to increase A2 Softway scope                         1 2 3 4 5                      :       Hi there. I’ll introduce a very recent web application that I’ve built for a well known organization in Central America. I cannot reveal the name for obvious reasons but I. . . :                                                                               Sergio                 26 Jul 2020                                "
    }, {
    "id": 5,
    "url": "http://localhost:4000/repo",
    "title": "Repo & Projects",
    "body": "Hey! It’s nice to see you around. : These are my latest projects. Feel free to check them out and if any is of your interest, just bookmark it :)     {{ content }}  "
    }, {
    "id": 6,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 7,
    "url": "http://localhost:4000/a-flask-app/",
    "title": "A Flask web application to increase A2 Softway scope",
    "body": "2020/07/26 - Hi there. I’ll introduce a very recent web application that I’ve built for a well known organization in Central America. I cannot reveal the name for obvious reasons but I promise I’ll try to explain every single detail about this project here and within the code that you’ll find at the end of this post. Let’s start from the very beginning; A2 Softway is a Venezuelan ERP software widely distributed and sold along the Americas. Its focus is to provide a complete administrative module but also flexible and very cheap compared, for example, with the SAP’s ERP. One of the A2 distributors of Central America reached out to me because a very particular need: expand the scope of this software for an important client. Essentially they were needing to interact with its database to modify some tables that cannot be modified from within the software and also query some information to be presented in this company’s website. A2 Softway is written in Borland Delphi and runs a DBISAM database. It’s a very unusual architecture with an old fashioned database system, which makes the project task, let’s say, complex. Said this, let’s deep dive into the project. The projectAlright, The main requirement: the client just launched their website and are needing to provide their customers’ account status from there. To accomplish this task, they would need to query the A2 database hosted in a local server (on-premise), do some math and return a file to the Drupal website where the customer will be logged in. The collateral requirement: modify some database’s fields because A2 itself does not allow to. You may be asking why would it be a requirement and why the software does not do that by itself; the answer: As It’s a Venezuelan software adapted to be sold around the world, it still has some software regulations imposed by the venezuelan laws. The distributor needed to break this boundary to be able to deploy the software in the client’s ecosystem ASAP. Essentialy they were requiring to modify invoices’ data to correct errors made by the billing staff but also consult information about the customers without having to access the A2 interface, through a fancy frontend. The road-blocksAs you may know, DBISAM databases are difficult to modify and you need a special software to do so. I found the DBISAM ODBC driver from Elevate Software, had to purchase the license and finally was able to query the DB engine. They were needing an app that would allow to query the database from the outside (the website) so I concluded the best way to solve this problem would be a web application. I would go through this topic in the next lines: The web applicationOnce I was able to query the so restricted DB, it was time to code. I’m a Python fan (I think I don’t have to explain why, it’s pretty obvious) so decided to build the app based on it. This is the application core architecture (btw, I called the app “A2 Workspace”): The application is coded with Python, Flask, HTML, CSS, Bootstrap and runs in the same A2 local server. Essentially it renders several HTML pages for the internal services such as modify dates and documents, and returns a simple pdf file for the external service. Before moving on, It’s important to mention the interface is in Spanish, just FYI. The interfaceThis app has several pages, but the most importants are: The login page: This is how the login page for internal employees would look like.  The index: This page is still to be defined. The client will need to present some business graphs but hasn’t decided what to show yet.  The page to query internal customers: The page to query customers’ account status: The page to modify invoice numbers: The page to modify invoices’ dates: A file example of what the external service would return through the website: Due to compliance reasons I removed some client’s information, but that’s essentially what the external service returns.  The whole project and code:The whole project is available Here in case you want to deep dive into it. Feel free to contact me in case of any doubt/feedback. I hope you have enjoyed this reading. See you around! "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><span class='body'>"+ body +"</span><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><small><span class='body'>"+ body +"</span><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});