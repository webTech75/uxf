(function(jQuery) {
    jQuery.fn.uxlink = function(options) {
        // the default values for the link confirm
        var defaults = {};

        // sets the default options value
        var options = options ? options : {};

        // constructs the options
        var options = jQuery.extend(defaults, options);

        // sets the jquery matched object
        var matchedObject = this;

        /**
         * Initializer of the plugin, runs the necessary functions to initialize
         * the structures.
         */
        var initialize = function() {
            _appendHtml();
            _registerHandlers();
        };

        /**
         * Creates the necessary html for the component.
         */
        var _appendHtml = function() {
        };

        /**
         * Registers the event handlers for the created objects.
         */
        var _registerHandlers = function() {
            // iterates over each of the elements in
            // the matched object to register for the click event
            matchedObject.each(function(index, element) {
                // retrieves the element reference
                var _element = jQuery(element);

                // retrieves the value for the ajax "flag" attribute
                // to be used to determine if an ajax call should be
                // used instead of the "normal" link behaviour
                var ajax = _element.attr("data-ajax");

                // retrieves the offset and converts it
                // into an integer
                var duration = _element.attr("data-duration");
                var durationInteger = parseInt(duration);

                // checks if the duration integer value is valid
                // conversion successful
                var durationValid = !isNaN(durationInteger);

                // in case the ajax flag set a "special" click handler
                // must be registered to intercept the call and use
                // ajax techniques to retrieve it
                ajax && _element.click(function(event) {
                    // retrieves the element and retrieves the hiperlink
                    // reference value from it to be used as the url
                    var element = jQuery(this);
                    var href = element.attr("href");

                    // prevents the default event (avoids the
                    // effect of the link)
                    event.preventDefault();

                    // runs the remote call to retrieve the resource associated
                    // with the link element, note that cross site reference
                    // rules will applye to this request
                    jQuery.ajax({
                                type : "get",
                                url : href,
                                success : function(data) {
                                    element.triggerHandler("success", [data]);
                                },
                                error : function(request, textStatus, errorThrown) {
                                    element.triggerHandler("error", [request]);
                                }
                            });
                });

                // registers for the click event in
                // the element only in case the dureation is valid
                durationValid && _element.click(function(event) {
                            // retrieves the element
                            var element = jQuery(this);

                            // retrieves the href (link) attribute
                            var href = element.attr("href");

                            // retrieves the offset and converts it
                            // into an integer
                            var offset = element.attr("data-offset");
                            var offsetInteger = parseInt(offset);

                            // creates the settings map based on the offset
                            var settings = {
                                offset : isNaN(offsetInteger)
                                        ? 0
                                        : offsetInteger
                            }

                            // scrolls to the reference
                            jQuery.uxscrollto(href, durationInteger, settings);

                            // prevents the default event (avoids the
                            // effect of the link)
                            event.preventDefault();
                        });
            });
        };

        // initializes the plugin
        initialize();

        // returns the object
        return this;
    };
})(jQuery);
