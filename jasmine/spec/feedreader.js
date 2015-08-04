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

         // Expect URL to match HTTP Regex
         function testURLisNotEmpty(allFeeds) {
            expect(allFeeds.url).toMatch(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:ww‌​w.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?‌​(?:[\w]*))?)/);
         }

         // Iterate allFeeds array to perform check
         it('has URL link in each feed', function() {
            for (i = 0; i < allFeeds.length; i++) {
                testURLisNotEmpty(allFeeds[i]);
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         function testNameisDefinedandNotEmpty(allFeeds) {
            expect(allFeeds.name).toBeDefined(); // First check: to see if allFeeds.name variable is defined
            expect(allFeeds.name.length).not.toEqual(0); // Second check: to see if name exists by checking string length
         }

         // Iterate allFeeds array to perform check
         it('Name is defined and not empty', function() {
            for (i = 0; i < allFeeds.length; i++) {
                testNameisDefinedandNotEmpty(allFeeds[i]);
            }
         });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe ('Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // Default 'menu-hidden' CSS selector hides Menu to the left of screen by 12em
        it('Menu is hidden when DOM is loaded', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        // Click event trigger body class 'menu-hidden' to change, hence show or hide Menu
        it('Menu shows / hides when menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            // Second menu icon click to hide menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // Set beforeEach function for async support
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Count number of entries after async call is done and expect to be > 1
        it('loadFeed has more than one entry', function(done) {
            var entries = $('.feed a').children('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // Ensure content has changed when new feed is loaded
        var oldFeed, newFeed;

        beforeEach(function(done) {
            loadFeed(0);
            setTimeout(function() {
                oldFeed = $('.feed').html();
                done();
            }, 1);
        });
        
        it('content changes as a new feed is loaded', function() {
            loadFeed(1);
            setTimeout(function() {
                newFeed = $('.feed').html();
            }, 1);
            expect(oldFeed).not.toEqual(newFeed);
        });

    });

}());
