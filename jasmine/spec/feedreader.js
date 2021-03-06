/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('menu changes visibility', function() {
            if($('.menu-icon-link').click()) {
                expect($('body').hasClass('menu-hidden')).toBe(false);
                if($('.menu-icon-link').click()) {
                    expect($('body').hasClass('menu-hidden')).toBe(true);
                }
            }
            else {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            }
         });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        // Call async function and wait for the result. 
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Validate the result.
        it('loadFeed function work', function() {
            $('.feed').each(function(index, feed) {
                let num_entries = $(feed).find('.entry').length; 
                expect(num_entries).not.toBe(0);
            });
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New feed selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // Variables for content
        let content1, content2;
        beforeEach(function(done) {
            loadFeed(1, function() {
                // Save the content from feed with index=1 
                content1 = $('.feed').children().children('.entry').text();
                loadFeed(2, function() {
                    // Save the content from feed with index=2
                    content2 = $('.feed').children().children('.entry').text();
                    done();
                });
            });
        });
        it('content actually changes', function() {
            expect(content1).not.toEqual(content2);
        });
    });
}());
