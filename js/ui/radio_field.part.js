/**
 * jQuery radio field plugin, this jQuery plugin provides the base
 * infra-structure for the creation of a radio field component.
 *
 * @name jquery-radio-field.js
 * @author João Magalhães <joamag@hive.pt>
 * @version 1.0
 * @date March 10, 2010
 * @category jQuery plugin
 * @copyright Copyright (c) 2010-2012 Hive Solutions Lda.
 * @license Hive Solutions Confidential Usage License (HSCUL) -
 *          http://www.hive.pt/licenses/
 */
(function(jQuery) {
    jQuery.fn.uxradiofield = function(options) {
        // the default values for the radio field
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
            // iterates over all the matched object
            matchedObject.each(function(index, element) {
                        // retrieves the element refence
                        var _element = jQuery(element);
                        _update(_element, options);
                    });
        };

        /**
         * Registers the event handlers for the created objects.
         */
        var _registerHandlers = function() {
            // retrieves the (possible) next radio field label
            // to register it for checking
            var radioFieldLabel = matchedObject.next(".radio-field-label");

            // registers the radio field label for the click
            // event to check the associated radio field
            radioFieldLabel.click(function() {
                        // retrieves the current element and uses it to retrieve
                        // the previous radio field
                        var element = jQuery(this);
                        var radioField = element.prev(".radio-field");

                        // checks the "just" retrieved radio field, this should
                        // enable its boolean value
                        _check(radioField, options);
                    });
        };

        var _check = function(matchedObject, options) {
            // checks the current matched object by setting
            // the its checked attribute
            matchedObject.attr("checked", true);
        };

        var _update = function(matchedObject, options) {
            // retrives the value and the checked value
            var value = matchedObject.attr("value");
            var checked = matchedObject.attr("data-checked");

            // in case the checked value is the same
            // as the value (current option)
            if (checked == value) {
                // sets the element as checked
                matchedObject.attr("checked", true);
            }
            // otherwise it's not the selected element
            else {
                // sets the element as unchecked
                matchedObject.attr("checked", false);
            }
        };

        // initializes the plugin
        initialize();

        // returns the object
        return this;
    };
})(jQuery);
